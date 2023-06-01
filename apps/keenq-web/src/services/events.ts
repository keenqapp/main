import { Timestamp } from 'firebase/firestore'
import { makeAutoObservable, reaction, transaction } from 'mobx'

import { Api } from '@/services/api'
import { IGender } from '@/services/members'

import { Entity, Filter, IApi, Provider } from '@/types/types'

type ClosedFor = 'all' | IGender

export interface IEventMember extends Entity {
  uid: string
  status: 'pending' | 'active' | 'inactive'
  preferences: {
    friends: string[]
    romantic: string[]
  }
  dont: string[]
}

export interface IEvent extends Entity {
  uid: string
  title: string
  shortDescription?: string
  description?: string
  startDate: Timestamp
  coverImage?: string
  images?: string[]
  location: {
    country: string
    city: string
    address?: string
    place?: string
    url?: string
  },
  members: IEventMember[]
  admins: string[]
  status: 'pending' | 'started' | 'finished'
  registrationClosed: {
    closedFor: ClosedFor[]
    before?: number
  }
  deletedAt?: Timestamp
  roundsDuration?: number
}

export function createEventsApi(provider: Provider<IEvent>): (root: Api) => EventsApi {
  return (root) => new EventsApi(root, provider)
}

export type CreateEventDTO = Omit<IEvent, 'uid' | 'members' | 'status' | 'registrationClosed'>

function createEvent(data: CreateEventDTO): Omit<IEvent, 'uid'> {
  return {
    ...data,
    members: [],
    status: 'pending',
    registrationClosed: {
      closedFor: []
    }
  }
}

function createEventMember(uid: string): IEventMember {
  return {
    uid,
    status: 'pending',
    preferences: {
      friends: [],
      romantic: [],
    },
    dont: []
  }
}

export class EventsApi implements IApi {

  root
  provider

  events: Map<string, IEvent> = new Map()
  isLoading = false
  initLoaded = false

  filter: Filter = {
    city: null,
    // haveFinished: ['==', false],
    startDate: ['>=', Timestamp.fromDate(new Date())],
    // deletedAt: ['!=', null],
  }

  currentUid: string | null = null

  constructor(root: Api, provider: Provider<IEvent>) {
    makeAutoObservable(this, {
      root: false,
      provider: false,
    })

    this.root = root
    this.provider = provider

    this.init()

    // reaction(() => this.currentUid, async (uid) => {
    //   if (uid) {
    //     await this.loadEvent(uid)
    //   }
    // })
  }

  async init() {
    await this.loadAllEvents()
    this.initLoaded = true
    return true
  }

  setCurrentUid(uid: string | null) {
    this.currentUid = uid
  }

  get current() {
    if (!this.currentUid) return undefined

    const event = this.events.get(this.currentUid)
    if (!event) this.loadEvent(this.currentUid)
    return event
  }

  get currentEventMember() {
    return this.current?.members.find((member: IEventMember) => member.uid === this.root.members.currentMemberUid)
  }

  getByUid(uid: string) {
    if (!this.events.has(uid)) this.loadEvent(uid)
    return this.events.get(uid)
  }

  getEventMember(memberUid: string) {
    return this.current?.members.find(member => member.uid === memberUid)
  }

  async loadEvent(uid: string) {
    this.isLoading = true
    const event = await this.provider.get(uid)
    if (event) {
      this.events.set(uid, event)
    }
    this.isLoading = false
    return event
  }

  async loadAllEvents() {
    this.isLoading = true
    const events = await this.provider.getAll(this.filter)
    transaction(() => {
      events.forEach((event) => this.events.set(event.uid, event))
    })
    this.isLoading = false
    return events
  }

  get myEvents() {
    return [...this.events.values()].filter(this.isMember)
  }

  get notMyEvents() {
    return [...this.events.values()].filter(this.notIsMember)
  }

  checkClosed(registrationClosed: IEvent['registrationClosed']) {
    if (!registrationClosed) return false
    if (registrationClosed.closedFor.includes('all')) return true
    if (this.root.members.currentMember?.gender && registrationClosed.closedFor.includes(this.root.members.currentMember.gender)) return true
  }

  checkMember(uid: string) {
    return this.isMember(this.events.get(uid)!)
  }

  isMember = (event: IEvent) => {
    return !!event.members.find(member => member.uid === this.root.members.currentMemberUid)
  }

  notIsMember = (event: IEvent) => {
    return !this.isMember(event)
  }

  checkAdmin(uid: string) {
    return this.events.get(uid)?.admins.includes(this.root.members.currentMemberUid!)
  }

  edit(event: IEvent) {
    this.events.set(event.uid, event)
    this.provider.set(event.uid, event)
  }

  async create(data: CreateEventDTO) {
    const event = createEvent(data)
    const uid = await this.provider.create(event, ['rounds'])
    this.events.set(uid, { uid, ...event })
  }

  join() {
    const event = this.events.get(this.currentUid!)!
    if (this.notIsMember(event)) {
      const newEventMember = createEventMember(this.root.members.currentMemberUid!)
      event.members.push(newEventMember)
      this.events.set(this.currentUid!, event)
      this.provider.set(this.currentUid!, { members: event.members })
    }
  }

  here() {
    const event = this.events.get(this.currentUid!)!
    if (this.notIsMember(event)) {
      const member = event.members.find(member => member.uid === this.root.members.currentMemberUid)!
      member.status = 'active'
      this.events.set(this.currentUid!, event)
      this.provider.set(this.currentUid!, { members: event.members })
    }
  }

  leave(uid: string) {
    const event = this.events.get(uid)!
    if (this.isMember(event)) {
      event.members = event.members.filter(member => member.uid !== this.root.user.uid)
      this.events.set(uid, event)
      this.provider.set(uid, { members: event.members })
    }
  }

  async start(uid: string) {
    await this.provider.set(uid, { status: 'started' })
    await this.loadEvent(uid)
  }

  async finish(uid: string) {
    await this.provider.set(uid, { status: 'finished' })
    await this.loadEvent(uid)
  }

  async close(uid: string, closedFor: IEvent['registrationClosed']['closedFor']) {
    await this.provider.set(uid, { registrationClosed: { closedFor: closedFor }})
    await this.loadEvent(uid)
  }

  async open(uid: string, closedFor: IEvent['registrationClosed']['closedFor']) {
    await this.provider.set(uid, { registrationClosed: { closedFor: [] }})
    await this.loadEvent(uid)
  }

  async delete(uid: string) {
    await this.provider.set(uid, { deletedAt: Timestamp.now() })
    await this.loadEvent(uid)
  }

  async setPreferences(prefs: Partial<IEventMember['preferences']>) {
    const event = this.current!
    const member = event.members.find(member => member.uid === this.root.members.currentMemberUid)!
    member.preferences = { ... member.preferences, ...prefs }
    this.events.set(this.currentUid!, event)
    this.provider.set(this.currentUid!, { members: event.members })
  }

  async dont(uid: string, want: boolean) {
    const event = this.current!
    const member = event.members.find(member => member.uid === this.root.members.currentMemberUid)!
    if (want) {
      member.dont = member.dont.filter(dont => dont !== uid)
    }
    else {
      member.dont.push(uid)
    }
    this.events.set(this.currentUid!, event)
    this.provider.set(this.currentUid!, { members: event.members })
  }

  async participateForMember(eventUid: string, memberUid: string, status: IEventMember['status']) {
    const event = this.events.get(eventUid)!
    const member = event.members.find(member => member.uid === memberUid)!
    member.status = status
    this.events.set(eventUid, event)
    this.provider.set(eventUid, { members: event.members })
  }

  async participate(status: IEventMember['status']) {
    await this.participateForMember(this.currentUid!, this.root.user.uid, status)
  }

}

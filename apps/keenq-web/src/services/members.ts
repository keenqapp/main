import { makeAutoObservable, reaction, transaction } from 'mobx'

import { Api } from '@/services/api'

import { Entity, IApi, Provider } from '@/types/types'

export type IGender = 'male' | 'female' | 'non-binary' | 'trans person' | 'other' | ''

export interface IMember extends Entity {
  uid: string
  name: string
  avatar?: string
  description?: string
  gender?: IGender
  canCreateEvents?: boolean
  interests?: string[]
  contacts: []
}

export function createMembersApi(provider: Provider<IMember>): (root: Api) => MembersApi {
  return (root) => new MembersApi(root, provider)
}

function createMember(uid: string): IMember {
  return {
    uid,
    name: '',
    avatar: '',
    description: '',
    gender: '',
    contacts: []
  }
}

export class MembersApi implements IApi {

  root
  provider

  currentMemberUid: string | null = null

  members: Map<string, IMember> = new Map()

  constructor(root: Api, provider: Provider<IMember>) {
    makeAutoObservable(this, {
      root: false,
      provider: false,
    })

    this.root = root
    this.provider = provider

    reaction(() => this.root.user.uid, async (uid) => await this.setCurrentMemberId(uid), { fireImmediately: true })
  }

  async init() {
    return true
  }

  get currentMember() {
    if (!this.currentMemberUid) return null
    return this.members.get(this.currentMemberUid)
  }

  isLoading = false
  async loadMember(uid: string) {
    if (this.isLoading) return
    this.isLoading = true
    const member = await this.provider.get(uid)
    if (member) this.members.set(uid, member)
    this.isLoading = false
    return member
  }

  async loadForEvent(uid: string) {
    const event = this.root.events.getByUid(uid)
    if (!event) return
    const members = await this.provider.getMany(event.members.map(member => member.uid))
    transaction(() => {
      members.forEach((member) => this.members.set(member.uid, member))
    })
    return members
  }

  getByUid(uid: string) {
    if (!this.members.has(uid)) this.loadMember(uid)
    return this.members.get(uid)
  }

  getByIds(ids: string[]) {
    return [...this.members.values()].filter((member) => ids.includes(member.uid))
  }

  async create(member: IMember) {
    await this.provider.create(member)
  }

  async update(member: IMember) {
    await this.provider.set(member.uid, member)
  }

  async setCurrentMemberId(uid: string | null) {
    this.currentMemberUid = uid

    if (!uid) return
    const member = await this.provider.get(uid)

    if (member) this.members.set(uid, member)
    else {
      const newMember = createMember(uid)
      this.members.set(uid, newMember)
      await this.create(createMember(uid))
    }
  }

}

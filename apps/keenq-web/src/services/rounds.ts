import { makeAutoObservable, reaction, transaction } from 'mobx'

import { Api } from '@/services/api'

import { Entity, Filter, IApi, Provider } from '@/types/types'

export interface IPair {
  uid: string
  members: string[]
}

export interface IRound extends Entity {
  uid: string
  index: number
  pairs: IPair[]
  isFinished: boolean
  isPaused: boolean
  secondsLeft: number
  status: 'pending' | 'started' | 'paused' | 'finished'
}

export function createRoundsApi(provider: Provider<IRound>): (root: Api) => RoundsApi {
  return (root) => new RoundsApi(root, provider)
}

function createRound(data: Partial<IRound>) {
  return {
    ...data,
    pairs: [],
    status: 'pending',
    secondsLeft: 0,
  } as Omit<IRound, 'uid'>
}

export class RoundsApi implements IApi {

  root
  provider
  rounds: Map<string, IRound> = new Map()
  subs: (() => void)[] = []

  collectionName = 'rounds'

  filter: Filter = {
    index: ['!=', null]
  }

  constructor(root: Api, provider: Provider<IRound>) {
    makeAutoObservable(this, {
      root: false,
      provider: false,
    })

    this.root = root
    this.provider = provider

    reaction(() => this.root.events.currentUid, () => this.refresh())
  }

  async init() {
    return true
  }

  refresh() {
    this.rounds.clear()
    this.subs.forEach((unsub) => unsub())
    this.subs = []
    this.collectionName = `events/${this.root.events.currentUid}/rounds`
    this.provider.setCollectionName(`events/${this.root.events.currentUid}/rounds`)
    this.subscribe()
  }

  checkStart(uid: string) {
    const round = this.rounds.get(uid)!
    const prev =  this.getForEvent().find((r) => r.index === round.index - 1)
    return !prev || prev.status === 'finished'
  }

  async loadForEvent(uid: string) {
    const rounds = await this.provider.getAll(this.filter)
    transaction(() => {
      rounds.forEach((round) => this.rounds.set(round.uid, round))
    })
    return rounds
  }

  async load(uid: string) {
    const round = await this.provider.get(uid)
    if (round) this.rounds.set(round.uid, round)
  }

  subscribe() {
    // const unsub = this.provider.subscribe(this.rounds)
    // this.subs.push(unsub)
  }

  getByUid(uid: string) {
    return this.rounds.get(uid)
  }

  getByUidRT(uid: string) {
    // const unsub = this.provider.setCollectionName(`events/${this.root.events.currentUid}/rounds`).getRT(uid, this.rounds)
    // this.subs.push(unsub)
    return this.rounds.get(uid)
  }

  getForEvent() {
    return [...this.rounds.values()].sort((a, b) => a.index - b.index)
  }

  getPairForRound(roundId: string) {
    const round = this.rounds.get(roundId)
    return round?.pairs.find((pair) => pair.members.includes(this.root.user.uid))
  }

  async start(uid: string, secondsLeft: number) {
    await this.provider.set(uid, { secondsLeft, status: 'started' })
    await this.load(uid)
  }

  async pause(uid: string, secondsLeft: number) {
    await this.provider.set(uid, { secondsLeft, status: 'paused' })
    await this.load(uid)
  }

  async finish(uid: string) {
    await this.provider.set(uid, { secondsLeft: 0, status: 'finished' })
    await this.load(uid)
  }

  async create() {
    const round = createRound({ index: this.rounds.size + 1 })
    const uid = await this.provider.create(round)
    this.rounds.set(uid, { ...round, uid })
  }

}

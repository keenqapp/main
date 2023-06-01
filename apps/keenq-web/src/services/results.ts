import { makeAutoObservable, reaction, transaction } from 'mobx'

import { Api } from '@/services/api'

import { Entity, Filter, IApi, Provider } from '@/types/types'

export interface IResult extends Entity {
  uid: string
  eventUid: string
  from: string
  to: string
  reaction: 'romantic' | 'meet' | 'decline'
  status: 'active' | 'inactive'
}

export function createResultsApi(provider: Provider<IResult>): (root: Api) => ResultsApi {
  return (root) => new ResultsApi(root, provider)
}

function createResult(data: Partial<IResult>) {
  return {
    ...data,
    // eventUid: this.root.events.currentUid,
    // from: this.root.members.currentUid,
    status: 'active',
  } as Omit<IResult, 'uid'>
}

function getUid({ eventUid, from, to }: Pick<IResult, 'eventUid'|'from'|'to'>) {
  return `e:${eventUid}-f:${from}-t:${to}`
}

export class ResultsApi implements IApi {

  root
  provider
  results: Map<string, IResult> = new Map()

  filter: Filter = {
    // to: ['==', this.root.members.currentUid]
  }

  constructor(root: Api, provider: Provider<IResult>) {
    makeAutoObservable(this, {
      root: false,
      provider: false,
    })

    this.root = root
    this.provider = provider
  }

  async init() {
    await this.loadByTo()
    return true
  }

  async loadFor(filter: Filter) {
    const results = await this.provider.getAll(filter)
    transaction(() => {
      results.forEach((result) => this.results.set(result.uid, result))
    })
    return results
  }

  async loadByTo() {
    const to: Filter = {
      to: ['==', this.root.members.currentMemberUid],
      reaction: ['!=', 'decline']
    }
    return this.loadFor(to)
  }

  async loadByEventAndFrom() {
    const from: Filter = {
      from: ['==', this.root.members.currentMemberUid],
      eventUid: ['==', this.root.events.currentUid],
      reaction: ['!=', 'decline']
    }
    return this.loadFor(from)
  }

  async load(uid: string) {
    const round = await this.provider.get(uid)
    if (round) this.results.set(round.uid, round)
  }

  getByUid(uid: string) {
    return this.results.get(uid)
  }

  getByMemberUid(memberUid: string) {
    const uid = getUid({ eventUid: this.root.events.currentUid!, from: this.root.members.currentMemberUid!, to: memberUid })
    return this.results.get(uid)
  }

  getByTo() {
    return Array.from(this.results.values()).filter(({ to, reaction }) => to === this.root.members.currentMemberUid && reaction !== 'decline')
  }

  async create({ uid, to, reaction }: Pick<IResult, 'uid' | 'to' | 'reaction'>) {
    const result = createResult({ uid, to, reaction, eventUid: this.root.events.currentUid!, from: this.root.members.currentMemberUid! })
    await this.provider.create(result)
    this.results.set(uid, { ...result, uid })
  }

  async react({ to, reaction }: Pick<IResult, 'to' | 'reaction'>) {
    const uid = getUid({ eventUid: this.root.events.currentUid!, from: this.root.members.currentMemberUid!, to })
    if (this.results.has(uid)) {
      const result = this.results.get(uid)!
      result.reaction = reaction
      this.provider.set(uid, { reaction })
    }
    else {
      await this.create({ uid, to, reaction })
    }
  }
}

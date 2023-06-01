import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { createEventsApi, EventsApi, IEvent } from '@/services/events'
import { createMembersApi, IMember, MembersApi } from '@/services/members'
import { createResultsApi, IResult, ResultsApi } from '@/services/results'
import { createRoundsApi, IRound, RoundsApi } from '@/services/rounds'
import { createStorageApi, StorageApi } from '@/services/storage'
import { createUserApi, UserApi } from '@/services/user'

import { FirestoreProvider } from '@/providers/firestore'
import { ApiFactory } from '@/types/types'

// TODO move to provider init
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  // measurementId: import.meta.env.VITE_MEASUREMENT_ID
}

// const app = initializeApp(firebaseConfig)

export function useApi() {
  return null
}

export class Api {

  user: UserApi
  events: EventsApi
  rounds: RoundsApi
  members: MembersApi
  storage: StorageApi
  results: ResultsApi

  constructor({
    events,
    user,
    rounds,
    members,
    storage,
    results
  }: {
    events: ApiFactory<EventsApi>
    user: ApiFactory<UserApi>
    rounds: ApiFactory<RoundsApi>
    members: ApiFactory<MembersApi>
    storage: ApiFactory<StorageApi>
    results: ApiFactory<ResultsApi>
  }) {
    this.events = events(this)
    this.user = user(this)
    this.rounds = rounds(this)
    this.members = members(this)
    this.storage = storage(this)
    this.results = results(this)
  }

}

// const userFactory = createUserApi(getAuth(app))
//
// const membersProvider = new FirestoreProvider<IMember>({ collectionName: 'members', db: getFirestore(app) })
// const membersFactory = createMembersApi(membersProvider)
//
// const eventsProvider = new FirestoreProvider<IEvent>({ collectionName: 'events', db: getFirestore(app) })
// const eventsFactory = createEventsApi(eventsProvider)
//
// const roundsProvider = new FirestoreProvider<IRound>({ collectionName: 'rounds', db: getFirestore(app) })
// const roundsFactory = createRoundsApi(roundsProvider)
//
// const resultsProvider = new FirestoreProvider<IResult>({ collectionName: 'results', db: getFirestore(app) })
// const resultsFactory = createResultsApi(resultsProvider)
//
// // TODO write adapter
// const storage = getStorage(app)
// const storageFactory = createStorageApi(storage)

// export const api = new Api({
//   events: eventsFactory,
//   user: userFactory,
//   rounds: roundsFactory,
//   members: membersFactory,
//   storage: storageFactory,
//   results: resultsFactory
// })

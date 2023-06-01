import { FieldPath, WhereFilterOp } from '@firebase/firestore'

import { Api } from '@/services/api'

export type Filter = { [field: string]: [op: WhereFilterOp, value: unknown] | null }
export type FirestoreFilter = [ fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown ]

// export interface Provider<T> {
//   get: (uid: string) => Promise<T | undefined>
//   getRT: (uid: string, ref: Map<string, T>) => () => void
//   getAll: (filter?: Filter) => Promise<T[]>
//   getMany(ids: string[]): Promise<T[]>
//   create: (entity: T | Omit<T, 'uid'>, subCollections?: string[]) => Promise<string>
//   set: (uid: string, entity: Partial<T>) => Promise<void>
//   setCollectionName: (collectionName: string) => Provider<T>
// }

export type Entity = { uid: string }

export type ApiFactory<T> = (root: Api) => T extends IApi ? T : never

type Opaque<K, T> = T & { __TYPE__: K }

export type ID = Opaque<'ID', string>

export type NotEmptyString = Opaque<'NotEmptyString', string>

type Nullable<T> = T extends null ? null : T

declare module 'react-router-dom' {
  export function useLoaderData<T = unknown>(): { data: T } | undefined
}

export interface IApi {
  root: Api
  init: () => Promise<boolean>
}

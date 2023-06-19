import { VNode } from 'preact'
import { ReactElement, ReactFragment, ReactPortal } from 'react'


export type Entity = { uid: string }

type Opaque<K, T> = T & { __TYPE__: K }

export type ID = Opaque<'ID', string>

export type NotEmptyString = Opaque<'NotEmptyString', string>

type Nullable<T> = T extends null ? null : T

declare module 'react-router-dom' {
  export function useLoaderData<T = unknown>(): { data: T } | undefined
}

declare module 'react' {
  export type ReactNode =
    | VNode
    | Element
    | ReactElement
    | bigint
    | string
    | number
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined
}

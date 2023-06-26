// import { VNode } from 'preact'


export type Entity = { uid: string }

export type Opaque<K, T> = T & { __TYPE__: K }

export type UID = Opaque<'UID', string>

export type NotEmptyString = Opaque<'NotEmptyString', string>

export type Dict<T extends Record<string, unknown>> = T

// type Nullable<T> = T extends null ? null : T

declare module 'react-router-dom' {
  export function useLoaderData<T = unknown>(): { data: T } | undefined
}

// declare module 'react' {
//   export type ReactNode =
//     | VNode
//     | Element
//     // | ReactElement
//     | bigint
//     | string
//     | number
//     // | ReactFragment
//     // | ReactPortal
//     | boolean
//     | null
//     | undefined
// }

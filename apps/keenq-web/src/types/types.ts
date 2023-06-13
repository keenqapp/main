import { ComponentChildren, Element, VNode } from 'preact'


export type Entity = { uid: string }

type Opaque<K, T> = T & { __TYPE__: K }

export type ID = Opaque<'ID', string>

export type NotEmptyString = Opaque<'NotEmptyString', string>

type Nullable<T> = T extends null ? null : T

declare module 'react-router-dom' {
  export function useLoaderData<T = unknown>(): { data: T } | undefined
}

type VNode2 = VNode<any> & { children: ComponentChildren }

declare module 'preact' {
  export type ComponentChild =
    | VNode
    | Element
    | object
    | string
    | number
    | boolean
    | null
    | undefined;
}

import { useEffect } from 'preact/hooks'
import { gql, useMutation } from '@apollo/client'
import { useStore } from '@nanostores/preact'
import { batch, effect, signal } from '@preact/signals'
import { atom, computed } from 'nanostores'

import { client } from '@/providers/apollo'
import { create } from '@/utils/storage'


const anonAccessToken = import.meta.env.VITE_ANON_ACCESS_TOKEN as string
const store = create('auth')

const authKeys = {
	accessToken: 'accessToken',
	currentUid: 'currentUid',
}

export const isReady = signal(false)

export const accessToken = signal<string|null>(anonAccessToken)
export const $uid = atom<string|null>(null)

export const isAuthed = computed($uid, uid => !!uid)

export const authError = signal<string|null>(null)

export function useAuth() {
	const uid = useStore($uid)
	return {
		uid,
		isAuthed: !!uid,
	}
}

effect(() => {
	if (isReady.value) {
		store.setItem(authKeys.accessToken, accessToken.value)
		store.setItem(authKeys.currentUid, $uid.get())
	}
})

function setup() {
	batch(() => {
		accessToken.value = store.getItem<string>(authKeys.accessToken) || anonAccessToken
		$uid.set(store.getItem<string>(authKeys.currentUid) || null)
		isReady.value = true
	})
}

setup()

const sendGql = gql`
  mutation Send($phone: String!) {
    send(phone: $phone) {
      success
			data {
				error
				reason
			}
    }
  }
`

export function useSend() {
	const [send, { error }] = useMutation(sendGql)
	useEffect(() => {
	}, [ error ])
	return {
		send: async (phone: string) => {
			const { data } = await send({ variables: { phone } })
			return data.send?.success
		},
	}
}

const verifyGql = gql`
  mutation Verify($phone: String!, $code: String!) {
    verify(phone: $phone, code: $code) {
      data {
        accessToken
        uid
        error
        reason
      }
      success
    }
  }
`

export function useVerify() {
	const [verify, { error } ] = useMutation(verifyGql)
	useEffect(() => {
		authError.value = error ? 'code_error' : null
	}, [ error ])
	return {
		verify: async (phone: string, code: string) => {
			const { data } = await verify({ variables: { phone, code } })
			if (data.verify?.success) {
				accessToken.value = data.verify.data.accessToken
				$uid.set(data.verify.data.uid)
				return true
			}
			else authError.value = 'code_error'
		}
	}
}

export async function logout() {
	accessToken.value = anonAccessToken
	$uid.set(null)
	store.clearAll()
	await client.resetStore()
}

import { useStore } from '@nanostores/preact'
import { signal } from '@preact/signals'
import { atom, computed } from 'nanostores'
import { gql, useMutation } from 'urql'

import { create } from '@/utils/storage'


const anonAccessToken = import.meta.env.VITE_ANON_ACCESS_TOKEN as string
const store = create('auth')

const authKeys = {
	accessToken: '$accessToken',
	uid: '$uid',
}

export const isReady = signal(false)

export const $uid = atom<string|null>(null)
$uid.set(store.getItem<string>(authKeys.uid) || null)
$uid.listen(uid => store.setItem(authKeys.uid, uid))
export const $isAuthed = computed($uid, uid => !!uid)

export const $accessToken = atom<string|null>(anonAccessToken)
$accessToken.set(store.getItem<string>(authKeys.accessToken) || anonAccessToken)
$accessToken.listen(token => store.setItem(authKeys.accessToken, token) )


export const authError = signal<string|null>(null)

export function useAuth() {
	const uid = useStore($uid)
	return {
		uid,
		isAuthed: !!uid,
	}
}

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
	const [_, send, ] = useMutation(sendGql)
	return {
		send: async (phone: string) => {
			const { data } = await send({ phone })
			console.log('--- auth.ts:56 -> send ->', data)
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
	const [_, verity ] = useMutation(verifyGql)
	return {
		verify: async (phone: string, code: string) => {
			const { data } = await verity({ phone, code })
			if (data.verify?.success) {
				$accessToken.set(data.verify.data.accessToken)
				$uid.set(data.verify.data.uid)
				return true
			}
			else authError.value = 'code_error'
		}
	}
}

export async function logout() {
	$accessToken.set(anonAccessToken)
	$uid.set(null)
	store.clearAll()
}

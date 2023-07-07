import { useStore } from '@nanostores/preact'
import { signal } from '@preact/signals'
import { atom, computed } from 'nanostores'
import { gql, useMutation } from 'urql'

import { create } from '@/utils/storage'


const anonAccessToken = import.meta.env.VITE_ANON_ACCESS_TOKEN as string
const store = create('auth')

const authKeys = {
	accessToken: '$accessToken',
	id: '$id',
}

export const isReady = signal(false)

export const $id = atom<string|null>(null)
$id.set(store.getItem<string>(authKeys.id) || null)
$id.listen(id => store.setItem(authKeys.id, id))
export const $isAuthed = computed($id, id => !!id)

export const $accessToken = atom<string|null>(anonAccessToken)
$accessToken.set(store.getItem<string>(authKeys.accessToken) || anonAccessToken)
$accessToken.listen(token => store.setItem(authKeys.accessToken, token) )


export const authError = signal<string|null>(null)

export function useAuth() {
	const id = useStore($id)
	return {
		id,
		isAuthed: !!id,
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
			return data.send?.success
		},
	}
}

const verifyGql = gql`
  mutation Verify($phone: String!, $code: String!) {
    verify(phone: $phone, code: $code) {
      data {
        accessToken
        id
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
			try {
				const { data } = await verity({ phone, code })
				if (data.verify?.success) {
					$accessToken.set(data.verify.data.accessToken)
					$id.set(data.verify.data.id)
					return true
				}
				else authError.value = 'code_error'
			}
			catch(e) {
				authError.value = 'server_error'
			}
		}
	}
}

export async function logout() {
	$accessToken.set(anonAccessToken)
	$id.set(null)
	store.clearAll()
}

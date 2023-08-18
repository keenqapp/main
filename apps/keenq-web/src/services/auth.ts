import { persistentAtom } from '@nanostores/persistent'
import { useStore } from '@nanostores/preact'
import { signal } from '@preact/signals'
import { computed } from 'nanostores'
import { gql, useMutation } from 'urql'

import { create } from '@/utils/storage'


const anonAccessToken = import.meta.env.VITE_ANON_ACCESS_TOKEN as string
const store = create('auth')

const authKeys = {
	accessToken: '$accessToken',
	id: '$id',
}

export const isReady = signal(false)

export const $id = persistentAtom<string>(authKeys.id, '')
export const $isAuthed = computed($id, id => !!id)

export const $accessToken = persistentAtom<string>(authKeys.accessToken, anonAccessToken)

export const authError = signal<string|null>(null)

export function useAuth() {
	const id = useStore($id)
	return {
		id,
		isAuthed: !!id,
	}
}

const sendgql = gql`
  mutation Send($phone: String!) {
    send(phone: $phone) {
      success
			data {
				result
				reason
			}
    }
  }
`

export function useSend() {
	const [_, send, ] = useMutation(sendgql)
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
	$id.set('')
	store.clearAll()
}

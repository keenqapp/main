import { persistentAtom } from '@nanostores/persistent'
import { atom, computed } from 'nanostores'
import { useMutation } from 'urql'

import { checktokengql, sendgql, verifycodegql } from '@/services/auth/gql'
import { send as fbsend, signout, verify as fbverify } from '@/services/firebase'

import { create } from '@/utils/storage'
import { json } from '@/utils/utils'


const anonAccessToken = import.meta.env.VITE_ANON_ACCESS_TOKEN as string
const store = create('auth')

const authKeys = {
	accessToken: '$accessToken',
	id: '$id',
}

export const $id = persistentAtom<string>(authKeys.id, '')
export const $isAuthed = computed($id, id => !!id)
export const $accessToken = persistentAtom<string>(authKeys.accessToken, anonAccessToken)
export const $authError = atom<string|null>(null)

export const $isReg = persistentAtom('$isReg', false, json)

async function apiSend(phone: string, send: any) {
	const { data } = await send({ phone })
	if (!data?.send?.success) $authError.set(data?.send?.data.reason || 'auth.wrongPhone')
	if (data?.send?.data.isReg) $isReg.set(true)
	return data?.send?.success
}

async function apiVerify(phone: string, code: string, verify: any) {
	const { data } = await verify({ phone, code })
	if (data?.verify?.success) {
		$accessToken.set(data.verify.data.accessToken)
		$id.set(data.verify.data.id)
	}
	else {
		$authError.set(data?.verify?.data.reason || 'auth.wrongCode')
	}
	return data?.verify?.success
}

async function apiToken(phone: string, code: string, check: any) {
	const token = await fbverify(phone, code)
	const { data } = await check({ phone, token })
	if (data?.check?.success) {
		$accessToken.set(data.check.data.accessToken)
		$id.set(data.check.data.id)
	}
	else {
		$authError.set(data?.check?.data.reason || 'auth.wrongCode')
	}
	return data?.check?.success
}

export function useSend() {
	const [_, send, ] = useMutation(sendgql)
	return {
		send: async (phone: string) => {
			if (phone.startsWith('+7')) return await apiSend(phone, send)
			return await fbsend(phone)
		},
	}
}

export function useVerify() {
	const [ , verify ] = useMutation(verifycodegql)
	const [ , check ] = useMutation(checktokengql)
	return {
		verify: async (phone: string, code: string) => {
			if (phone.startsWith('+7')) return await apiVerify(phone, code, verify)
			return await apiToken(phone, code, check)
		}
	}
}

export async function logout() {
	$accessToken.set(anonAccessToken)
	$id.set('')
	store.clearAll()
	signout()
}

import { initializeApp } from 'firebase/app'
import { ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber, getAdditionalUserInfo } from 'firebase/auth'

import { $authError, $isReg } from '@/services/auth'

import { timeout } from '@/utils/utils'


const config = {
	apiKey: import.meta.env.VITE_FB_API_KEY,
	authDomain: 'keenqapp.firebaseapp.com',
	projectId: 'keenqapp',
	storageBucket: 'keenqapp.appspot.com',
	messagingSenderId: '1026282770947',
	appId: import.meta.env.VITE_FB_APP_ID,
}

const $app = initializeApp(config, 'keenq.app')
const $auth = getAuth($app)
const $verifier = new RecaptchaVerifier($auth, 'send-code-button', { size: 'invisible' })

let $phone: string | null = null
let $result: ConfirmationResult | null = null

export async function send(phone: string) {
	try {
		const result = await signInWithPhoneNumber($auth, phone, $verifier)
		$result = result
		$phone = phone
		return true
	}
	catch(e: any) {
		console.error('--- firebase.ts:33 -> send -> ', e)
		if (e.code === 'auth/too-many-requests') $authError.set('auth.tooManyRequests')
		else $authError.set('auth.wrongPhone')
		return false
	}
}

export async function verify(phone: string, code: string) {
	if (phone !== $phone) {
		$authError.set('auth.wrongPhone')
		return false
	}
	try {
		const result = await $result?.confirm(code)
		await timeout(10)
		const info = getAdditionalUserInfo(result!)
		if (info?.isNewUser) $isReg.set(true)
		return result?.user?.accessToken as string
	}
	catch(e) {
		console.error('--- firebase.ts:45 -> verify -> ', e)
		$authError.set('auth.wrongCode')
		return false
	}
}

export function signout() {
	$auth?.signOut()
}

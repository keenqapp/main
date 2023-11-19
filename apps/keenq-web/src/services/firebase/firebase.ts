import { initializeApp } from 'firebase/app'
import { ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { $authError } from '@/services/auth'


const config = {
	apiKey: import.meta.env.VITE_apiKey,
	authDomain: 'keenqapp.firebaseapp.com',
	projectId: 'keenqapp',
	storageBucket: 'keenqapp.appspot.com',
	messagingSenderId: '1026282770947',
	appId: import.meta.env.VITE_appId,
}

const $app = initializeApp(config)
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
	catch(e) {
		console.error('--- firebase.ts:33 -> send -> ', e)
		$authError.set('auth.wrongPhone')
		return false
	}
}

export async function verify(phone: string, code: string) {
	if (phone !== $phone) {
		$authError.set('auth.wrongPhone')
		return false
	}
	try {
		const result: any = await $result?.confirm(code)
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

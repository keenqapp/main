import { computed, signal } from '@preact/signals-react'
import { AuthError, ConfirmationResult, getAuth,
  onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, signOut, User } from 'firebase/auth'

import { app } from '@/providers/firebase'

function getCode(e: unknown) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (e?.code) return e.code
  return null
}

export const isReady = signal(false)

export const auth = getAuth(app)

export const user = signal<User|null>(null)

export const accessToken = signal<string|null>(null)

export const isAuthed = computed(() => user.value?.uid && !user.value?.isAnonymous)

export const error = signal<AuthError|null>(null)

onAuthStateChanged(auth, async (newUser) => {
  user.value = newUser
  const result1 = await newUser?.getIdTokenResult(true)
  const result2 = await newUser?.getIdToken(true)

  console.log('--- auth.ts:31 ->  -> result1', result1)
  console.log('--- auth.ts:32 ->  -> result2', result2)

  accessToken.value = await newUser?.getIdToken() || null
  isReady.value = true
})

let verifier: RecaptchaVerifier

export async function setupRecaptcha() {
  verifier = new RecaptchaVerifier('send-code-button', {
    size: 'invisible',
  }, auth)
}

let confirmationResult: ConfirmationResult

export async function sendCode(phoneNumber: string) {
  try {
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier)
    return true
  } catch(error_: unknown) {
    error.value = getCode(error_)
    return false
  }
}

export async function verifyCode(code: string) {
  try {
    await confirmationResult.confirm(code)
    return true
  } catch(error_) {
    error.value = getCode(error_)
    return false
  }
}

export async function logout() {
  signOut(auth)
}

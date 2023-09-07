import { initializeApp } from 'firebase/app'


const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'keenqapp.firebaseapp.com',
	projectId: 'keenqapp',
	messagingSenderId: '1026282770947',
	appId: '1:1026282770947:web:a13a0616afdc4a4d27f436'
}

export const app = initializeApp(firebaseConfig)

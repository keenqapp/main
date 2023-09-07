import { AuthProvider as RAAuthProvider } from 'react-admin'

// import set from 'lodash/set'
// import parseInt from 'lodash/parseInt'

// import client from 'services/api'

export interface IUser {
  id: string
}

export class Auth {

	provider

	static keys = {
		isAuthed: '@keenq:auth:isAuthed',
	}

	constructor({ provider }: any) {
		this.provider = provider
	}

	get = () => {
		return this.provider.getItem(Auth.keys.isAuthed)
		// if (data) return JSON.parse(set(data, 'id', parseInt(data.id)))
	}

	getToken = () => {
		// const token = this.provider.getItem(Auth.keys.token)
		// if (token) return token
	}

	getJwt = () => {
		// const jwt = this.provider.getItem(Auth.keys.jwt)
		// if (jwt) return jwt
	}

	getRole = () => {
		// const data = this.get()
		// if (data) return data.role
	}

	isAdmin = () => {
		// const user = this.get()
		// return user.isAdmin
	}

	set = () => {
		this.provider.setItem(Auth.keys.isAuthed, true)
	}

	remove = () => {
		this.provider.removeItem(Auth.keys.isAuthed)
	}

	static checkPermissions() {
		return true
		// if (permissions === Auth.roles.adviser && level === Auth.roles.adviser) return true
		// if (permissions === Auth.roles.manager && (level === Auth.roles.adviser || level === Auth.roles.manager)) return true
		// if (permissions === Auth.roles.superadmin && (level === Auth.roles.adviser || level === Auth.roles.manager || level === Auth.roles.superadmin)) return true
		// return false
	}

}

const auth = new Auth({ provider: localStorage })
export { auth }

class AuthProvider implements RAAuthProvider {

	storage
	// api

	constructor({ storage }: { storage: Auth }  ) {
		this.storage = storage
		// this.api = api
	}

	checkAuth = async (): Promise<void> => {
		const isAuthed = this.storage.get()
		if (isAuthed) return Promise.resolve()
		return Promise.reject(undefined)
	}

	getIdentity = () => {
		return Promise.resolve({ id: 0 })
		// const data = this.storage.get()
		// if (data) return Promise.resolve<IUser>(data)
		// return Promise.reject(undefined)
	}

	checkError = async (): Promise<void> => {
		return Promise.reject(undefined)
	}

	getPermissions = async (): Promise<any> => {
		// const data = this.storage.get()
		// if (data?.attributes.adminRole) return Promise.resolve(data.attributes.adminRole)
		// else return Promise.reject('not_admin')
		return Promise.resolve()
	}

	login = async ({ username, password }: { username: string, password: string }): Promise<any> => {
		const login = import.meta.env.VITE_LOGIN
		const pass = import.meta.env.VITE_PASS

		if (login === username && pass === password) {
			this.storage.set()
			return true
		} else {
			throw Error('not_valid')
		}
	}

	logout = async (): Promise<void | false | string> => {
		this.storage.remove()
		return Promise.resolve(undefined)
	}

}

export default new AuthProvider({ storage: auth })

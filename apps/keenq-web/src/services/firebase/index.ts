let loaded: any

async function load() {
	if (loaded) return loaded
	loaded = await import('./firebase')
	return loaded
}

async function send(phone: string) {
	const module = await load()
	return module.send(phone)
}

async function verify(phone: string, code: string) {
	const module = await load()
	return module.verify(phone, code)
}

async function signout() {
	const module = await load()
	return module.signout()
}

export {
	send,
	signout,
	verify
}

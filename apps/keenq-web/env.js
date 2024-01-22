import axiox from 'axios'


const client = axiox.create({
	baseURL: 'https://api.keenq.app/other/env'
})

async function api(data) {
	return (await client.post('', data)).data
}

export default async function env() {
	return {
		name: 'env',
		version: '1.0.0',
		async: true,
		config: async () => {
			const result = await api({ test: 'test' })
			console.log('env.js ---> config ---> 19: ', result)
			const config = {
				define: {
					'import.meta.env.TEST': true
				}
			}
			return config
		}
	}
}

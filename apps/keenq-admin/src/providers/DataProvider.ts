import buildHasuraProvider from 'ra-data-hasura'
import { useEffect, useState } from 'react'
import { DataProvider } from 'react-admin'


export default function useDataProvider() {
	const [dataProvider, setDataProvider] = useState<DataProvider|null>(null)

	useEffect(() => {
		const buildDataProvider = async () => {
			const dataProvider = await buildHasuraProvider({
				clientOptions: { uri: 'https://api.keenq.app/v1/graphql', headers: { 'x-hasura-admin-secret': import.meta.env.VITE_HASURA_SECRET } },
			})
			setDataProvider(() => dataProvider)
		}
		buildDataProvider()
	}, [])

	return dataProvider
}

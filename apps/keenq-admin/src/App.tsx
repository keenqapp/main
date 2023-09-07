import { Admin, Resource } from 'react-admin'

import authProvider from '@/providers/AuthProvider'
import useDataProvider from '@/providers/DataProvider'
import { MatchesCoE, MatchesIcon, MatchesList } from '@/resources/matches'


const App = () => {
	const dataProvider = useDataProvider()

	if (!dataProvider) return <p>Loading...</p>

	return (
		<Admin
			dataProvider={dataProvider}
			authProvider={authProvider}
		>
			<Resource
				name='matches'
				icon={MatchesIcon}
				list={MatchesList}
				edit={MatchesCoE}
				create={MatchesCoE}
			/>
		</Admin>
	)
}

export default App

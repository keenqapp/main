import { Admin, Resource } from 'react-admin'

import authProvider from '@/providers/AuthProvider'
import useDataProvider from '@/providers/DataProvider'
import { MatchesCoE, MatchesIcon, MatchesList } from '@/resources/matches'
import { TagsCoE, TagsIcon, TagsList } from '@/resources/tags'


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
			<Resource
				name='tags'
				icon={TagsIcon}
				list={TagsList}
				edit={TagsCoE}
				create={TagsCoE}
			/>
		</Admin>
	)
}

export default App

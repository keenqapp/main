import { Datagrid, DeleteButton, EditButton, List, SearchInput, TextField, useRecordContext } from 'react-admin'

import Chip from '@mui/material/Chip'


function TagsField() {
	const record = useRecordContext()
	return record.type.map((type: string) => <Chip key={type} label={type} />)
}


const filters = [
	<SearchInput key='name' source='label' alwaysOn />,
]

function TagsList() {
	return (
		<List perPage={500} filters={filters}>
			<Datagrid>
				<TextField source='label' />
				<TextField source='locale' />
				<TagsField source='type' name='type' />
				<EditButton />
				<DeleteButton />
			</Datagrid>
		</List>
	)
}

export default TagsList

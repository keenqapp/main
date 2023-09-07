import { Datagrid, DeleteButton, EditButton, List, TextField } from 'react-admin'


function MatchesList() {
	return (
		<List>
			<Datagrid>
				<TextField source='authorId' />
				<TextField source='memberId' />
				<TextField source='type' />
				<TextField source='result' />
				<EditButton />
				<DeleteButton />
			</Datagrid>
		</List>
	)
}

export default MatchesList

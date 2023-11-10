import {
	Datagrid,
	DeleteButton,
	EditButton,
	List,
	SearchInput,
	TextField,
	useGetOne,
	useRecordContext,
	useUpdate } from 'react-admin'

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import Stack from '@/components/Stack.tsx'


function TagsField() {
	const record = useRecordContext()
	const [ update ] = useUpdate()
	const { refetch } = useGetOne('tags', { id: record.id }, { enabled: false })

	const onChange = async (e: any) => {
		await update('tags', { id: record.id, data: { type: e.target.value } })
		await refetch()
	}

	return (
		<Select
			multiple
			value={record.type}
			onChange={onChange}
			style={{ minWidth: 200 }}
		>
			<MenuItem value='sensual'>Sensual</MenuItem>
			<MenuItem value='interest'>Interest</MenuItem>
		</Select>
	)
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
				<Stack justify='end'>
					<EditButton />
					<DeleteButton />
				</Stack>
			</Datagrid>
		</List>
	)
}

export default TagsList

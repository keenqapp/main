import { SelectArrayInput, SimpleForm, TextInput } from 'react-admin'

import CreateOrEdit from '@/components/CreateOrEdit'


const choices = [
	{ id: 'sensual', name: 'Sensual' },
	{ id: 'interest', name: 'Interest' },
]

function TagsCoE(props: any) {
	return (
		<CreateOrEdit {...props}>
			<SimpleForm>
				<TextInput source='label' name='label'/>
				<SelectArrayInput source='type' name='type' choices={choices} />
			</SimpleForm>
		</CreateOrEdit>
	)
}

export default TagsCoE

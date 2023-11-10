import { SelectArrayInput, SimpleForm, TextInput, SelectInput } from 'react-admin'

import CreateOrEdit from '@/components/CreateOrEdit'


const choices = [
	{ id: 'sensual', name: 'Sensual' },
	{ id: 'interest', name: 'Interest' },
]

const langs = [
	{ id: 'en-US', name: 'English' },
	{ id: 'ru-RU', name: 'Russian' },
]

function TagsCoE(props: any) {
	return (
		<CreateOrEdit {...props}>
			<SimpleForm>
				<TextInput source='label' name='label'/>
				<SelectInput source='locale' name='lang' choices={langs} />
				<SelectArrayInput source='type' name='type' choices={choices} />
			</SimpleForm>
		</CreateOrEdit>
	)
}

export default TagsCoE

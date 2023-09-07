import { SimpleForm, TextInput } from 'react-admin'

import CreateOrEdit from '@/components/CreateOrEdit'


function MatchesCoE(props: any) {
	return (
		<CreateOrEdit {...props}>
			<SimpleForm>
				<TextInput source='name' name='name'/>
				<TextInput source='description' name='description'/>
			</SimpleForm>
		</CreateOrEdit>
	)
}

export default MatchesCoE

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { useNotifications } from '@/services/notifications'

import Column from '@/ui/Column'
import Container from '@/ui/Container'
import Page from '@/ui/Page'
import styled from '@emotion/styled'
import { useInput } from '@/hooks/useInput'
import Row from '@/ui/Row'
import List from '@/ui/List'

const Item = styled.div`
	background: lightgray;
	padding: 1rem;
`

const Input = styled(TextField)`
	flex-grow: 1;
`

const mock = [
	{ id: '1', name: 'test1' },
	{ id: '2', name: 'test2' },
	{ id: '3', name: 'test3' },
	{ id: '4', name: 'test4' },
	{ id: '5', name: 'test5' },
	{ id: '6', name: 'test6' },
	{ id: '7', name: 'test7' },
	{ id: '8', name: 'test8' },
	{ id: '9', name: 'test9' },
	{ id: '10', name: 'test10' },
	{ id: '11', name: 'test11' },
	{ id: '12', name: 'test12' },
	{ id: '13', name: 'test13' },
	{ id: '14', name: 'test14' },
	{ id: '15', name: 'test15' },
	{ id: '16', name: 'test16' },
	{ id: '17', name: 'test17' },
	{ id: '18', name: 'test18' },
	{ id: '19', name: 'test19' },
	{ id: '20', name: 'test20' },
]

function TestPage() {
	const { notify } = useNotifications()
	const textInput = useInput({
		value: '',
		variant: 'outlined',
		fullWidth: true,
		autocomplete: 'off',
		dense: true,
		multiline: true,
		maxRows: 3,
	})
	return (
		<Page data-testid='TestPage'>
			<Container flex>
				<Column flex={1}>
					<div>header</div>
					<Row direction='column' flex={1} gap={1}>
						<List
							name='test'
							data={mock}
							render={item => <Item key={item.id}>{item.name}</Item> }
						/>
					</Row>
					<div>
						<Input
							{...textInput}
						/>
					</div>
				</Column>
			</Container>
		</Page>
	)
}

export default TestPage

import styled from '@emotion/styled'

import TextField from '@mui/material/TextField'

import Container from '@/ui/Container'
import List from '@/ui/List'
import Page from '@/ui/Page'
import Stack from '@/ui/Stack'

import { useInput } from '@/hooks/useInput'


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
	// const { notify } = useNotifications()
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
				<Stack direction='column' flex={1}>
					<div>header</div>
					<Stack direction='column' flex={1} gap={1}>
						<List
							name='test'
							data={mock}
							render={item => <Item key={item.id}>{item.name}</Item> }
						/>
					</Stack>
					<div>
						<Input
							{...textInput}
						/>
					</div>
				</Stack>
			</Container>
		</Page>
	)
}

export default TestPage

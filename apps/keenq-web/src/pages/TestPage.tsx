import styled from '@emotion/styled'
import { gql } from 'urql'

import IconButton from '@mui/material/IconButton'

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'

import { useTranslate } from '@/services/translate'

import { IMatch } from '@/model/match'
import { useCurrentMember } from '@/model/member'

import Container from '@/ui/Container'
import List from '@/ui/List'
import Page from '@/ui/Page'
import Space from '@/ui/Space'
import Stack from '@/ui/Stack'
import Text from '@/ui/Text'

import { useMutation, useQuery } from '@/hooks/gql'


const mymatches = gql`
	query MyMatches($id: String!) {
		matches(where: { authorId: { _eq: $id } }) {
			id
			authorId
			memberId
			type
			member {
				id
				name
			}
		}
	}
`

const tomematches = gql`
	query ToMeMatches($id: String!) {
		matches(where: { memberId: { _eq: $id } }) {
			id
			authorId
			memberId
			type
			author {
				id
				name
			}
		}
	}
`

const removematch = gql`
	mutation RemoveMatch($id: uuid!) {
		delete_matches(where: { id: { _eq: $id } }) {
			affected_rows
		}
	}
`

const types = {
	yes: <FavoriteTwoToneIcon color='primary' />,
	no: <RemoveCircleTwoToneIcon color='secondary' />,
	seen: <VisibilityTwoToneIcon />
}

const Item = styled(Stack)`
	padding: 0.33rem 0;
`

function MyMatchesItem({ id, member, type, result }: IMatch) {
	const [ , remove ] = useMutation(removematch)
	return (
		<Item>
			<Stack justify='start' gap={0.5}>
				{types[type]}
				<Text>{member?.name || member?.id}</Text>
			</Stack>
			<IconButton color='error' onClick={() => remove({ id })}><DeleteForeverTwoToneIcon /></IconButton>
		</Item>
	)
}

function ToMeMatchesItem({ id, type, author }: IMatch) {
	const [ , remove ] = useMutation(removematch)
	return (
		<Item>
			<Stack justify='start' gap={0.5}>
				{types[type]}
				<Text>{author?.name || author?.id}</Text>
			</Stack>
			<IconButton color='error' onClick={() => remove({ id })}><DeleteForeverTwoToneIcon /></IconButton>
		</Item>
	)
}

function TestPage() {
	const { t } = useTranslate()
	const { id } = useCurrentMember()
	const [ myresult ] = useQuery(mymatches, { id })
	const [ tomeresult ] = useQuery(tomematches, { id })
	const myMatches = myresult.data?.matches || []
	const toMeMatches = tomeresult.data?.matches || []
	return (
		<Page data-testid='TestPage'>
			<Container flex>
				<Text variant='h6'>{t`test.my`}</Text>
				<List
					name='TestMyMatches'
					data={myMatches}
					render={MyMatchesItem}
				/>
				<Space width={2} />
				<Text variant='h6'>{t`test.toMe`}</Text>
				<List
					name='TestMyMatches'
					data={toMeMatches}
					render={ToMeMatchesItem}
				/>
			</Container>
		</Page>
	)
}

export default TestPage

import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import Card from '@/ui/Card'
import Column from '@/ui/Column'
import List from '@/ui/List'

import PublicRoomsItem from '@/components/Rooms/PublicRoomsItem'

import { useQuery } from '@/hooks/gql'
import { roomgql } from '@/model/room'


const RoomsEmptyContainer = styled(Column)`
	flex: 1;
`

const Content = styled(Column)`
	padding: 0 2rem;
`

const DEFAULT_TEXT = 'Here will be\nchats with your matches\nand\nrooms for conversations!'

function RoomsEmpty() {
	const [ result ] = useQuery(roomgql, { id: 'keenq' })
	return (
		<RoomsEmptyContainer data-testid='RoomsEmpty' gap={0.2}>
			<Content gap={1}>
				<Card align='center'>
					<Typography
						variant='overline'
						textAlign='center'
						whiteSpace='pre-wrap'
						lineHeight={1.5}
					>{DEFAULT_TEXT}</Typography>
				</Card>
				<Typography variant='h6'>And now you can join and read:</Typography>
			</Content>
			<List
				data={result.data ? [result.data?.rooms_by_pk] : []}
				render={PublicRoomsItem}
			/>
		</RoomsEmptyContainer>
	)
}

export default RoomsEmpty

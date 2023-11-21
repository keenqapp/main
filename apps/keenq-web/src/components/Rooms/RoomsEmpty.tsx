import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import { useTranslate } from '@/services/translate'

import { getroomsgql } from '@/model/room'

import Card from '@/ui/Card'
import List from '@/ui/List'
import Stack from '@/ui/Stack'

import PublicRoomsItem from '@/components/Rooms/PublicRoomsItem'

import { useQuery } from '@/hooks/gql'


const RoomsEmptyContainer = styled(Stack)`
	flex: 1;
	justify-content: start;
  flex-direction: column;
`

const Content = styled(Stack)`
	padding: 0 2rem;
	flex-direction: column;
	justify-content: stretch;
`

function RoomsEmpty() {
	const { t } = useTranslate()
	const [ result ] = useQuery(getroomsgql, { ids: ['keenq', 'keenq_support' ] })
	return (
		<RoomsEmptyContainer data-testid='RoomsEmpty' gap={0.2}>
			<Content gap={1}>
				<Card align='center'>
					<Typography
						variant='overline'
						textAlign='center'
						whiteSpace='pre-wrap'
						lineHeight={1.5}
					>{t`rooms.here`}</Typography>
				</Card>
				<Typography variant='h6'>{t`rooms.empty`}</Typography>
			</Content>
			<List
				data={result.data ? result.data?.rooms : []}
				render={PublicRoomsItem}
			/>
		</RoomsEmptyContainer>
	)
}

export default RoomsEmpty

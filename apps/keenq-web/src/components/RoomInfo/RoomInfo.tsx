import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'

import Stack from '@/ui/Stack'
import Container from '@/ui/Container'

import RoomInfoDetails from '@/components/RoomInfo/RoomInfoDetails'
import RoomInfoHeader from '@/components/RoomInfo/RoomInfoHeader'
import RoomInfoImage from '@/components/RoomInfo/RoomInfoImage'
import RoomInfoMembers from '@/components/RoomInfo/RoomInfoMembers'

import { useQuery } from '@/hooks/gql'
import { IRoom, roomgql } from '@/model/room'


const RoomInfoContainer = styled(Container)`
	//align-items: center;
`

const options = {
	requestPolicy: 'cache-and-network',
} as const

function RoomInfo() {
	const { id } = useParams()
	const [ result ] = useQuery(roomgql, { id }, options)
	const room = result.data?.rooms_by_pk || {} as IRoom

	return (
		<RoomInfoContainer data-testid='RoomInfo' flex>
			<Stack direction='column' gap={1} flex={1}>
				<RoomInfoHeader {...room} />
				<RoomInfoImage {...room} />
				<RoomInfoDetails {...room} />
				<RoomInfoMembers />
			</Stack>
		</RoomInfoContainer>
	)
}

export default RoomInfo

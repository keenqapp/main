import Page from '@/ui/Page'

import RoomInfo from '@/components/RoomInfo'

import RoomInfoMemberMenu from '@/modals/RoomInfoMemberMenu'
import RoomInfoMenu from '@/modals/RoomInfoMenu'


function RoomInfoPage() {
	return (
		<Page data-testid='RoomInfoPage'>
			<RoomInfo />
			<RoomInfoMemberMenu />
			<RoomInfoMenu />
		</Page>
	)
}

export default RoomInfoPage

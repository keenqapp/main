import Page from '@/ui/Page'

import Room from '@/components/Room'

import AddMemberDrawer from '@/modals/AddMemberDrawer'
import MessageMenu from '@/modals/MessageMenu'
import ReportMenu from '@/modals/ReportMenu'
import RoomMenu from '@/modals/RoomMenu'


function RoomPage() {
	return (
		<Page data-testid='RoomPage' duration={500}>
			<Room />
			<RoomMenu />
			<ReportMenu />
			<AddMemberDrawer />
			<MessageMenu />
		</Page>
	)
}

export default RoomPage

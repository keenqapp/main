import Page from '@/ui/Page'

import Room from '@/components/Room'

import AddMemberToRoom from '@/modals/AddMemberToRoomDrawer'
import AttachmentDrawer from '@/modals/AttachmentDrawer'
import MessageMenu from '@/modals/MessageMenu'
import PartnerRequestMenu from '@/modals/PartnerRequestMenu'
import ReportMenu from '@/modals/ReportMenu'
import RoomMenu from '@/modals/RoomMenu'


function RoomPage() {
	return (
		<Page data-testid='RoomPage' duration={500}>
			<Room />
			<RoomMenu />
			<ReportMenu />
			<AddMemberToRoom />
			<MessageMenu />
			<AttachmentDrawer />
			<PartnerRequestMenu />
		</Page>
	)
}

export default RoomPage

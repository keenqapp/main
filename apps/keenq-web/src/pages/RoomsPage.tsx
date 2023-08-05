import Page from '@/ui/Page'

import Rooms from '@/components/Rooms'

import CreateRoomModal from '@/modals/CreateRoomModal'
import RoomsMenu from '@/modals/RoomsMenu'


function RoomsPage() {
	return (
		<Page data-testid='RoomsPage'>
			<Rooms />
			<RoomsMenu />
			<CreateRoomModal />
		</Page>
	)
}

export default RoomsPage

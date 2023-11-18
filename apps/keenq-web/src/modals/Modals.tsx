import ConfirmDialog from '@/modals/ConfirmDialog'
import InstallDrawer from '@/modals/InstallDrawer'
import LinkMenu from '@/modals/LinkMenu'
import NotificationsDrawer from '@/modals/NotificationsDrawer'
import ReportMenu from '@/modals/ReportMenu'
import ShareDrawer from '@/modals/ShareDrawer'


// THOUGHT Now all modals are on different 'Pages' - can be case when we want to open modal from one page to another
function Modals() {
	return (
		<>
			<ConfirmDialog />
			<ReportMenu />
			<InstallDrawer />
			<NotificationsDrawer />
			<ShareDrawer />
			<LinkMenu />
		</>
	)
}

export default Modals

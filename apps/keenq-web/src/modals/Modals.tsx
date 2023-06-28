import ConfirmDialog from '@/modals/ConfirmDialog'
import ReportMenu from '@/modals/ReportMenu'


// THOUGHT Now all modals are on different 'Pages' - can be case when we want to open modal from one page to another
function Modals() {
	return (
		<>
			<ConfirmDialog />
			<ReportMenu />
		</>
	)
}

export default Modals

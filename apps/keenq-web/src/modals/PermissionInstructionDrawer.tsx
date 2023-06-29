import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Card from '@/ui/Card'
import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'


function PermissionInstructionDrawer() {
	const { name } = useModal('permissionInstruction')

	return (
		<Drawer data-testid='PermissionInstructionDrawer' name={name}>
			<DrawerList>
				<DrawerItem>
					<Card>
						<Typography variant='overline'>
							Please, search internet how to enable location permission on your platform
						</Typography>

					</Card>
				</DrawerItem>
			</DrawerList>
		</Drawer>
	)
}

export default PermissionInstructionDrawer

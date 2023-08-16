import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { logout } from '@/services/auth'
import { useConfirm, useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { updatemembergql } from '@/model/member'
import { useCurrentMember } from '@/model/member/hooks'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'
import Space from '@/ui/Space'

import { useUpdate } from '@/hooks/gql'


function SettingsDrawer() {
	const { t } = useTranslate('settings')
	const { name, on } = useModal('settings')
	const {
		id,
		visible
	} = useCurrentMember()
	const { confirm } = useConfirm()
	const [ , update ] = useUpdate(updatemembergql)

	const onShowChange = () => update(id, { visible: !visible })

	const onCloseClick = () => {
		confirm({
			onConfirm: on(() => { console.log('--- SettingsDrawer.tsx:28 -> onConfirm ->', 'close account') })
		})
	}

	return (
		<Drawer data-testid='SettingsDrawer' name={name}>
			<DrawerList>
				<DrawerItem
					icon={<HighlightOffTwoToneIcon color='error' />}
					text={t`close`}
					onClick={onCloseClick}
				/>
				<DrawerItem
					icon={visible ? <VisibilityIcon color='primary' /> : <VisibilityOffIcon color='error' />}
					text={t`showMe`}
					subtext={visible ? t`visible` : t`hidden`}
					action={<Switch onChange={onShowChange} checked={visible || false} />}
				/>
				<Space />
				<Divider />
				<Space />
				<DrawerItem>
					<Button
						color='warning'
						variant='outlined'
						startIcon={<LogoutTwoToneIcon />}
						fullWidth
						onClick={on(logout)}
					>{t`logout`}</Button>
				</DrawerItem>
			</DrawerList>
		</Drawer>
	)
}

export default SettingsDrawer

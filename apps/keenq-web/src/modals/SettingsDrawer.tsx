import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone'
import TranslateIcon from '@mui/icons-material/Translate'
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
	const { t, locale, change } = useTranslate()
	const { name, on } = useModal('settings')
	const {
		id,
		visible,
		isTester
	} = useCurrentMember()
	const { confirm } = useConfirm()
	const [ , update ] = useUpdate(updatemembergql)

	const onShowChange = (value: string) => update(id, { visible: value })

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
					text={t`settings.close`}
					onClick={onCloseClick}
				/>
				<DrawerItem
					icon={visible ? <VisibilityIcon color='primary' /> : <VisibilityOffIcon color='error' />}
					text={t`settings.showMe`}
					action={(
						<Select
							native
							defaultValue={visible}
							onChange={(e: any) => onShowChange(e.target.value)}
							variant='outlined'
						>
							<option value='everybody'>{t`settings.everybody`}</option>
							<option value='matches'>{t`settings.matches`}</option>
							<option value='nobody'>{t`settings.nobody`}</option>
						</Select>
					)}
				/>
				<DrawerItem
					icon={<TranslateIcon color='primary' />}
					text={t`lang.lang`}
					subtext={isTester ? navigator.language : ''}
					action={(
						<Select
							native
							defaultValue={locale}
							onChange={(e: any) => change(e.target.value)}
							variant='outlined'
						>
							<option value='en-US'>{t`lang.en-US`}</option>
							<option value='ru-RU'>{t`lang.ru-RU`}</option>
						</Select>
					)}
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
					>{t`settings.logout`}</Button>
				</DrawerItem>
			</DrawerList>
		</Drawer>
	)
}

export default SettingsDrawer

import styled from '@emotion/styled'
import { useStore } from '@nanostores/preact'

import IconButton from '@mui/material/IconButton'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import Space from '@/ui/Space'
import Stack from '@/ui/Stack'
import theme from '@/ui/theme'

import { $showTabs, $tab } from '@/components/Rooms/store'


const Folders = styled(Tabs)`
	min-height: auto;
	
	.MuiTabs-indicator {
		background-color: ${theme.color.primaryLight};
	}
`

const Folder = styled(Tab)`
	border-radius: 8px;
  padding: 0 0.2rem !important;
	font-size: 0.75rem;
	&.MuiButtonBase-root {
		height: 1.5rem;
		min-height: auto;
	}
  &.Mui-selected {
    background-color: ${theme.color.primaryVeryLight};
  }
`

const RoomInfoContainer = styled(Stack)`
	height: var(--vertical-space);
	padding: 0 1rem;
`

function RoomsHeader() {
	const { t } = useTranslate('rooms')
	const tab = useStore($tab)
	const showTabs = useStore($showTabs)
	const { open } = useModal('rooms')
	const onChange = (_: any, _tab: string) => $tab.set(_tab)

	return (
		<RoomInfoContainer data-testid='RoomsHeader'>
			{showTabs && (
				<Folders
					value={tab}
					onChange={onChange}
					variant='scrollable'
					scrollButtons='auto'
				>
					<Folder value='personal' label={t`personal`} />
					<Folder value='rooms' label={t`rooms`} />
				</Folders>
			)}
			<Space grow />
			<IconButton onClick={open}><MoreVertTwoToneIcon /></IconButton>
		</RoomInfoContainer>
	)
}

export default RoomsHeader

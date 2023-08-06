import styled from '@emotion/styled'
import { useStore } from '@nanostores/preact'

import IconButton from '@mui/material/IconButton'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'

import { useModal } from '@/services/modals'

import Row from '@/ui/Row'
import Space from '@/ui/Space'
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

const RoomInfoContainer = styled(Row)`
	height: var(--vertical-space);
	padding: 0 1rem;
`

function RoomsHeader() {
	const tab = useStore($tab)
	const showTabs = useStore($showTabs)
	const { onOpen } = useModal('rooms')
	const onChange = (_: any, t: string) => $tab.set(t)

	return (
		<RoomInfoContainer data-testid='RoomsHeader'>
			{showTabs && (
				<Folders
					value={tab}
					onChange={onChange}
					variant='scrollable'
					scrollButtons='auto'
				>
					<Folder value='personal' label='personal' />
					<Folder value='rooms' label='rooms' />
				</Folders>
			)}
			<Space grow />
			<IconButton onClick={onOpen}><MoreVertTwoToneIcon /></IconButton>
		</RoomInfoContainer>
	)
}

export default RoomsHeader

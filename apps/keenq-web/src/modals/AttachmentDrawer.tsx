import styled from '@emotion/styled'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// TODO implement gifs and stickers
// import GifBoxTwoToneIcon from '@mui/icons-material/GifBoxTwoTone'
// import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone'
import PhotoCameraBackTwoToneIcon from '@mui/icons-material/PhotoCameraBackTwoTone'

import { useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'
import Upload from '@/ui/Upload'

import { prepareImageToUpload } from '@/components/Room/RoomInput/state'


const StyledDrawerItem = styled(DrawerItem)`
	position: relative;
	
	input {
		visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}
`

function AttachmentDrawer() {
	const { name, on } = useModal('attachment')
	const imageChange = async (e: any) => {
		for await (const file of Array.from(e.target.files).slice(0, 3)) {
			await prepareImageToUpload(file as File)
		}
	}

	return (
		<Drawer data-testid='AttachmentDrawer' name={name}>
			<DrawerList>
				<StyledDrawerItem text=''>
					<Upload onChange={on(imageChange)} accept='image/*' multiple>
						<ListItemButton component='span'>
							<ListItemIcon><PhotoCameraBackTwoToneIcon color='primary' /></ListItemIcon>
							<ListItemText primary='Photos' secondary='Max 3' />
						</ListItemButton>
					</Upload>
				</StyledDrawerItem>
				{/* TODO implement gifs and stickers */}
				{/*<DrawerItem icon={<GifBoxTwoToneIcon color='primary' />} text='Gif' onClick={on(gifClick)} />*/}
				{/*<DrawerItem icon={<SentimentVerySatisfiedTwoToneIcon color='primary' />} text='Sticker' onClick={on(stickerClick)} />*/}
			</DrawerList>
		</Drawer>
	)
}

export default AttachmentDrawer

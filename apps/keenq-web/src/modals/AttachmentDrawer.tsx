import styled from '@emotion/styled'

// TODO implement gifs and stickers
// import GifBoxTwoToneIcon from '@mui/icons-material/GifBoxTwoTone'
// import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone'
import PhotoCameraBackTwoToneIcon from '@mui/icons-material/PhotoCameraBackTwoTone'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'


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

	const photoOrVideoChange = () => {
		console.log('--- AttachmentDrawer.tsx:12 -> photoOrVideoClick ->', 'photoOrVideoClick')
	}

	// const selectFile = () => {}
	//
	// const gifClick = () => {
	// 	console.log('--- AttachmentDrawer.tsx:16 -> gifClick ->', 'gifClick')
	// }
	//
	// const stickerClick = () => {
	// 	console.log('--- AttachmentDrawer.tsx:20 -> stickerClick ->', 'stickerClick')
	// }

	return (
		<Drawer data-testid='AttachmentDrawer' name={name}>
			<DrawerList>
				<StyledDrawerItem text=''>
					<label htmlFor="contained-button-file">
						{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
						{/* @ts-ignore */}
						<ListItemButton component='span'>
							<ListItemIcon><PhotoCameraBackTwoToneIcon color='primary' /></ListItemIcon>
							<ListItemText primary='Photo or video' />
						</ListItemButton>
					</label>
					<input
						accept="image/*"
						id="contained-button-file"
						type="file"
						onChange={on(photoOrVideoChange)}
					/>
				</StyledDrawerItem>
				{/* TODO implement gifs and stickers */}
				{/*<DrawerItem icon={<GifBoxTwoToneIcon color='primary' />} text='Gif' onClick={on(gifClick)} />*/}
				{/*<DrawerItem icon={<SentimentVerySatisfiedTwoToneIcon color='primary' />} text='Sticker' onClick={on(stickerClick)} />*/}
			</DrawerList>
		</Drawer>
	)
}

export default AttachmentDrawer

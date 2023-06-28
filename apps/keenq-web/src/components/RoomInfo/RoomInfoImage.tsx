import styled from '@emotion/styled'

import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone'
import IconButton from '@mui/material/IconButton'

import Row from '@/ui/Row'

import { useCurrentMember } from '@/hooks/useCurrentMember'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { IRoom } from '@/model/room'


const RoomInfoImageContainer = styled(Row)`
	position: relative;
	
	& input {
		visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}
`

const Image = styled.img`
	border-radius: 33vw;
	width: 50vw;
	height: 50vw;
`

const AddPhoto = styled(IconButton)`
	position: absolute;
	bottom: -0.5rem;
	right: 2rem;
`

function RoomInfoImage({ image }: IRoom) {
	const { uid: cuid } = useCurrentMember()
	const admin = useIsAdmin(cuid)
	console.log('--- RoomInfoImage.tsx:39 -> RoomInfoImage ->', admin)
	const onChange = () => {}
	return (
		<RoomInfoImageContainer data-testid='RoomInfoImage' justify='center'>
			<Image src={image} />
			{admin && (
				<>
					<label htmlFor="contained-button-file">
						<AddPhoto color='primary' component='span'><AddAPhotoTwoToneIcon /></AddPhoto>
					</label>
					<input
						accept="image/*"
						id="contained-button-file"
						type="file"
						onChange={onChange}
					/>
				</>
			)}
		</RoomInfoImageContainer>
	)
}

export default RoomInfoImage

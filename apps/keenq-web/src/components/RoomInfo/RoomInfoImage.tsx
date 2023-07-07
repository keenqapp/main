import styled from '@emotion/styled'

import IconButton from '@mui/material/IconButton'

import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone'
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';

import { uploadImage } from '@/services/spaces'

import Row from '@/ui/Row'
import Upload from '@/ui/Upload'

import { useUpdate } from '@/hooks/gql'
import { useCurrentMember } from '@/model/member/hooks'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { IRoom, updateroomgql } from '@/model/room'


const RoomInfoImageContainer = styled(Row)`
	position: relative;
`

const Image = styled.img`
	border-radius: 33vw;
	width: 50vw;
	height: 50vw;
  background: #eee;
	object-fit: cover;
`

const AddPhoto = styled(IconButton)`
	position: absolute;
	bottom: -0.5rem;
	right: 2rem;
`

const EmptyIcon = styled(MmsTwoToneIcon)`
	box-sizing: content-box;
  width: 20vw;
  height: 20vw;
`

const EmptyIconContainer = styled.div`
  padding: 15vw;
  background: #eee;
  border-radius: 33vw;
`

function RoomInfoImage({ id, image }: IRoom) {
	const { id: cid } = useCurrentMember()
	const admin = useIsAdmin(cid)
	const [ , update] = useUpdate(updateroomgql)
	const onChange = async (e: any) => {
		for await (const file of e.target.files) {
			const image = await uploadImage(`rooms/${id}`, file)
			await update(id, { image })
		}
	}
	return (
		<RoomInfoImageContainer data-testid='RoomInfoImage' justify='center'>
			{image?.url ? <Image src={image.url} /> : <EmptyIconContainer><EmptyIcon /></EmptyIconContainer>}
			{admin && <Upload onChange={onChange} accept='image/*'><AddPhoto color='primary' component='span'><AddAPhotoTwoToneIcon /></AddPhoto></Upload>}
		</RoomInfoImageContainer>
	)
}

export default RoomInfoImage

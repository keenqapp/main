import styled from '@emotion/styled'

import IconButton from '@mui/material/IconButton'

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'

import Stack from '@/ui/Stack'
import theme from '@/ui/theme'

import { $imagesToEdit } from '@/components/Room/RoomInput/state'

import { IImage } from '@/model/other'


const ImageContainer = styled(Stack)`
	${theme.boxShadow};
	border-radius: 8px;
	padding: 0.2rem;
	&:last-child {
		margin-bottom: 0.5rem;
	}
`

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 8px !important;
`

function RoomInputEditImage({ id, url }: IImage) {
	const onClick = () => $imagesToEdit.set($imagesToEdit.get().excludeById(id))
	return (
		<ImageContainer flex>
			<Image src={url} />
			<IconButton color='secondary' onClick={onClick}><HighlightOffTwoToneIcon /></IconButton>
		</ImageContainer>
	)
}

export default RoomInputEditImage

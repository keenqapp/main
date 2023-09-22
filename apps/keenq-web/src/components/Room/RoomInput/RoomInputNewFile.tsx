import styled from '@emotion/styled'

import IconButton from '@mui/material/IconButton'

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'

import Stack from '@/ui/Stack'
import theme from '@/ui/theme'

import { $imagesToAdd } from '@/components/Room/RoomInput/state'

import { ResizeResult } from '@/utils/resize'


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

function RoomInputNewFile({ id, data }: ResizeResult) {
	const onClick = () => $imagesToAdd.set($imagesToAdd.get().copyDelete(id))
	return (
		<ImageContainer flex>
			<Image src={data} />
			<IconButton color='secondary' onClick={onClick}><HighlightOffTwoToneIcon /></IconButton>
		</ImageContainer>
	)
}

export default RoomInputNewFile

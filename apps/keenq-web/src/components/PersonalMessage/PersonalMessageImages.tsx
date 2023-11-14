import styled from '@emotion/styled'

import { getImages, IMessage } from '@/model/message'
import { IImage } from '@/model/other'
import { useCurrentRoom } from '@/model/room'
import Stack from '@/ui/Stack'


function getWidth(width: number, height: number, isChannel?: boolean) {
	return width > height
		? `calc(100vw - ${isChannel ? 2 : 6}rem - 1rem)`
		: `calc(${width} / ${height} * 100vw)`
}


const Image = styled.div<{ width: number, height: number, src: string, isChannel?: boolean }>`
  aspect-ratio: ${p => p.width / p.height};
	width: ${p => getWidth(p.width, p.height, p.isChannel)};
	max-height: 60vh;
	background-image:url(${p => p.src});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
  box-shadow: 1px 1px 6px rgba(0,0,0,0.07);
`

const ImagesWrap = styled(Stack)`
	padding: 0 0.5rem;
	flex-direction: column;
	gap: 0.5rem
`

function getAttachment({ id, url, width, height }: IImage) {
	const { isChannel } = useCurrentRoom()
	return (
		<Image
			className='image lazy-bg'
			key={id}
			src={url}
			width={width}
			height={height}
			isChannel={isChannel}
		/>
	)
}

function PersonalMessageImages(message: IMessage) {
	const images = getImages(message)
	if (!images?.length) return null

	return (
		<ImagesWrap>
			{images.map(getAttachment)}
		</ImagesWrap>
	)
}

export default PersonalMessageImages

import styled from '@emotion/styled'

import { getImages, IMessage } from '@/model/message'
import { IImage } from '@/model/other'
import { useCurrentRoom } from '@/model/room'


const Image = styled.div<{ width: number, height: number, src: string, isChannel?: boolean }>`
  aspect-ratio: ${p => p.width / p.height};
	width: calc(100vw - ${p => p.isChannel ? 2 : 6 }rem);
	background-image:url(${p => p.src});
	background-size: contain;
  box-shadow: 1px 1px 6px rgba(0,0,0,0.07);
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
		<>
			{images.map(getAttachment)}
		</>
	)
}

export default PersonalMessageImages

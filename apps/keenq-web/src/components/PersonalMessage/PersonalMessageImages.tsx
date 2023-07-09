import styled from '@emotion/styled'

import { getImages, IMessage } from '@/model/message'
import { IImage } from '@/model/other'


const Image = styled.div`
  aspect-ratio: ${p => p.width / p.height};
	width: calc(100vw - 6rem);
	background-image:url(${p => p.src});
	background-size: contain;
  box-shadow: 1px 1px 6px rgba(0,0,0,0.07);
`

function getAttachment({ id, url, width, height }: IImage) {
	return (
		<Image
			className='image'
			key={id}
			src={url}
			width={width}
			height={height}
			loading='lazy'
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

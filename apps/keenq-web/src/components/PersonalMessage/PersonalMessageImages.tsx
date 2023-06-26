import styled from '@emotion/styled'

import { getImages, IMessage } from '@/model/message'
import { IImage } from '@/types/image'


const StyledImage = styled.img`
  max-height: calc((100vw - 6rem) * 2);
  max-width: calc(100vw - 6rem);
	aspect-ratio: attr(width) / attr(height);
	object-fit: contain;
	display: block;
  box-shadow: 1px 1px 6px rgba(0,0,0,0.07);
`

function Image(props: any) {
	return <StyledImage {...props} />
}

function getAttachment({ uid, url, width, height }: IImage) {
	return (
		<Image
			key={uid}
			src={url + '?' + Date.now()}
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

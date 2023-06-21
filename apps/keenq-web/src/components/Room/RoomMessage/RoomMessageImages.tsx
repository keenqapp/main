import styled from '@emotion/styled'

import { IMessage, IMessageImage } from '@/types/messages'


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

function getAttachment({ value }: IMessageImage) {
	return (
		<Image
			key={value.uid}
			src={value.url}
			width={value.width}
			height={value.height}
			loading='lazy'
		/>
	)
}

function RoomMessageImages({ content }: IMessage) {
	const images = content?.filter((c): c is IMessageImage => c.type === 'image')
	if (!images?.length) return null
	return (
		<>
			{images.map(getAttachment)}
		</>
	)
}

export default RoomMessageImages

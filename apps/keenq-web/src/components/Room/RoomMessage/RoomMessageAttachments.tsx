import styled from '@emotion/styled'

import { IMessage } from '@/types/messages'


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

function getAttachment(attachment: IMessage['attachments'][number]) {
	if (attachment.type === 'image') return (
		<Image
			key={attachment.uid}
			src={attachment.url}
			width={attachment.width}
			height={attachment.height}
			loading='lazy'
		/>
	)
}

function RoomMessageAttachments({ attachments, uid }: IMessage) {
	return (
		<>
			{attachments?.map(getAttachment)}
		</>
	)
}

export default RoomMessageAttachments

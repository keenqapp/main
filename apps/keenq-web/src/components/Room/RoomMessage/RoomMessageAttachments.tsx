import styled from '@emotion/styled'

import { IMessage } from '@/components/Room/RoomMessages'


const StyledImage = styled.img`
  width: calc(100vw - 6rem);
	border-radius: 1rem;
`

function Image(props: any) {
	return <StyledImage {...props} />
}

function getAttachment(attachment: IMessage['attachments'][number]) {
	if (attachment.type === 'image') return <Image key={attachment.uid} src={attachment.url} />
}

function RoomMessageAttachments({ attachments, uid }: IMessage) {
	return (
		<>
			{attachments.map(getAttachment)}
		</>
	)
}

export default RoomMessageAttachments

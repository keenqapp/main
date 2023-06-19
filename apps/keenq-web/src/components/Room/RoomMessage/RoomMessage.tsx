import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { differenceInCalendarDays, isBefore, isToday, parseISO, startOfDay } from 'date-fns'

import { useModal } from '@/services/modals'

import Row from '@/ui/Row'
import theme from '@/ui/theme'

import RoomMessageAttachments from '@/components/Room/RoomMessage/RoomMessageAttachments'
import RoomMessageAvatar from '@/components/Room/RoomMessage/RoomMessageAvatar'
import RoomMessageText from '@/components/Room/RoomMessage/RoomMessageText'
import RoomMessageTime from '@/components/Room/RoomMessage/RoomMessageTime'
import { isAuthor } from '@/components/Room/RoomMessage/utils'

import useLongPress from '@/hooks/useLongPress'
import { IMessage } from '@/types/messages'
import { formatDate } from '@/utils/formatters'


const notSelfCss = css`
  align-self: flex-start;
	& .RoomMessageText {
    align-self: flex-start;
    border-radius: 1rem 1rem 1rem 0;
    background: ${theme.color.secondaryVeryLight};
	}
	& .MuiTypography-caption {
		align-self: flex-start;
	}
	& img {
    align-self: flex-start;
    border-radius: 1rem 1rem 1rem 0;
	}
`

const selfCss = css`
  align-self: flex-end;
	& .RoomMessageText {
    align-self: flex-end;
    border-radius: 1rem 1rem 0 1rem;
    background: ${theme.color.primaryVeryLight};
	}
	& .MuiTypography-caption {
		align-self: flex-end;
	}
  & img {
    align-self: flex-end;
    border-radius: 1rem 1rem 0 1rem;
  }
`

const MessageContainer = styled.div<{ isSelf: boolean }>`
	padding: 0 1rem;
  max-width: calc(100vw - 4rem);
  & .MuiTypography-caption {
		padding: 0 0.5rem;
	}
	${p => p.isSelf ? selfCss : notSelfCss}
`

const SeparateDate = styled.div`
	align-self: center;
`


// TODO TTD for this
function DateSeparator({ date, prevDate }: IMessage) {
	const current = parseISO(date)
	if (!prevDate && isToday(current)) return null
	if (!prevDate) return <SeparateDate>{formatDate(date, { to: 'dd MMM' })}</SeparateDate>

	const prev = parseISO(prevDate)
	if (differenceInCalendarDays(current, prev) < 1) return null
	if (!isToday(current)) return <SeparateDate>{formatDate(date, { to: 'dd MMM' })}</SeparateDate>
	if (isBefore(prev, startOfDay(new Date()))) return <SeparateDate>Today</SeparateDate>

	return null
}

function RoomMessage(message: IMessage) {
	const { authorUid } = message
	const { onOpen } = useModal('message')
	const isSelf = isAuthor(authorUid)
	const onLongPress = useLongPress(() => onOpen(message))

	return (
		<>
			<DateSeparator {...message} />
			<MessageContainer data-testid='RoomMessage' isSelf={isSelf} {...onLongPress}>
				<Row gap={0.5} align='end'>
					<RoomMessageAvatar {...message} />
					<Row direction='column' gap={0.2}>
						<RoomMessageAttachments {...message} />
						<RoomMessageText {...message} />
						<RoomMessageTime {...message} />
					</Row>
				</Row>
			</MessageContainer>
		</>
	)
}

export default RoomMessage

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { differenceInCalendarDays, differenceInMinutes, isBefore, isSameDay, isToday, parseISO, startOfDay } from 'date-fns'

import Typography from '@mui/material/Typography'

import theme from '@/ui/theme'

import RoomMessageAttachments from '@/components/Room/RoomMessage/RoomMessageAttachments'
import RoomMessageText from '@/components/Room/RoomMessage/RoomMessageText'
import { IMessage } from '@/components/Room/RoomMessages'

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
`

const selfCss = css`
  align-self: flex-end;
	& .RoomMessageText {
    align-self: flex-end;
    border-radius: 1rem 1rem 0 1em;
    background: ${theme.color.primaryVeryLight};
	}
	
	& .MuiTypography-caption {
		align-self: flex-end;
	}
`

const MessageContainer = styled.div<{ isSelf: boolean }>`
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.1rem;
  max-width: calc(100vw - 4rem);
  & .MuiTypography-caption {
		padding: 0 0.5rem;
	}
	${p => p.isSelf ? selfCss : notSelfCss}
`

const StyledDatetime = styled(Typography)`
	margin-top: 0.5rem;
`

const SeparateDate = styled.div`
	align-self: center;
`

function checkCollapse({ date, nextDate, authorUid, nextAuthorUid }: IMessage) {
	if (authorUid !== nextAuthorUid) return true
	if (!nextDate) return true
	const current = parseISO(date)
	const next = parseISO(nextDate)
	if (!isSameDay(current, next)) return true
	return differenceInMinutes(next, current) >= 1
}

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

function Datetime({ date, shouldCollapse }: IMessage & { shouldCollapse: boolean }) {
	if (!shouldCollapse) return null
	return <StyledDatetime variant='caption'>{formatDate(parseISO(date), { to: 'HH:mm' })}</StyledDatetime>
}

function RoomMessage(message: IMessage) {
	const { uid, text,  date, authorUid, attachments } = message
	const isSelf = authorUid === 'me'
	const shouldCollapse = checkCollapse(message)
	return (
		<>
			<DateSeparator {...message} />
			<MessageContainer data-testid='RoomMessage' isSelf={isSelf}>
				<RoomMessageAttachments {...message} />
				<RoomMessageText {...message} />
				{/* TODO Move it to separate component */}
				<Datetime shouldCollapse={shouldCollapse} {...message} />
			</MessageContainer>
		</>
	)
}

export default RoomMessage

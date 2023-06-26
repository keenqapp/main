import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { differenceInCalendarDays, isBefore, isToday, parseISO, startOfDay } from 'date-fns'

import { useModal } from '@/services/modals'

import Row from '@/ui/Row'
import theme from '@/ui/theme'

import PersonalMessageAvatar from '@/components/PersonalMessage/PersonalMessageAvatar'
import PersonalMessageImages from '@/components/PersonalMessage/PersonalMessageImages'
import PersonalMessageReactions from '@/components/PersonalMessage/PersonalMessageReactions'
import PersonalMessageReply from '@/components/PersonalMessage/PersonalMessageReply'
import PersonalMessageText from '@/components/PersonalMessage/PersonalMessageText'
import PersonalMessageTime from '@/components/PersonalMessage/PersonalMessageTime'

import { isAuthor } from '@/model/member'
import { IMessage } from '@/model/message'
import { formatDate } from '@/utils/formatters'


const notSelfCss = css`
  align-self: flex-start;
	& .PersonalMessageText {
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
	& .reaction-container {
		right: 0.2rem;
	}
`

const selfCss = css`
  align-self: flex-end;
	& .PersonalMessageText {
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
  & .reaction-container {
    left: 0.3rem;
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

function PersonalMessage(message: IMessage) {
	const { authorUid, content } = message
	const { onOpen } = useModal('message')
	const isSelf = isAuthor(authorUid)
	if (!content?.length) return null

	const onMessageClick = () => onOpen(message)

	return (
		<>
			<DateSeparator {...message} />
			<MessageContainer data-testid='PersonalMessage' isSelf={isSelf} onClick={onMessageClick}>
				<Row gap={0.5} align='end'>
					<PersonalMessageAvatar {...message} />
					<Row direction='column' gap={0.2} relative>
						<PersonalMessageReply {...message} />
						<PersonalMessageImages {...message} />
						<PersonalMessageText {...message} />
						<PersonalMessageReactions {...message} />
						<PersonalMessageTime {...message} />
					</Row>
				</Row>
			</MessageContainer>
		</>
	)
}

export default PersonalMessage

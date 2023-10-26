import { useState } from 'preact/hooks'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { differenceInCalendarDays, isBefore, isToday, parseISO, startOfDay } from 'date-fns'
import { SwipeEventData, useSwipeable } from 'react-swipeable'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { useIsAuthor } from '@/model/member'
import { IMessage } from '@/model/message'
import { useCurrentRoom } from '@/model/room'

import Stack from '@/ui/Stack'
import theme from '@/ui/theme'

import PersonalMessageAvatar from '@/components/PersonalMessage/PersonalMessageAvatar'
import PersonalMessageImages from '@/components/PersonalMessage/PersonalMessageImages'
import PersonalMessageReactions from '@/components/PersonalMessage/PersonalMessageReactions'
import PersonalMessageReply from '@/components/PersonalMessage/PersonalMessageReply'
import PersonalMessageText from '@/components/PersonalMessage/PersonalMessageText'
import PersonalMessageTime from '@/components/PersonalMessage/PersonalMessageTime'
import { $messageReplyOrEditId } from '@/components/Room/RoomInput/state'

import { formatDate } from '@/utils/formatters'
import { useSwipe } from '@/hooks/useSwipe'


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
  & .image {
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
  & .image {
    align-self: flex-end;
    border-radius: 1rem 1rem 0 1rem;
  }
  & .reaction-container {
    left: 0.3rem;
  }
`

const MessageContainer = styled.div<{ isAuthor: boolean, isChannel: boolean, left: number }>`
	padding: 0 1rem 0rem;
  max-width: calc(100vw - ${p => p.isChannel ? 0 : 4}rem);
  & .MuiTypography-caption {
		padding: 0 0.5rem;
	}
	transform: translateX(${p => p.left}px);
	will-change: transform;
	${p => p.isAuthor ? selfCss : notSelfCss}
`

const SeparateDate = styled.div`
	align-self: center;
	padding-bottom: 1rem;
`

function DateSeparator({ date, prevDate }: IMessage) {
	const { t } = useTranslate('messages')
	const current = parseISO(date)
	if (!prevDate && isToday(current)) return null
	if (!prevDate) return <SeparateDate>{formatDate(date, { to: 'dd MMM' })}</SeparateDate>

	const prev = parseISO(prevDate)
	if (differenceInCalendarDays(current, prev) < 1) return null
	if (!isToday(current)) return <SeparateDate>{formatDate(date, { to: 'dd MMM' })}</SeparateDate>
	if (isBefore(prev, startOfDay(new Date()))) return <SeparateDate>{t`today`}</SeparateDate>

	return null
}

function PersonalMessage(message: IMessage) {
	const [ left, setLeft ] = useState(0)
	const { authorId, content } = message
	const { open } = useModal('message')
	const isAuthor = useIsAuthor(authorId)
	const { isChannel } = useCurrentRoom()

	// const swipes = useSwipeable({
	// 	onSwiping: (e: SwipeEventData) => {
	// 		if (e.dir !== 'Left') return
	// 		setLeft(e.deltaX)
	// 		if (e.deltaX < -75) {
	// 			setLeft(0)
	// 			$messageReplyOrEditId.set({ mode: 'reply', id: message.id })
	// 		}
	// 	},
	// 	onSwipedLeft: () => {
	// 		setLeft(0)
	// 	}
	// })

	const swipes = useSwipe({
		onLeft: (e) => {
			if (e.deltaX < -75) $messageReplyOrEditId.set({ mode: 'reply', id: message.id })
		}
	})

	if (!content?.length) return null

	const onMessageClick = () => open(message)

	return (
		<>
			<DateSeparator {...message} />
			<MessageContainer
				id={message.id}
				data-testid='PersonalMessage'
				isAuthor={isAuthor}
				isChannel={isChannel}
				onClick={onMessageClick}
				left={left}
				{...swipes}
			>
				<Stack gap={0.5} align='end'>
					<PersonalMessageAvatar {...message} />
					<Stack direction='column' gap={0.2} relative>
						<PersonalMessageReply {...message} />
						<PersonalMessageImages {...message} />
						<PersonalMessageText {...message} />
						<PersonalMessageReactions {...message} />
						<PersonalMessageTime {...message} />
					</Stack>
				</Stack>
			</MessageContainer>
		</>
	)
}

export default PersonalMessage

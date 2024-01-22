import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { differenceInCalendarDays, isBefore, isToday, parseISO, startOfDay } from 'date-fns'
import { motion } from 'framer-motion'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { useIsAuthor } from '@/model/member'
import { IMessage } from '@/model/message'
import { useCurrentRoom } from '@/model/room'

import Stack from '@/ui/Stack'
import theme from '@/ui/theme'

import PersonalMessageAvatar from '@/components/PersonalMessage/PersonalMessageAvatar'
import PersonalMessageImages from '@/components/PersonalMessage/PersonalMessageImages'
import PersonalMessageName from '@/components/PersonalMessage/PersonalMessageName'
import PersonalMessageReactions from '@/components/PersonalMessage/PersonalMessageReactions'
import PersonalMessageReply from '@/components/PersonalMessage/PersonalMessageReply'
import PersonalMessageText from '@/components/PersonalMessage/PersonalMessageText'
import PersonalMessageTime from '@/components/PersonalMessage/PersonalMessageTime'
import { $messageReplyOrEditId } from '@/components/Room/RoomInput/state'

import { formatDate } from '@/utils/formatters'


const notSelfCss = css`
  align-self: flex-start;
  // REFACTOR: put this to 'Wrap' component
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
		left: 0.3rem;
		transform-origin: left;
	}
`

const selfCss = css`
  align-self: flex-end;
	// REFACTOR: put this to 'Wrap' component
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
    right: 0.3rem;
	  transform-origin: right;
  }
`

const MessageContainer = styled(motion.div)<{ isAuthor: boolean, isChannel: boolean }>`
	padding: 0 1rem 0;
	margin-bottom: 0.2rem;
  max-width: calc(100vw - ${p => p.isChannel ? 0 : 4}rem);
  & .MuiTypography-caption {
		padding: 0 0.5rem;
	}
	${p => p.isAuthor ? selfCss : notSelfCss};
`

const SeparateDate = styled.div`
	align-self: center;
	padding-bottom: 1rem;
`

const Wrap = styled(Stack)<{ hasReactions: boolean }>`
	padding: 0.5rem 0 ${p => p.hasReactions ? 1 : 0.5}rem;
	position: relative;
	flex-direction: column;
	gap: 0.5rem;
	align-items: flex-start;
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
	const { authorId, content, reactions } = message
	const { open } = useModal('message')
	const isAuthor = useIsAuthor(authorId)
	const { isChannel, isAdmin } = useCurrentRoom()

	if (!content?.length) return null

	const onMessageClick = () => open(message)

	const end = (_: any, i: any) => {
		if (i.offset.x < -30) $messageReplyOrEditId.set({ mode: 'reply', id: message.id })
	}

	const drag = () => {
		if (!isChannel || (isChannel && isAdmin)) return { drag: 'x' } as const
		return {}
	}

	return (
		<>
			<DateSeparator {...message} />
			<MessageContainer
				id={message.id}
				data-testid='PersonalMessage'
				isAuthor={isAuthor}
				isChannel={isChannel}
				onClick={onMessageClick}
				dragSnapToOrigin
				onDragEnd={end}
				{...drag()}
			>
				<Stack gap={0.5} align='end'>
					<PersonalMessageAvatar {...message} />
					<Stack direction='column' gap={0.2} relative>
						<PersonalMessageReply {...message} />
						<Wrap className='PersonalMessageText' hasReactions={reactions.length > 0}>
							<PersonalMessageName {...message} />
							<PersonalMessageImages {...message} />
							<PersonalMessageText {...message} />
							<PersonalMessageReactions {...message} />
						</Wrap>
						<PersonalMessageTime {...message} />
					</Stack>
				</Stack>
			</MessageContainer>
		</>
	)
}

export default PersonalMessage

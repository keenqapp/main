import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import { IMessage, IMessageReactionCount, shouldShowCheck } from '@/model/message'

import Stack from '@/ui/Stack'

import { usePipe } from '@/hooks/usePipe'
import { first, sort, toComponent } from '@/utils/utils'


const PersonalMessageReactionsContainer = styled(Stack)`
	position: absolute;
	bottom: ${p => p.shouldShow ? '0.75rem' : '-0.75rem'};
	transform: scale(0.8);
	transform-origin: center;
`

const Reaction = styled(Stack)`
  background: rgba(220, 244, 227, 0.85);
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
`

function max(left: IMessageReactionCount, right: IMessageReactionCount) {
	return right.count - left.count
}

function count(input: any[]) {
	const counts = input.reduce((obj, curr) => {
		if (obj[curr.id]) obj[curr.id] = { id: curr.id, emoji: curr.emoji, count: curr.count + 1 }
		else obj[curr.id] = { id: curr.id, emoji: curr.emoji, count: 1 }
		return obj
	}, {})
	return Object.values(counts)
}

function PersonalMessageReaction({ emoji, count }: IMessageReactionCount) {
	return (
		<Reaction gap={0.3}>
			<span>{emoji}</span>
			{count > 1 && <Typography variant='overline'>{count > 99 ? '99+' : count}</Typography>}
		</Reaction>
	)
}

function PersonalMessageReactions(message: IMessage) {
	const { reactions } = message
	const result = usePipe(reactions, count, sort(max), first(3), toComponent(PersonalMessageReaction))
	const shouldShow = shouldShowCheck(message)
	return (
		<PersonalMessageReactionsContainer shouldShow={shouldShow} data-testid='PersonalMessageReactions' className='reaction-container' gap={0.2}>
			{result}
		</PersonalMessageReactionsContainer>
	)
}

export default PersonalMessageReactions

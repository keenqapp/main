import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import Row from '@/ui/Row'

import { usePipe } from '@/hooks/usePipe'
import { IMessage, IMessageReactionCount } from '@/model/message'
import { first, sort, toComponent } from '@/utils/utils'


const PersonalMessageReactionsContainer = styled(Row)`
	position: absolute;
	bottom: 0.5rem;
	transform: scale(0.8);
	transform-origin: center;
`

const Reaction = styled(Row)`
  background: rgba(220, 244, 227, 0.85);
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
`

function max(left: IMessageReactionCount, right: IMessageReactionCount) {
	return right.count - left.count
}

function PersonalMessageReaction({ emoji, count }: IMessageReactionCount) {
	return (
		<Reaction gap={0.3}>
			<span>{emoji}</span>
			{count > 1 && <Typography variant='overline'>{count > 99 ? '99+' : count}</Typography>}
		</Reaction>
	)
}

function PersonalMessageReactions({ reactionsCount }: IMessage) {
	if (!reactionsCount?.length) return null
	const reactions = usePipe(reactionsCount, sort(max), first(3), toComponent(PersonalMessageReaction))
	return (
		<PersonalMessageReactionsContainer data-testid='PersonalMessageReactions' className='reaction-container' gap={0.2}>
			{reactions}
		</PersonalMessageReactionsContainer>
	)
}

export default PersonalMessageReactions

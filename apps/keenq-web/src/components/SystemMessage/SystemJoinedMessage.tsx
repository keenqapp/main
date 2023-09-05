import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import { useTranslate } from '@/services/translate'

import { membergql } from '@/model/member'

import Space from '@/ui/Space'
import theme from '@/ui/theme'

import { useQuery } from '@/hooks/gql'


const SystemTextMessageContainer = styled.div`
	text-align: center;
	background:${theme.color.primaryVeryLight};
	align-self: center;
	border-radius: 1rem;
	padding: 0.2rem 1rem;
`

function SystemTextMessage({ joined }: { joined: string }) {
	const { t } = useTranslate('systemMessage')
	const [ result ] = useQuery(membergql, { id: joined })
	const member = result.data?.members_by_pk
	if (!member) return null
	const { name, gender } = member
	return (
		<>
			<SystemTextMessageContainer data-testid='SystemTextMessage'>
				<Typography variant='overline'>{t(gender === 'female' ? 'joined_f' : 'joined_m', { name })}</Typography>
			</SystemTextMessageContainer>
			<Space height={0.2}  />
		</>
	)
}

export default SystemTextMessage

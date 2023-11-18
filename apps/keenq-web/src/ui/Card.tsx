// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ComponentChildren } from 'preact'

import styled from '@emotion/styled'

import MUICard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import Stack from '@/ui/Stack'
import theme from '@/ui/theme'


const colors = {
	primary: theme.color.primary,
	'primary.light': theme.color.primaryLight,
	'primary.veryLight': theme.color.primaryVeryLight,
	secondary: theme.color.secondary,
	'secondary.light': theme.color.secondaryLight,
	'secondary.veryLight': theme.color.secondaryVeryLight,
} as const

const StyledCard = styled(MUICard)<{ color?: keyof typeof colors }>`
	background: ${p => colors[p.color as any] || theme.color.primaryVeryLight};
`

interface CardProps {
	color?: keyof typeof colors
	align?: string
	self?: string
	children: ComponentChildren
}

function Card({ children, color, align, ...props }: CardProps) {
	return (
		<StyledCard data-testid='Card' color={color} {...props}>
			<CardContent>
				<Stack direction='column' align={align}>
					{children}
				</Stack>
			</CardContent>
		</StyledCard>
	)
}

export default Card

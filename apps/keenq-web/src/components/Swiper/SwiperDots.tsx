import { css } from '@emotion/react'
import styled from '@emotion/styled'

import Row from '@/ui/Row'


const SwiperDotsContainer = styled(Row)`
	position: absolute;
	bottom: 0;
	top: 0;
	right: 0.5rem;
	gap: 1rem
`

const active = css`
	background: rgba(255, 255, 255, 0.9);
  width: 1rem;
  height: 1rem;
	filter: blur(1px);
`

const not = css`
  background: rgba(255, 255, 255, 0.5);
  width: 0.5rem;
  height: 0.5rem;
`

const Dot = styled.div<{ active: boolean }>`
	border-radius: 1rem;
	transition: all 200ms ease-in-out;
	${p => p.active ? active : not}
`

interface SwiperDotsProps {
	length: number
	current: number
}

function SwiperDots({ length, current }: SwiperDotsProps) {
	return (
		<SwiperDotsContainer data-testid='SwiperDots' direction='column' justify='center'>
			{Array.create(length).map(index => <Dot key={index} active={current === index} />)}
		</SwiperDotsContainer>
	)
}

export default SwiperDots

import { css } from '@emotion/react'
import styled from '@emotion/styled'

import Stack from '@/ui/Stack'


const SwiperDotsContainer = styled(Stack)`
	position: absolute;
	bottom: 0;
	top: 0;
	right: 0.5rem;
`

const Background = styled(Stack)`
  gap: 1rem;
	position: relative;
	padding: 0.4rem 0.1rem;
	border-radius: 8px;
	overflow: hidden;
`

const Blur = styled.div`
	position: absolute;
	top: -1px;
	left: -1px;
	right: -1px;
	bottom: -1px;
	filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
	z-index: 1;
`

const active = css`
	background: rgba(255, 255, 255, 0.9);
  width: 1rem;
  height: 1rem;
	filter: blur(1px);
`

const not = css`
  background: rgba(255, 255, 255, 0.7);
  width: 0.5rem;
  height: 0.5rem;
`

const Dot = styled.div<{ active: boolean }>`
	border-radius: 1rem;
	transition: all 200ms ease-in-out;
  position: relative;
	z-index: 2;
	${p => p.active ? active : not}
`

interface SwiperDotsProps {
	length: number
	current: number
}

function SwiperDots({ length, current }: SwiperDotsProps) {
	return (
		<SwiperDotsContainer data-testid='SwiperDots' direction='column' justify='center'>
			<Background direction='column'>
				<Blur />
				{Array.create(length).map(index => <Dot key={index} active={current === index} />)}
			</Background>
		</SwiperDotsContainer>
	)
}

export default SwiperDots

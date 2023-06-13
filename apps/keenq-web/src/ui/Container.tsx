import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'


const flex = css`
	display: flex;
	flex-direction: column;
	flex: 1 0 auto;
`

const StyledContainer = styled.div<{ horizontal?: number, vertical?: number, flex?: number }>`
  padding-left: ${p => p.horizontal ?? 1}rem;
  padding-right: ${p => p.horizontal ?? 1}rem;
  ${p => p.flex && flex};
`

interface ContainerProps {
  children: ReactNode,
  'data-testid': string,
	flex?: number,
	vertical?: number
	horizontal?: number
}

function Container(props: ContainerProps) {
	return (
		<StyledContainer {...props} />
	)
}

export default Container

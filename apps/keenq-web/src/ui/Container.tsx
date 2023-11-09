import { forwardRef, ReactNode } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'


const flex = css`
	display: flex;
	flex-direction: column;
	flex: 1 0 auto;
`

const StyledContainer = styled.div<{ horizontal?: number, vertical?: number, flex?: number }>`
  padding-left: ${p => p.horizontal ?? 1}rem;
  padding-right: ${p => p.horizontal ?? 1}rem;
  ${p => p.flex && flex};
	position: relative;
`

interface ContainerProps {
  children: ReactNode,
  'data-testid'?: string,
	flex?: number | boolean
	vertical?: number
	horizontal?: number
}

function Container(props: ContainerProps, ref) {
	return (
		<StyledContainer ref={ref} {...props} />
	)
}

export default forwardRef(Container)

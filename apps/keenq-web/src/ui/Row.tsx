import styled from '@emotion/styled'
import { ReactNode } from 'react'


interface RowProps {
	flex?: number
	justify?: 'start' | 'end' | 'stretch' | 'between' | 'center'
	align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
	grow?: boolean
	gap?: number
	padding?: number
	wrap?: number | boolean
	fullHeight?: boolean
	direction?: 'row' | 'column'
	children: ReactNode
	self?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
}

type Justify = 'start' | 'end' | 'stretch' | 'between' | 'center'
type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

const j = {
	start: 'flex-start',
	end: 'flex-end',
	stretch: 'stretch',
	between: 'space-between',
	center: 'center'
}

const ai = {
	start: 'flex-start',
	end: 'flex-end',
	stretch: 'stretch',
	baseline: 'baseline',
	center: 'center'
}

function f(justify: Justify) {
	return j[justify]
}

function a(align: Align) {
	return ai[align]
}

const StyledRow = styled.div<RowProps>`
  display: flex;
  flex-direction: ${p => p.direction || 'row'};
  align-items: ${p => p.align ? a(p.align) : 'center'};
  justify-content: ${p => p.justify ? f(p.justify) : 'space-between'};
  flex-wrap: ${p => p.wrap ? 'wrap' : 'nowrap'};
  ${p => p.gap && `gap: ${p.gap}rem`};
  ${p => p.grow && 'width: 100%'};
  ${p => p.padding && `padding: ${p.padding}rem`};
  ${p => p.fullHeight && 'min-height: 100%'};
  ${p => p.flex && `flex: ${p.flex} 0 auto`};
  ${p => p.self && `align-self: ${a(p.self)}`};
`

function Row({ wrap, ...props }: RowProps) {
	return <StyledRow wrap={wrap ? 1 : 0} {...props} />
}
export default Row

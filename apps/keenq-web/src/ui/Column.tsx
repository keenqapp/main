import { ComponentChildren } from 'preact'
import styled from '@emotion/styled'


interface RowProps {
	flex?: number
	justify?: 'start' | 'end' | 'stretch' | 'between' | 'center' | 'around'
	align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
	grow?: boolean
	gap?: number
	padding?: number
	wrap?: number | boolean
	fullHeight?: boolean
	direction?: 'row' | 'column'
	children: ComponentChildren
	self?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
	relative?: boolean
	[key: string]: any
}

type Justify = 'start' | 'end' | 'stretch' | 'between' | 'center' | 'around'
type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

const j = {
	start: 'flex-start',
	end: 'flex-end',
	stretch: 'stretch',
	between: 'space-between',
	around: 'space-around',
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

const StyledColumn = styled.div<RowProps>`
  display: flex;
  flex-direction: ${p => p.direction || 'column'};
  align-items: ${p => p.align ? a(p.align) : 'stretch'};
  justify-content: ${p => p.justify ? f(p.justify) : 'flex-start'};
  flex-wrap: ${p => p.wrap ? 'wrap' : 'nowrap'};
  ${p => p.gap && `gap: ${p.gap}rem`};
  ${p => p.grow && 'width: 100%'};
  ${p => p.padding && `padding: ${p.padding}rem`};
  ${p => p.fullHeight && 'min-height: 100%'};
  ${p => p.flex && `flex: ${p.flex} 0 auto`};
  ${p => p.self && `align-self: ${a(p.self)}`};
	${p => p.relative && 'position: relative'};
`

function Column({ wrap, ...props }: RowProps) {
	return <StyledColumn wrap={wrap ? 1 : 0} {...props} />
}
export default Column

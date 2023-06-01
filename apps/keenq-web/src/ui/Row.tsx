import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

interface Props {
  flex?: number
  justify?: Justify
  align?: Align
  grow?: boolean
  gap?: number
  padding?: number
  wrap?: number | boolean
  fullHeight?: boolean
  children: ReactNode
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

const StyledRow = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: ${p => p.align ? a(p.align) : 'center'};
  justify-content: ${p => p.justify ? f(p.justify) : 'space-between'};
  flex-wrap: ${p => p.wrap ? 'wrap' : 'nowrap'};
  ${p => p.gap && `column-gap: ${p.gap}rem`};
  ${p => p.grow && 'width: 100%'};
  ${p => p.padding && `padding: ${p.padding}rem`};
  ${p => p.fullHeight && 'min-height: 100%'};
`

const Row: FC<Props> = ({ flex, wrap, ...props }) => <StyledRow wrap={wrap?1:0} {...props} />
export default Row

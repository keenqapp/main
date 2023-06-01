import { FC } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/css'

interface Props {
  width?: number
  height?: number
  grow?: boolean
  divider?: 'vertical' | 'horizontal'
}

const dividerVertical = css`
  border-right: 1px solid #EEEDF1;
  margin-right: 1rem;
`

const dividerHorizontal = css`
  border-bottom: 1px solid #EEEDF1;
  margin-bottom: 1rem;
  width: 100%;
`

const StyledSpace = styled.div<Props>`
  height: ${p => p.height}rem;
  width: ${p => p.width}rem;
  flex: ${p => (p.grow ? 1 : 0)} 0 auto;
  ${p => p.divider === 'vertical' ? dividerVertical : '' };
  ${p => p.divider === 'horizontal' ? dividerHorizontal : '' };
`

const Space: FC<Props> = ({ width= 1, height = 1, grow = false, divider, ...props }) => <StyledSpace width={width} height={height} grow={grow} divider={divider} {...props} />

export default Space

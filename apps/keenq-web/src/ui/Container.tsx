import styled from '@emotion/styled'

const StyledContainer = styled.div<{ padding: number }>`
  padding-left: ${({ theme, padding }) => theme.spacing(padding)};
  padding-right: ${({ theme, padding }) => theme.spacing(padding)};
`

interface Props {
  children: React.ReactNode,
  'data-testid': string,
  padding?: number,
}

function Container({ children, 'data-testid': testId, padding = 1 }: Props) {
  return (
    <StyledContainer data-testid={testId} padding={padding}>
      {children}
    </StyledContainer>
  )
}

export default Container

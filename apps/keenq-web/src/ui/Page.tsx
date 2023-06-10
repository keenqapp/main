import { FC, ReactNode, Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import Loading from '@/core/Loading'


const fadeInLeft = keyframes`
  0% {
    opacity: 0.01;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

const StyledPage = styled.div`
  min-height: calc(100vh - var(--appbar-height) * 2);
  animation: ${fadeInLeft} 300ms ease-in-out 1;
  padding-bottom: var(--appbar-height);
`

const LoadingPage = styled(StyledPage)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

interface Props {
  'data-testid'?: string
  isLoading?: boolean
  children?: ReactNode
}

const Page: FC<Props> = ({ isLoading = false, ...props }) => {
  const loader = useLoaderData()
  return (
    <Suspense fallback={<LoadingPage><Loading /></LoadingPage>}>
      <Await resolve={loader?.data}>
        <StyledPage {...props} />
      </Await>
    </Suspense>
  )
}

export default Page

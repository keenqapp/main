import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode, Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'

import Loading from '@/core/Loading'


const fadeInLeft = keyframes`
  0% {
    opacity: 0.01;
		left: 30px;
		
  }
  100% {
    opacity: 1;
    left: 0;
  }
`

const StyledPage = styled.div`
	position: absolute;
  min-height: calc(100vh - var(--vertical-space) * 2);
  animation: ${fadeInLeft} 200ms ease-in-out 1;
  padding-bottom: var(--vertical-space);
	width: 100vw;
	display: flex;
`

const LoadingPage = styled(StyledPage)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

interface Props {
  'data-testid'?: string
	children: ReactNode
  // isLoading?: boolean
}

// function Page({ isLoading = false, ...props }: Props) {
function Page(props: Props) {
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

import { ComponentChildren } from 'preact'
import styled from '@emotion/styled'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'

import { getKeyframes } from '@/ui/Page/animations'

import Loading from '@/core/Loading'


const StyledPage = styled.div<{ animation: PageProps['animation'], duration: PageProps['duration'] }>`
  min-height: calc(100vh - var(--vertical-space) * 2);
  animation: ${p => getKeyframes(p.animation)} ${p => p.duration}ms ease-in-out 1;
  padding-bottom: var(--vertical-space);
	width: 100vw;
	display: flex;
	flex-direction: column;
	position: relative;
`

const LoadingPage = styled(StyledPage)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

interface PageProps {
  'data-testid'?: string
	children: ComponentChildren
	animation?: 'fadeInLeft' | 'fadeIn'
	duration?: number
  // isLoading?: boolean
}

// function Page({ isLoading = false, ...props }: Props) {
function Page({ animation = 'fadeInLeft', duration = 200, ...props }: PageProps) {
	const loader = useLoaderData()
	return (
		<Suspense fallback={<LoadingPage><Loading /></LoadingPage>}>
			<Await resolve={loader?.data}>
				<StyledPage animation={animation} duration={duration} {...props} />
			</Await>
		</Suspense>
	)
}

export default Page

import { ReactNode, Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import styled from '@emotion/styled'

import { getKeyframes } from '@/ui/Page/animations'

import Loading from '@/core/Loading'
import { isPWA } from '@/utils/utils'


const StyledPage = styled.div<{ animation?: PageProps['animation'], duration?: PageProps['duration'] }>`
  min-height: calc(100 * var(--vh) - var(--appbar-height) - var(--vertical-space) ${isPWA() ? '- var(--safe-area)' : ''});
  animation: ${p => getKeyframes(p.animation)} ${p => p.duration}ms ease-in-out 1;
	width: 100vw;
	display: flex;
	flex-direction: column;
	position: relative;
	will-change: transform;
`

const LoadingPage = styled(StyledPage)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

interface PageProps {
  'data-testid'?: string
	children: ReactNode
	animation?: 'fadeInLeft' | 'fadeIn'
	duration?: number
}

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

import { useMemo } from 'preact/hooks'
import styled from '@emotion/styled'
import { useStore } from '@nanostores/preact'
import { Navigate, Outlet, useRouteError } from 'react-router-dom'

import { $isAuthed } from '@/services/auth'
import { useTranslate } from '@/services/translate'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Loadable from '@/ui/Loadable'
import Space from '@/ui/Space'
import Stack from '@/ui/Stack'
import Text from '@/ui/Text'

import Appbar from '@/core/Appbar'
import BottomTabs from '@/core/BottomTabs'
import { usePreload } from '@/hooks/usePreload'
import Modals from '@/modals/Modals'


const Main = styled.main`
  padding-bottom: var(--vertical-space);
  position: relative;
  overflow: hidden;
`

const Wrap = styled.div<{ isIOS: boolean, isPWA: boolean }>`
	${p => p.isIOS && `
		position: fixed;
		bottom: 20px;
		left: 0;
		right: 0;
		height: calc(100 * var(--vh));
	`}
  ${p => p.isPWA && p.isIOS && 'padding-bottom: 20px;'}
`

function iOS() {
	return [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
	].includes(navigator.platform)
		|| (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
}

function isPWA() {
	return window.matchMedia('(display-mode: standalone)').matches
}

function Page404() {
	const { t } = useTranslate()
	return (
		<Container flex>
			<Space height={2}  />
			<Card>
				<Stack gap={1} justify='stretch' direction='column'>
					<Text variant='h5'>{404}</Text>
					<Text variant='overline'>{t`app.404`}</Text>
				</Stack>
			</Card>
		</Container>
	)
}

function Layout() {
	const isAuthed = useStore($isAuthed)
	const error = useRouteError()

	if (!isAuthed) return <Navigate to='/auth/login' />

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const is404 = useMemo(() => error?.status === 404, [error])

	const loading = usePreload()

	return (
		<Wrap data-testid='Layout' isIOS={iOS()} isPWA={isPWA()}>
			<Loadable loading={loading && !is404} fullHeight>
				<Appbar />
				<Main>
					{is404
						? <Page404 />
						: <Outlet />}
				</Main>
				<BottomTabs />
				<Modals />
			</Loadable>
		</Wrap>
	)
}

export default Layout

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
import { isIOS, isPWA } from '@/utils/utils'


const Main = styled.main`
  padding-bottom: var(--vertical-space);
  position: var(--main-position);
	bottom: 0;
`

const Wrap = styled.div<{ isIOS: boolean, isPWA: boolean }>`

`

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
	const is404 = useMemo(() => error?.status === 404, [error])
	const loading = usePreload()

	return (
		<Wrap data-testid='Layout' isIOS={isIOS()} isPWA={isPWA()}>
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

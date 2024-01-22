import { useMemo } from 'react'
import { Navigate, Outlet, useRouteError } from 'react-router-dom'
import styled from '@emotion/styled'
import { useStore } from '@nanostores/react'

import { $isAuthed } from '@/services/auth'
import { useTranslate } from '@/services/translate'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import IfElse from '@/ui/IfElse'
import Loadable from '@/ui/Loadable'
import Space from '@/ui/Space'
import Stack from '@/ui/Stack'
import Text from '@/ui/Text'

import Appbar from '@/core/Appbar'
import BottomTabs from '@/core/BottomTabs'
import { usePreload } from '@/hooks/usePreload'
import useShouldJoin from '@/hooks/useShouldJoin'
import Modals from '@/modals/Modals'


const Main = styled.main`
  position: var(--main-position);
	padding-bottom: var(--tabs);
	bottom: 0;
	overflow-y: hidden;
	overflow-x: hidden;
`

const Wrap = styled.div`
	
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
	const error: any = useRouteError()
	const joining = useShouldJoin()
	const is404 = useMemo(() => error?.status === 404, [error])
	const loading = usePreload()

	if (!isAuthed) return <Navigate to='/auth/login' />
	
	return (
		<Wrap data-testid='Layout'>
			<Loadable loading={(loading || joining) && !is404} fullHeight>
				<Appbar />
				<Main>
					<IfElse cond={is404}>
						<Page404 />
						<Outlet />
					</IfElse>
				</Main>
				<BottomTabs />
				<Modals />
			</Loadable>
		</Wrap>
	)
}

export default Layout

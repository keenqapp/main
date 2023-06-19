import styled from '@emotion/styled'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { isAuthed, isReady } from '@/services/auth'

import Loadable from '@/ui/Loadable'

import Appbar from '@/core/Appbar'
import BottomTabs from '@/core/BottomTabs'
import Modals from '@/modals/Modals'


const Main = styled.main`
  padding-top: var(--appbar-height);
	position: relative;
	overflow-x: hidden;
  min-height: calc(100vh - var(--appbar-height));
`

function Layout() {
	const { pathname } = useLocation()
	if (!isAuthed.value) return <Navigate to='/auth/login' />
	if (pathname === '/') return <Navigate to='/match' />
	return (
		<div data-testid='Layout'>
			<Loadable loading={!isReady.value}>
				<Appbar />
				<Main>
					{/* TODO Fix ignore */}
					{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
					{/* @ts-ignore */}
					<Outlet />
				</Main>
				<BottomTabs />
				<Modals />
			</Loadable>
		</div>
	)
}

export default Layout

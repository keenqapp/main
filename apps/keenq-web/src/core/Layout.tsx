import styled from '@emotion/styled'
import { Navigate, Outlet } from 'react-router-dom'

import { $isAuthed, isReady } from '@/services/auth'

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
	if (!$isAuthed.get()) return <Navigate to='/auth/login' />
	return (
		<div data-testid='Layout'>
			<Loadable loading={false}>
				<Appbar />
				<Main>
					<Outlet />
				</Main>
				<BottomTabs />
				<Modals />
			</Loadable>
		</div>
	)
}

export default Layout

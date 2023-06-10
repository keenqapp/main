import styled from '@emotion/styled'
import { Navigate, Outlet } from 'react-router-dom'

import { isAuthed, isReady } from '@/services/auth'

import Loadable from '@/ui/Loadable'

import Appbar from '@/core/Appbar'
import BottomTabs from '@/core/BottomTabs'


const Main = styled.main`
  padding-top: var(--appbar-height);
`

function Layout() {
  if (!isAuthed.value) return <Navigate to='/auth/login' />
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
      </Loadable>
    </div>
  )
}

export default Layout

import { Navigate, Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

import { isAuthed, isReady } from '@/services/auth'

import Loadable from '@/ui/Loadable'

import Appbar from '@/core/Appbar'

const Main = styled.main`
  padding-top: var(--appbar-height);
`

function RootPage() {
  if (!isAuthed.value) return <Navigate to='/auth/login' />

  return (
    <div data-testid='RootPage'>
      <Appbar />
      <Main>
        <Loadable loading={!isReady.value}>
          <Outlet />
        </Loadable>
      </Main>
    </div>
  )
}

export default RootPage

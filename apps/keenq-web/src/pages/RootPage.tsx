import { Navigate, Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

import { isAuthed, isReady } from '@/services/auth'

import Loadable from '@/ui/Loadable'

import Appbar from '@/core/Appbar'
import BottomTabs from '@/core/BottomTabs'


const Main = styled.main`
  padding-top: var(--appbar-height);
`

function RootPage() {
  return (
    <div data-testid='RootPage'>
      <Loadable loading={!isReady.value}>
        <Appbar />
        <Main>
          <Outlet />
        </Main>
        <BottomTabs />
      </Loadable>
    </div>
  )
}

export default RootPage

import styled from '@emotion/styled'

import Page from '@/ui/Page'

import LoginForm from '@/components/LoginForm'

interface Props {}

function LoginPage() {
  return (
    <Page data-testid='LoginPage'>
      <LoginForm />
    </Page>
  )
}

export default LoginPage

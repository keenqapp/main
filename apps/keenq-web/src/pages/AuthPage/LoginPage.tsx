import styled from '@emotion/styled'

import Page from '@/ui/Page'

import LoginForm from '@/components/LoginForm'


const StyledPage = styled(Page)`
	padding-bottom: 0;
`


function LoginPage() {
	return (
		<StyledPage data-testid='LoginPage'>
			<LoginForm />
		</StyledPage>
	)
}

export default LoginPage

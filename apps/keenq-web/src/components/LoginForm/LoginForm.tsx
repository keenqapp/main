import { useEffect, useState } from 'preact/hooks'
import styled from '@emotion/styled'
import { useSignal } from '@preact/signals'
import { useNavigate } from 'react-router-dom'

import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone'

import { authError, useSend, useVerify } from '@/services/auth'

import Container from '@/ui/Container'
import Space from '@/ui/Space'

import { inputsHasError, isNotEmpty, isValidPhone, useInput } from '@/hooks/useInput'


const StyledCardContent = styled(CardContent)`
  transition: height 1s ease-in-out;
`

const StyledStack = styled(Stack)`
	height: ${p => p.height}px;
	transition: height 300ms ease-in-out;
`

function f(s: any, prev: any) {
	const sss = (s.length > 14 ? prev: s).replaceAll(/\D/g, '')
	return '+' + sss
}

function LoginForm() {

	const [ codeSent, setCodeSent ] = useState(false)
	const loading = useSignal(false)

	const navigate = useNavigate()

	const { send } = useSend()
	const { verify } = useVerify()

	const [ height, setHeight ] = useState(window.visualViewport?.height || window.innerHeight)

	useEffect(() => {
		const resize = () => setHeight(window.visualViewport?.height || window.innerHeight)
		window.addEventListener('resize', resize)
		return () => window.removeEventListener('resize', resize)
	}, [])

	const phoneInput = useInput({
		label: 'Phone',
		fullWidth: true,
		variant: 'outlined',
		placeholder: 'Your phone number',
		type: 'tel',
		format: f,
		validation: [isNotEmpty, isValidPhone],
		error: authError.value,
		onFocus: () => authError.value = null
	})

	const handleChange = (e: any) => {
		if (e.target.value.length === 6) {
			setTimeout(() => {
				codeInput.value = e.target.value
				e.target.blur()
				onVerify()
			}, 1)
		}
	}

	const codeInput = useInput({
		label: 'Code',
		fullWidth: true,
		variant: 'outlined',
		type: 'number',
		placeholder: 'Code that was sent to your phone',
		validation: [isNotEmpty],
		error: authError.value,
		onChange: handleChange,
		onFocus: () => authError.value = null
	})

	const onCodeSent = async () => {
		if (!inputsHasError(phoneInput)) {
			loading.value = true
			codeInput.value = ''
			await send(phoneInput.value.replace(/(?!^\+)\D/g, '')) && setCodeSent(true)
			loading.value = false
		}
	}

	const onVerify = async () => {
		if (!inputsHasError(codeInput)) {
			loading.value = true
			await verify(phoneInput.value.replace(/(?!^\+)\D/g, ''), codeInput.value) && navigate('/match')
			loading.value = false
		}
	}

	const onRetry = () => {
		setCodeSent(false)
	}

	return (
		<Container data-testid='LoginForm' flex={1} horizontal={3}>
			<StyledStack justifyContent='center' alignItems='stretch' height={height}>
				<Typography variant='h4' align='center'>Keenq</Typography>
				<Space height={2} />
				<Card>
					<StyledCardContent>
						{!codeSent
							? (
								<>
									<TextField {...phoneInput} />
									<Space height={2} />
									<Stack>
										<LoadingButton
											id='send-code-button'
											onClick={onCodeSent}
											loading={loading.value}
											variant='outlined'
										>Send code</LoadingButton>
									</Stack>
								</>
							)
							: (
								<>
									<TextField {...codeInput} />
									<Space height={2} />
									<Stack gap={2} alignItems='center'>
										<LoadingButton
											onClick={onVerify}
											loading={loading.value}
											variant='outlined'
											fullWidth
										>Verify code</LoadingButton>
										<Button
											color='secondary'
											onClick={onRetry}
											startIcon={<ChevronLeftTwoToneIcon />}
											size='small'
										>Use another phone number?</Button>
									</Stack>
								</>
							)}
					</StyledCardContent>
				</Card>
			</StyledStack>
		</Container>
	)
}

export default LoginForm

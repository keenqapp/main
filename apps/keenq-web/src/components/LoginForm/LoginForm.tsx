import { useEffect, useState } from 'preact/hooks'
import styled from '@emotion/styled'
import { useStore } from '@nanostores/preact'
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

import { $authError, useSend, useVerify } from '@/services/auth'
import { useTranslate } from '@/services/translate'

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

function format(s: string, prev: any) {
	const sss = (s.length > 14 ? prev : s).replaceAll(/\D/g, '')
	return '+' + sss
}

function LoginForm() {
	const { t } = useTranslate()
	const authError = useStore($authError)

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
		label: t`auth.phone`,
		fullWidth: true,
		variant: 'outlined',
		placeholder: t`auth.number`,
		type: 'tel',
		format: format,
		validation: [isNotEmpty, isValidPhone],
		error: authError,
		onFocus: () => $authError.set(null),
	})

	const handleChange = ( _: any, code: string) => {
		if (code.length === 4) {
			setTimeout(() => {
				codeInput.value = code
				codeInput.inputRef.current.blur()
				onVerify()
			}, 1)
		}
	}

	const codeInput = useInput({
		label: t`auth.code`,
		fullWidth: true,
		variant: 'outlined',
		type: 'number',
		inputmode:'numeric',
		pattern: '[0-9]*',
		placeholder: t`auth.wasSent`,
		validation: [isNotEmpty],
		error: authError,
		onChange: handleChange,
		onFocus: () => $authError.set(null)
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
		loading.value = false
		phoneInput.onClear()
		codeInput.onClear()
	}

	return (
		<Container data-testid='LoginForm' flex={1} horizontal={3}>
			<StyledStack justifyContent='center' alignItems='stretch' height={height}>
				<Typography variant='h4' align='center'>{t`app.keenq`}</Typography>
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
										>{t`auth.send`}</LoadingButton>
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
										>{t`auth.verify`}</LoadingButton>
										<Button
											color='secondary'
											onClick={onRetry}
											startIcon={<ChevronLeftTwoToneIcon />}
											size='small'
										>{t`auth.another`}</Button>
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

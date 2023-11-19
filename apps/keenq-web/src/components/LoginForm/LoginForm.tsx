import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useStore } from '@nanostores/react'

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

import { inputsHasError, isNotEmpty, useInput, Validator, withErrorText } from '@/hooks/useInput'
import { asYouType } from '@/utils/formatters'


const StyledCardContent = styled(CardContent)`
  transition: height 1s ease-in-out;
`

const StyledStack = styled(Stack)`
	height: ${p => p.height}px;
	transition: height 300ms ease-in-out;
`

function format(s: string, _: any) {
	return asYouType(s)
}

const e: Validator = (i: string) => {
	const err = withErrorText(isNotEmpty, 'auth.inputEmpty')
	return err(i.replace('+', ''))
}

function LoginForm() {
	const { t } = useTranslate()
	const authError = useStore($authError)

	const [ codeSent, setCodeSent ] = useState(false)
	const [ loading, setLoading ] = useState(false)

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
		translation: t,
		type: 'tel',
		format: format,
		validation: [e],
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
		type: 'text',
		translation: t,
		inputProps: {
			inputmode:'numeric',
			pattern: '[0-9]*',
		},
		placeholder: t`auth.wasSent`,
		validation: [isNotEmpty, e],
		error: authError,
		onChange: handleChange,
		onFocus: () => $authError.set(null)
	})

	const onCodeSent = async () => {
		if (!inputsHasError(phoneInput)) {
			setLoading(true)
			codeInput.value = ''
			await send(phoneInput.value.replace(/(?!^\+)\D/g, '')) && setCodeSent(true)
			setLoading(false)
		}
	}

	const onVerify = async () => {
		if (!inputsHasError(codeInput)) {
			setLoading(true)
			await verify(phoneInput.value.replace(/(?!^\+)\D/g, ''), String(codeInput.value)) && navigate('/match')
			setLoading(false)
		}
	}

	const onRetry = () => {
		setCodeSent(false)
		setLoading(false)
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
											loading={loading}
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
											loading={loading}
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

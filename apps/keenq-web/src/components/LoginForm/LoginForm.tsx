import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useStore } from '@nanostores/react'

import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone'

import { $authError, useSend, useVerify } from '@/services/auth'
import { useTranslate } from '@/services/translate'

import Container from '@/ui/Container'
import IfElse from '@/ui/IfElse'
import Space from '@/ui/Space'
import Stack from '@/ui/Stack'

import { inputsHasError, isNotEmpty, useInput, Validator, withErrorText } from '@/hooks/useInput'
import useLoadingFor from '@/hooks/useLoadingFor'
import { $sortedJoinQueue } from '@/hooks/useShouldJoin'
import { asYouType } from '@/utils/formatters'


const StyledCardContent = styled(CardContent)`
  transition: height 1s ease-in-out;
`

const StyledStack = styled(Stack)`
	flex-direction: column;
	align-items: stretch;
	height: ${p => p.height}px;
	transition: height 300ms ease-in-out;
	justify-content: center;
`

function format(s: string, _: any) {
	return asYouType(s)
}

const e: Validator = (i: string) => {
	const err = withErrorText(isNotEmpty, 'auth.inputEmpty')
	// return err(i.replace('+', ''))
	return err(i)
}

function LoginForm() {
	const { t } = useTranslate()
	const authError = useStore($authError)

	const [ codeSent, setCodeSent ] = useState(false)
	// const [ loading, setLoading ] = useState(false)

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
		const isRU = phoneInput.value.startsWith('+7')
		if (code.length === (isRU ? 4 : 6)) {
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
		validation: [ isNotEmpty ],
		error: authError,
		onChange: handleChange,
		onFocus: () => $authError.set(null)
	})

	const onCodeSent = async () => {
		if (!inputsHasError(phoneInput)) {
			codeInput.value = ''
			const result = await send(phoneInput.value.replace(/(?!^\+)\D/g, ''))
			if (result) setCodeSent(true)
		}
	}

	const [ loadingSent, executeSent  ] = useLoadingFor(onCodeSent)

	const onVerify = async () => {
		if (!inputsHasError(codeInput)) {
			const result = await verify(phoneInput.value.replace(/(?!^\+)\D/g, ''), String(codeInput.value))
			if (!result) return
			if ($sortedJoinQueue.get().length) navigate(`/room/${$sortedJoinQueue.get()[0].roomId}`)
			else navigate('/match')
		}
	}

	const [ loadingVerify, executeVerify  ] = useLoadingFor(onVerify)

	const onRetry = () => {
		setCodeSent(false)
		phoneInput.onClear()
		codeInput.onClear()
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.grecaptcha.reset()
	}

	return (
		<Container data-testid='LoginForm' flex={1} horizontal={3}>
			<StyledStack justifyContent='center' alignItems='stretch' height={height}>
				<Typography variant='h4' align='center'>{t`app.keenq`}</Typography>
				<Space height={1} />
				<Card>
					<StyledCardContent>
						<IfElse cond={!codeSent}>
							<>
								<TextField {...phoneInput} />
								<Space height={1} />
								<Stack self='stretch' justify='stretch'>
									<LoadingButton
										id='send-code-button'
										onClick={executeSent}
										loading={loadingSent}
										variant='outlined'
										fullWidth
									>{t`auth.send`}</LoadingButton>
								</Stack>
							</>
							<>
								<TextField {...codeInput} />
								<Space height={1} />
								<Stack gap={1} alignItems='center' direction='column'>
									<LoadingButton
										id='send-code-button'
										onClick={executeVerify}
										loading={loadingVerify}
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
						</IfElse>
					</StyledCardContent>
				</Card>
			</StyledStack>
		</Container>
	)
}

export default LoginForm

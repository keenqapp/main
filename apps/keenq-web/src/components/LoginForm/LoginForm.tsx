import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'


import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { isAuthed, sendCode, setupRecaptcha, verifyCode, error } from '@/services/auth'

// import { useApi } from '@/services/api'
import Container from '@/ui/Container'
import Space from '@/ui/Space'

import { inputsHasError, isNotEmpty,useInput } from '@/hooks/useInput'
import { useSignal } from '@preact/signals-react'

const StyledCardContent = styled(CardContent)`
  transition: height 1s ease-in-out;
`

const StyledStack = styled(Stack)`
  height: 100vh;
`

function f(s: any, prev: any) {
  const sss = (s.length > 14 ? prev: s).replace(/\D/g, '')
  return '+' + sss
}

function LoginForm() {

  const [ codeSent, setCodeSent ] = useState(false)
  const loading = useSignal(false)

  const navigate = useNavigate()

  useEffect(() => {
    setupRecaptcha()
  }, [])

  const phoneInput = useInput({
    label: 'Phone',
    fullWidth: true,
    variant: 'outlined',
    placeholder: 'Your phone number',
    format: f,
    validation: [isNotEmpty],
    error: error.value,
    onFocus: () => error.value = null
    // disabled: api.user.isVerifying
  })

  const codeInput = useInput({
    label: 'Code',
    fullWidth: true,
    variant: 'outlined',
    placeholder: 'Code that was sent to your phone',
    validation: [isNotEmpty],
    error: error.value,
    onFocus: () => error.value = null
    // disabled: api.user.isVerifying
  })

  const handleCodeSent = async () => {
    if (!inputsHasError(phoneInput)) {
      loading.value = true
      await sendCode(phoneInput.value) && setCodeSent(true)
      loading.value = false
    }
  }

  const handleVerify = async () => {
    if (!inputsHasError(codeInput)) {
      loading.value = true
      await verifyCode(codeInput.value) && navigate('/')
      loading.value = false
    }
  }

  const handleRetry = () => setCodeSent(false)

  return (
    <Container data-testid='LoginForm' padding={3}>
      <StyledStack justifyContent='center' alignItems='stretch'>
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
                    <LoadingButton id='send-code-button' onClick={handleCodeSent} loading={loading.value}>Send code</LoadingButton>
                  </Stack>
                </>
              )
              : (
                <>
                  <TextField {...codeInput} />
                  <Space height={1} />
                  <Stack gap={2} alignItems='center'>
                    <LoadingButton onClick={handleVerify} loading={loading.value}>Verify code</LoadingButton>
                    <Typography variant='caption' color='secondary' onClick={handleRetry}>Use another phone number?</Typography>
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

import { useEffect, useState } from 'react'


import Typography from '@mui/material/Typography'
import { IRound } from '@/services/rounds'

type Props = {
  status: IRound['status']
  left: number
  onChange: (left: number) => void
}

function ControlRoundTimer({ status, left, onChange }: Props) {
  useEffect(() => {
    let int: NodeJS.Timeout
    if (status === 'started' && left > 0) {
      int = setInterval(() => onChange(left - 1), 1000)
    }
    return () => {
      int && clearInterval(int)
    }
  }, [ left, status ])

  if (!left) return null

  function getDuration() {
    return `${new Date(left * 1000).toISOString().slice(14, 19)} left`
  }

  return (
    <Typography data-testid='ControlRoundTimer' variant='overline'>
      {getDuration()}
    </Typography>
  )
}

export default ControlRoundTimer

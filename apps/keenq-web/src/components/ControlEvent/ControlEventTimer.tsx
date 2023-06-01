import { useEffect, useState } from 'react'
import { parseJSON } from 'date-fns'

import { formatDate } from '@/utils/formatters'

interface Props {
  date: Date
}

function calculateLeft(date: Date) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return date - new Date()
}

function ControlEventTimer({ date }: Props) {
  const [ left, setLeft ] = useState(calculateLeft(date))

  useEffect(() => {
    const int = setInterval(() => {
      setLeft(calculateLeft(date))
    })
    return () => clearInterval(int)
  }, [ date ])

  return (
    <>
      {formatDate(parseJSON(left), { to: 'HH:mm' })}
    </>
  )
}

export default ControlEventTimer

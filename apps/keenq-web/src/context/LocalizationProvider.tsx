import { ReactNode } from 'react'

import { LocalizationProvider as DatePickerLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function LocalizationProvider({ children }: { children: ReactNode }) {
  return (
    <DatePickerLocalizationProvider data-testid='LocalizationProvider' dateAdapter={AdapterDateFns}>
      {children}
    </DatePickerLocalizationProvider>
  )
}

export default LocalizationProvider

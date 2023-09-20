import { ComponentChildren } from 'preact'

import { LocalizationProvider as DatePickerLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'


function LocalizationProvider({ children }: { children: ComponentChildren }) {
	return (
		<DatePickerLocalizationProvider data-testid='LocalizationProvider' dateAdapter={AdapterDateFns}>
			{children}
		</DatePickerLocalizationProvider>
	)
}

export default LocalizationProvider

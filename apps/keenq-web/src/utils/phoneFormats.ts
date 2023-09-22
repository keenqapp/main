const defaultFormat = (code: number) => [`+${code} `, '###', ' ', '###', ' ', '##', ' ', '##']

export const formats: { [countryCode: string]: string[] } = {
	1: ['+1 ', '###', ' ', '###', ' ', '####'], // US/Canada
	7: defaultFormat(7), // Russia
	44: ['+44 ', '####', ' ', '######'], // UK
	49: ['+49 ', '###', ' ', '#######'], // Germany
	90: defaultFormat(90), // Turkey
	381: ['+381 ', '##', ' ', '###', ' ', '##', ' ', '##'] // Serbia
}

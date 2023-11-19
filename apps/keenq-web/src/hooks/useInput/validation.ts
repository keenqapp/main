// UTILS

export interface Validator {
  (...args: any[]): boolean;
  errorText?: string;
}

export function findInvalid(input: string, validators: Validator | Validator[]): Validator | undefined {
	const validatorsArray = Array.isArray(validators) ? validators : [validators]
	return validatorsArray.find((validate) => !validate(input))
}

export function hasError(input: string, validators: Validator | Validator[], needText?: boolean): boolean | string {
	const hasInvalid = findInvalid(input, validators)
	return needText ? (hasInvalid ? hasInvalid.errorText || 'Input is not valid' : '') : !!hasInvalid
}

export function withErrorText(validator: Validator, errorText: string): Validator {
	const validatorWithErrorText = validator
	validatorWithErrorText.errorText = errorText
	return validatorWithErrorText
}

// VALIDATOR export functionS

export function isNotEmpty(input: unknown) {
	const inputString = input as string
	const regex = new RegExp(/.+/)
	if (!inputString) {
		return false
	}
	return regex.test(inputString)
}
isNotEmpty.errorText = 'Input shouldn\'t be empty'

export function isContainDigitsAndLetters(input: string) {
	const inputString = input
	const regex1 = new RegExp(/\d+/)
	const regex2 = new RegExp(/\D+/)
	if (!inputString) {
		return false
	}
	return regex1.test(inputString) && regex2.test(inputString)
}

export function isLengthGreater(len: number) {
	return (input: unknown) => (input as string).length >= len
}

export function isLengthLower(len: number) {
	return (input: unknown) => (input as string).length <= len
}

export function isValidPhone(input: unknown) {
	return isLengthGreater(10)(input) && isLengthLower(14)(input)
}

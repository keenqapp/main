// UTILS

export interface Validator {
  (...args: unknown[]): boolean;
  errorText?: string;
}

function findInvalid(input: string, validators: Validator | Validator[]): Validator | undefined {
  const validatorsArray = Array.isArray(validators) ? validators : [validators]
  return validatorsArray.find((validate) => !validate(input))
}

function hasError(input: string, validators: Validator | Validator[], needText?: boolean): boolean | string {
  const hasInvalid = findInvalid(input, validators)
  return needText ? (hasInvalid ? hasInvalid.errorText || 'Input is not valid' : '') : !!hasInvalid
}

function withErrorText(validator: Validator, errorText: string): Validator {
  const validatorWithErrorText = validator
  validatorWithErrorText.errorText = errorText
  return validatorWithErrorText
}

// VALIDATOR FUNCTIONS

const isNotEmpty = (input: unknown) => {
  const inputString = input as string
  const regex = new RegExp(/.+/)
  if (!inputString) {
    return false
  }
  return regex.test(inputString)
}

const isContainDigitsAndLetters = (input: string) => {
  const inputString = input
  const regex1 = new RegExp(/\d+/)
  const regex2 = new RegExp(/\D+/)
  if (!inputString) {
    return false
  }
  return regex1.test(inputString) && regex2.test(inputString)
}

const isLengthGreater = (len: number) => (input: unknown) => {
  return (input as string).length >= len
}

const isLengthLower = (len: number) => (input: unknown) => {
  return (input as string).length <= len
}

export { findInvalid, hasError, isContainDigitsAndLetters, isLengthGreater,isLengthLower,isNotEmpty, withErrorText }

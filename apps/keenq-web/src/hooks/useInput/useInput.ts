import { Component, useEffect, useRef, useState } from 'react'

import { TextFieldProps } from '@mui/material/TextField'

import { hasError as $hasError, Validator } from './validation'


export interface Dict {
  [key: string]: unknown
}

export type EmptyString = ''

export interface UseInputProps extends Dict {
  value?: string
  label?: string | Component<any, any>
  caption?: string
  // onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onChange?: any
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
  type?: string
  validation?: Validator | Validator[]
  placeholder?: string
  helperText?: string
  translation?: any
	forceValid?: boolean

  // To change displaying value in <input>
  format?: (value: string, prev?: string) => string
  // To normalize displaying value after 'format' for to not duplicating formatted value
  parse?: (value: string, prev?: string) => string
}

export function useInput(props: UseInputProps) {
	const {
		value: initValue = '',
		label,
		onChange,
		onFocus,
		onBlur,
		type = 'text',
		validation = () => true,
		forceValid,
		placeholder = '',
		helperText,
		translation = (input: any) => input as string,
		format = (input) => input,
		parse = (input) => input,
		error: externalError,
		...rest
	} = props
	const ref = useRef<HTMLInputElement|null>(null)
	const inputRef = useRef<HTMLInputElement|undefined>(null)
	const [error, setError] = useState<string | undefined>()
	const [input, setInput] = useState<string>(initValue)

	function getFormatted(value: string) {
		return format ? format(value) : value
	}

	useEffect(() => {
		setInput(getFormatted(initValue))
	}, [initValue])

	const _validate = (value: string): string | EmptyString | boolean => {
		const validationArray = Array.isArray(validation) ? validation : [validation]
		const validatorErrorText = $hasError(value, validationArray, true)
		const validatorError = validatorErrorText && typeof validatorErrorText === 'string' ? translation(validatorErrorText) : ''
		setError(validatorError as string)
		return validatorError as string
	}

	const onClear = () => {
		setInput(getFormatted(''))
		setError('')
	}

	// Automatically clear error on focus
	const handleFocus = (e: any) => {
		if (typeof onFocus === 'function') onFocus(e)
		setError('')
	}

	// const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
	const handleChange = (event: any) => {
		const parsedValue = parse(event.target?.value)
		const formattedValue = format(parsedValue, input)
		const isValid = !$hasError(formattedValue, validation)

		if (onChange) {
			if (forceValid && !isValid) return
			onChange(event, formattedValue, isValid)
		}
		event.target.value = formattedValue
		setInput(formattedValue)
	}

	const result = {
		error: !!externalError || !!error,
		helperText: (externalError && translation(externalError)) || (error && translation(error)) || translation(helperText),
		label: translation(label),
		onBlur,
		onChange: handleChange,
		onClear,
		onFocus: handleFocus,
		placeholder: translation(placeholder),
		type,
		validate: () => _validate(input),
		value: input,
		inputRef,
		ref,
		...rest,
	}

  type Result = typeof result
  return result as Result & TextFieldProps & any
}

export type useInputReturnValue = ReturnType<typeof useInput>

export const inputsHasError = (...inputs: useInputReturnValue[]) => {
	const checked = inputs.map((input) => input.validate())
	return checked.findIndex((input) => input) !== -1
}

import { Component } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { TextFieldProps } from '@mui/material/TextField'

import { hasError, Validator } from './validation'
import { ChangeEventHandler } from 'react'


export interface Dict extends Object {
  [key: string]: unknown;
}

export type EmptyString = '';

export interface UseInputProps extends Dict {
  value?: string;
  label?: string | Component<any, any>;
  caption?: string;
  // onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: string;
  validation?: Validator | Validator[];
  placeholder?: string;
  helperText?: string;
  translation?: (value: unknown) => string;

  // To change displaying value in <input>
  format?: (value: string, prev?: string) => string;
  // To normalize displaying value after 'format' for to not duplicating formatted value
  parse?: (value: string, prev?: string) => string;
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
		placeholder = '',
		helperText,
		translation = (input) => input as string,
		format = (input) => input,
		parse = (input) => input,
		error: externalError,
		...rest
	} = props
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
		const validatorErrorText = hasError(value, validationArray, true)
		const validatorError = validatorErrorText && typeof validatorErrorText === 'string' ? translation(validatorErrorText) : ''
		setError(validatorError as string)
		return validatorError as string
	}

	const onClear = () => setInput(getFormatted(''))

	// Automatically clear error on focus
	const handleFocus = () => {
		if (typeof onFocus === 'function') {
			onFocus()
		}
		setError('')
	}

	const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
		const parsedValue = parse(event.target.value)
		const formattedValue = format(parsedValue, input)
		event.target.value = formattedValue
		if (onChange) {
			onChange(event)
		}
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
		...rest,
	}

  type Result = typeof result
  return result as Result & TextFieldProps
}

export type useInputReturnValue = ReturnType<typeof useInput>;

export const inputsHasError = (...inputs: useInputReturnValue[]) => {
	const checked = inputs.map((input) => input.validate())
	return checked.findIndex((input) => input) !== -1
}

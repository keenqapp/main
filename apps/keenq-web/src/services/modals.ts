import { useCallback, useRef } from 'preact/hooks'
import { computed } from '@preact/signals'

import { signal } from '@/utils/signals'


const modals = {
	location: false,
	appbar: false,
	city: false,
	tags: false,
	settings: false,
	confirm: false,
	room: false,
	report: false,
	addMember: false,
	message: false,
	gender: false,
}

export type Modal = keyof typeof modals

export const modalsStore = signal<{ [key in Modal]: boolean }>(modals)

let params = undefined

export function useModal(name: Modal) {
	const open = computed(() => modalsStore()[name]())
	const onOpen = useCallback((...args: any[]) => {
		params = args
		modalsStore()[name](true)
	}, [])
	const onClose = useCallback(() => {
		params = undefined
		modalsStore()[name](false)
	}, [])
	const on = useCallback((fn: () => void) => () => {
		fn()
		onClose()
	}, [])
	const onCloseAll = useCallback(() => modalsStore(modals), [])
	return {
		name,
		open: open.value,
		params,
		on,
		onOpen,
		onClose,
		onCloseAll
	}
}

export interface ConfirmOptions {
	title?: string
	text?: string
	onConfirm: () => void
}

const defaultConfirm = {
	title: 'Are you sure?',
	text: 'This action cannot be undone',
	onConfirm: () => {}
}

const options = signal(defaultConfirm)

export function useConfirm() {
	const open = computed(() => modalsStore().confirm())

	const onOpen = useCallback(() => modalsStore().confirm(true), [])
	const onClose = useCallback(() => {
		modalsStore().confirm(false)
		options(defaultConfirm)
	}, [])
	const onCloseAll = useCallback(() => modalsStore(modals), [])

	const confirm = useCallback((newOptions: ConfirmOptions) => {
		onOpen()
		options(newOptions)
	}, [])

	return {
		name: 'confirm',
		open: open.value,
		confirm,
		options,
		onOpen,
		onClose,
		onCloseAll
	}
}

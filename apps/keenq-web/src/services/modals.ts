import { useCallback } from 'preact/hooks'
import { computed } from '@preact/signals'

import { IRoom } from '@/model/room'
import { signal } from '@/utils/signals'
import { merge } from '@/utils/utils'


const modals = {
	location: false,
	appbar: false,
	city: false,
	tags: false,
	settings: false,
	confirm: false,
	room: false,
	report: false,
	addPartner: false,
	addMemberToRoom: false,
	message: false,
	gender: false,
	attachment: false,
	roomInfo: false,
	roomInfoMember: false,
	partnerRequest: false,
}

export type ModalsState = typeof modals
export type ModalKeys = keyof typeof modals
export type ModalParams<N> = N extends keyof ModalParamsMap ? ModalParamsMap[N] : Record<string, never>

export interface ModalParamsMap {
	roomInfoMember: { uid: string }
	message: { uid: string, authorUid: string }
	report: { uid: string, entity: string }
	addMemberToRoom: { uid?: string, to: string }
	roomInfo: IRoom
}

export const modalsStore = signal<ModalsState>(modals)

let params = {} as any
export function useModal<N extends ModalKeys>(name: N) {
	const open = computed(() => modalsStore()[name]())
	const onOpen = useCallback((dto: ModalParams<N> = {} as any) => {
		params = dto
		modalsStore()[name](true)
	}, [])
	const onClose = useCallback(() => {
		params = {} as any
		modalsStore()[name](false)
	}, [])
	const on = useCallback((fn: () => void) => () => {
		fn()
		onClose()
	}, [])
	const onCloseAll = useCallback(() => modalsStore.clear(), [])
	return {
		name: name as Extract<ModalKeys, N>,
		open: open.value,
		params: params as ModalParams<N>,
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

export interface StrictConfirmOptions {
	title: string
	text: string
	onConfirm: () => void
}

const defaultConfirm = {
	title: 'Are you sure?',
	text: 'This action cannot be undone',
	onConfirm: () => undefined
}

const options = signal(defaultConfirm)

export function useConfirm() {
	const open = computed(() => modalsStore().confirm())

	const onOpen = useCallback(() => modalsStore().confirm(true), [])
	const onClose = useCallback(() => {
		modalsStore().confirm(false)
		options.clear()
	}, [])
	const onCloseAll = useCallback(() => modalsStore.clear(), [])
	const confirm = useCallback((newOptions: ConfirmOptions) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		options(merge(defaultConfirm, newOptions))
		onOpen()
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

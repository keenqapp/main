import { useCallback } from 'preact/hooks'
import { computed } from '@preact/signals'

import { IMessage } from '@/model/message'
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
	acquaintance: false,
	permissionInstruction: false,
	rooms: false,
	createRoom: false,
	install: false,
	notifications: false
}

export type ModalsState = typeof modals
export type ModalKeys = keyof typeof modals
export type ModalParams<N> = N extends keyof ModalParamsMap ? ModalParamsMap[N] : Record<string, never>

export interface ModalParamsMap {
	roomInfoMember: { id: string }
	message: IMessage
	report: { id: string, entity: string }
	addMemberToRoom: { id?: string, to: string }
	roomInfo: IRoom
	partnerRequest: { id: string }
}

export interface UseModalOptions {
	onClose: () => void
	onOpen: () => void
}

export const modalsStore = signal<ModalsState>(modals)
let params = {} as any

export function useModal<N extends ModalKeys>(name: N, options?: UseModalOptions) {
	const isOpen = computed(() => modalsStore()[name]())
	const open = useCallback((dto: ModalParams<N> = {} as any) => {
		options?.onOpen?.()
		params = dto
		modalsStore()[name](true)
	}, [])
	const close = useCallback(() => {
		options?.onClose?.()
		params = {} as any
		modalsStore()[name](false)
	}, [])
	const on = useCallback((fn: (e?: any) => void) => (e?: any) => {
		fn(e)
		close()
	}, [])
	const closeAll = useCallback(() => modalsStore.clear(), [])
	return {
		name: name as Extract<ModalKeys, N>,
		isOpen: isOpen.value,
		params: params as ModalParams<N>,
		onOpen: open,
		on,
		open,
		close,
		closeAll
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
	title: 'title',
	text: 'text',
	onConfirm: () => undefined
}

const options = signal(defaultConfirm)

export function useConfirm() {
	const open = computed(() => modalsStore().confirm())

	const onOpen = useCallback(() => modalsStore().confirm(true), [])
	const close = useCallback(() => {
		modalsStore().confirm(false)
		options.clear()
	}, [])
	const closeAll = useCallback(() => modalsStore.clear(), [])
	const confirm = useCallback((newOptions: ConfirmOptions) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		options(merge(defaultConfirm, newOptions))
		onOpen()
	}, [])

	return {
		name: 'confirm',
		open: open.value,
		isOpen: open.value,
		confirm,
		options,
		onOpen,
		close,
		closeAll
	}
}

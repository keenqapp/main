import { useCallback } from 'preact/hooks'
import { useStore } from '@nanostores/preact'
import { atom, map } from 'nanostores'

import { IMessage } from '@/model/message'
import { IRoom } from '@/model/room'

import { merge } from '@/utils/utils'


const modalsInit = {
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

export type ModalsState = typeof modalsInit
export type ModalKeys = keyof typeof modalsInit
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

export const $modals = map<ModalsState>(modalsInit)
let params = {} as any

export function useModal<N extends ModalKeys>(name: N, options?: UseModalOptions) {
	// TODO check proper way to handle 'map' for reactivity
	const modals = useStore($modals)
	const isOpen = modals[name]
	const open = useCallback((dto: ModalParams<N> = {} as any) => {
		options?.onOpen?.()
		params = dto
		$modals.setKey(name, true)
	}, [])
	const close = useCallback(() => {
		options?.onClose?.()
		params = {} as any
		$modals.setKey(name, false)
	}, [])
	const on = useCallback((fn: (e?: any) => void) => (e?: any) => {
		fn(e)
		close()
	}, [])
	const closeAll = useCallback(() => $modals.set(modalsInit), [])
	return {
		name: name as Extract<ModalKeys, N>,
		params: params as ModalParams<N>,
		isOpen,
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
	title: 'confirm.title',
	text: 'confirm.text',
	onConfirm: () => undefined
}

const $options = atom(defaultConfirm)

export function useConfirm() {
	const modals = useStore($modals)
	const isOpen = modals['confirm']
	const options = useStore($options)
	const open = useCallback(() => $modals.setKey('confirm', true), [])
	const close = useCallback(() => {
		$modals.setKey('confirm', false)
		$options.set(defaultConfirm)
	}, [])
	const closeAll = useCallback(() => {
		$modals.set(modalsInit)
	}, [])
	const confirm = useCallback((newOptions: ConfirmOptions) => {
		open()
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		$options.set(merge(defaultConfirm, newOptions))
	}, [])
	return {
		name: 'confirm',
		isOpen,
		open,
		close,
		confirm,
		options,
		closeAll
	}
}

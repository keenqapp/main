import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useStore } from '@nanostores/react'

import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'

import { useModal } from '@/services/modals'
import { ask } from '@/services/notifications'
import { uploadImage } from '@/services/spaces'

import { useCurrentMember } from '@/model/member/hooks'
import { getImages, getReply, IMessage, messagegql, updatemessagegql } from '@/model/message'
import { getText } from '@/model/message'
import { insertmessagegql } from '@/model/message/gql'
import { $isChannel } from '@/model/room'
import { useCurrentRoom } from '@/model/room/hooks'

import Stack from '@/ui/Stack'

import RoomInputEditImage from '@/components/Room/RoomInput/RoomInputEditImage'
import RoomInputNewFile from '@/components/Room/RoomInput/RoomInputNewFile'
import RoomInputReply from '@/components/Room/RoomInput/RoomInputReply'
import { $imagesToAdd, $imagesToEdit, $imagesToEditSetted, $messageReplyOrEditId, $scroll, $sending, clear } from '@/components/Room/RoomInput/state'

import Loading from '@/core/Loading'
import { useQuery, useUpdate } from '@/hooks/gql'
import { useInsert } from '@/hooks/gql/useInsert'
import useAsyncEffect from '@/hooks/useAsyncEffect'
import { useInput } from '@/hooks/useInput'
import { isIOS } from '@/utils/utils'


const RoomInputContainer = styled.div`
	min-height: var(--vertical-space);
  padding: 0 1rem 0;
	
	& textarea, .MuiInputBase-root {
		padding: 0.3rem 0.5rem;
	}
`

const Input = styled(TextField)`
	flex-grow: 1;
`

function RoomInput() {

	const sending = useStore($sending)
	const { open } = useModal('attachment')
	const messageReplyOrEditId = useStore($messageReplyOrEditId)

	const { id: mid } = useCurrentMember()
	const { room, isMember, isAdmin } = useCurrentRoom()
	const { id: rid } = room
	const isChannel = $isChannel(room)

	const [ , insert ] = useInsert(insertmessagegql)
	const [ , update ] = useUpdate(updatemessagegql)

	const isEdit = messageReplyOrEditId.mode === 'edit'
	const isReply = messageReplyOrEditId.id && !isEdit

	const [ result, refresh ] = useQuery(messagegql, { id: messageReplyOrEditId.id })
	const message = result.data?.messages_by_pk

	const text = getText(message)
	const images = getImages(message)
	const reply = getReply(message)
	const imagesToEdit = useStore($imagesToEdit)
	const imagesToEditSetted = useStore($imagesToEditSetted)
	const imagesToAdd = useStore($imagesToAdd)

	const textInput = useInput({
		value: isEdit ? text : '',
		variant: 'outlined',
		fullWidth: true,
		autocomplete: 'off',
		dense: true,
		multiline: true,
		maxRows: 3,
		onFocus: () => {
			if (!isIOS()) return
			const r = document.querySelector(':root') as HTMLElement
			r?.style.setProperty('--main-position', 'fixed')
			r?.style.setProperty('--safe-area', '0px')
			r?.style.setProperty('--appbar-height', '0px')
		},
		onBlur: () => {
			if (!isIOS()) return
			const r = document.querySelector(':root') as HTMLElement
			r?.style.setProperty('--main-position', 'relative')
			r?.style.setProperty('--safe-area', '20px')
			r?.style.setProperty('--appbar-height', '56px')
		},
	})

	useAsyncEffect(async () => {
		if (messageReplyOrEditId.id) {
			if (isEdit && images && images?.length > 0 && !imagesToEditSetted) {
				await refresh()
				$imagesToEdit.set(images)
				$imagesToEditSetted.set(true)
			}
			textInput.inputRef.current?.focus()
		}
	}, [ messageReplyOrEditId.id, images ])


	useEffect(() => {
		return clear
	}, [])

	useEffect(() => {
		const fn = (e: KeyboardEvent) => {
			if (e.key === 'Enter' && (e.ctrlKey||e.metaKey)) {
				e.preventDefault()
				onSendClick()
			}
		}
		window.addEventListener('keydown', fn)
		return () => window.removeEventListener('keydown', fn)
	}, [ textInput.value ])

	const onSendClick = async () => {
		if (sending) return
		$sending.set(true)
		try {
			const content: IMessage['content'] = []
			const images: IMessage['content'] = []
			let shouldSave = false

			if (textInput.value) {
				shouldSave = true
				content.push({ type: 'text', value: { text: textInput.value } })
			}
			if (imagesToAdd.size > 0) {
				shouldSave = true
				for await (const [_, data] of imagesToAdd) {
					const uploaded = await uploadImage(`room/${rid}/messages`, data.file)
					images.push({ type: 'image', value: uploaded! })
				}
			}
			if (imagesToEdit.length > 0) {
				shouldSave = true
				for await (const image of imagesToEdit) {
					images.push({ type: 'image', value: image })
				}
			}
			if (images.length > 0) {
				content.push(...images.slice(0, 3))
			}
			if (isReply) {
				shouldSave = true
				content.push({ type: 'reply', value: message })
			}
			if (reply) {
				shouldSave = true
				content.push({ type: 'reply', value: reply })
			}

			const newmessage = {
				authorId: mid,
				roomId: rid,
				date: new Date().toISOString(),
				type: 'personal',
				content
			} as Partial<IMessage>

			clear()
			textInput.onClear()

			if (shouldSave) {
				if (isEdit) await update(messageReplyOrEditId.id, newmessage)
				else await insert(newmessage)
			}
			// REFACTOR add optimistic update
			setTimeout(() => {
				$scroll.get()?.scrollTo({ behavior: 'smooth', top: $scroll.get()?.scrollHeight || 0 })
			}, 1000)
		}
		catch(e) {
			throw { error: e }
		}
		finally {
			ask()
			$sending.set(false)
		}
	}

	const showInput =  isAdmin || (!isChannel && isMember)

	return (
		<RoomInputContainer data-testid='RoomInput'>
			<Stack direction='column' align='stretch' gap={0.2}>
				<RoomInputReply />
				{showInput && (
					<>
						<Stack gap={0.2} direction='column' align='stretch'>
							{imagesToEdit.map((image) => <RoomInputEditImage key={image.id} {...image} />)}
							{imagesToAdd.toFlatArray().map(file => <RoomInputNewFile key={file.id} {...file} />)}
						</Stack>
						<Stack justify='stretch' gap={1} align='end'>
							<IconButton color='secondary' onClick={open}><AttachFileTwoToneIcon /></IconButton>
							<Input {...textInput} />
							{sending
								? <IconButton color='primary'><Loading size={'1.5rem'} /></IconButton>
								: <IconButton color='primary' onClick={onSendClick} onMouseDown={e => { e.preventDefault() }}><SendTwoToneIcon /></IconButton>}
						</Stack>
					</>
				)}
			</Stack>
		</RoomInputContainer>
	)
}

export default RoomInput

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone'
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { insertlinksgql, linksgql, removelinksgql } from '@/model/links/gql'
import { useCurrentMember } from '@/model/member'
import { ILink } from '@/model/other'
import { useCurrentRoom } from '@/model/room'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import IfElse from '@/ui/IfElse'
import Stack from '@/ui/Stack'
import Text from '@/ui/Text'

import { useInsert, useMutation, useQuery, UseQueryOptions } from '@/hooks/gql'
import { getId } from '@/utils/utils'


const options: UseQueryOptions = {
	requestPolicy: 'cache-and-network',
} as const

function Link({ id, entityId, url, remove, click }: ILink & { remove: (id: string) => void, click: (id: string, url: string) => void }) {
	return (
		<Stack key={id}>
			<Stack justify='between' flex={1} onClick={() => click(id, url)}>
				<Text>{`keenq.app/room/${entityId}/${url}`}</Text>
				<LinkTwoToneIcon color='primary' />
			</Stack>
			<IconButton color='error' onClick={() => remove(id)}><RemoveTwoToneIcon /></IconButton>
		</Stack>
	)
}

function ShareDrawer() {
	const { t } = useTranslate()
	const { name } = useModal('share')
	const { open } = useModal('link')
	const { id: authorId } = useCurrentMember()
	const { id: entityId } = useCurrentRoom()

	const where = { type: { _eq: 'room' }, entityId: { _eq: entityId } }
	const [ result, refetch ] = useQuery(linksgql, { where }, options)
	const [ , insert] = useInsert(insertlinksgql)
	const [ , _remove ] = useMutation(removelinksgql)

	const create = async () => {
		const url = getId()
		const link = {
			type: 'room',
			entityId,
			url,
			authorId,
		}
		await insert(link)
		refetch()
	}

	const remove = async (id: string) => {
		await _remove({ id })
		refetch()
	}

	const click = (id: string | any, url: string) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		open({ id, type: 'room', entityId, url, authorId })
	}

	return (
		<Drawer data-testid='ShareDrawer' name={name}>
			<Container>
				<IfElse cond={!!result.data?.links.length}>
					<Stack direction='column' align='stretch' gap={1}>
						<Button onClick={create} startIcon={<AddTwoToneIcon />}>{t`words.create`}</Button>
						{result.data?.links.map(link => (
							<Link
								key={link.id}
								{...link}
								remove={remove}
								click={click}
							/>
						))}
					</Stack>
					<Stack direction='column' gap={1} align='stretch'>
						<Card>
							<Text variant='overline' textAlign='center'>{t`words.empty`}</Text>
						</Card>
						<Button onClick={create} startIcon={<AddTwoToneIcon />}>{t`words.create`}</Button>
					</Stack>
				</IfElse>
			</Container>
		</Drawer>
	)
}

export default ShareDrawer

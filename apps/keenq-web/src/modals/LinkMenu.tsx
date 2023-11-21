import { useState } from 'react'
import QRCode from 'react-qr-code'

import IconButton from '@mui/material/IconButton'

import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { ILink, joinedbylinkgql } from '@/model/links'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import IfElse from '@/ui/IfElse'
import Stack from '@/ui/Stack'
import Text from '@/ui/Text'

import { useQuery } from '@/hooks/gql'


function LinkMenu() {
	const [ copied, setCopied ] = useState(false)
	const { t } = useTranslate()
	const { name, params } = useModal('link')
	const [ result ] = useQuery(joinedbylinkgql)
	const count = result?.data?.links_aggregate?.aggregate?.count || 0

	const { url, entityId }: Partial<ILink> = params

	const click = async () => {
		try {
			const http = `https://keenq.app/room/${entityId}/${url}/join`
			navigator.clipboard.writeText(http)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
		catch(e) {
			console.error(e)
		}
	}

	return (
		<Drawer data-testid='LinkMenu' name={name}>
			<Container>
				<Stack direction='column' gap={1}>
					<Card>
						<Stack direction='column' self='stretch' align='stretch'>
							<Stack>
								<Text variant='overline'>{t`links.joined`}</Text>
								<Text>{count}</Text>
							</Stack>
						</Stack>
					</Card>
					<QRCode value={`https://keenq.app/room/${entityId}/${url}/join`} />
					<Card onClick={click}>
						<IfElse cond={!copied}>
							<Stack>
								<Text variant='overline'>{`keenq.app / ${url}`}</Text>
								<IconButton color='secondary'><ContentCopyTwoToneIcon /></IconButton>
							</Stack>
							<Text variant='overline'>{t`links.copied`}</Text>
						</IfElse>
					</Card>
				</Stack>
			</Container>
		</Drawer>
	)
}

export default LinkMenu

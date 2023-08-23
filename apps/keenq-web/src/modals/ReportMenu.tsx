import { atom } from 'nanostores'

import GppBadTwoToneIcon from '@mui/icons-material/GppBadTwoTone'
import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone'
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { useCurrentMember } from '@/model/member'
import { addreportgql } from '@/model/request/gql'
import { IRequest } from '@/model/request/type'

import { Drawer, DrawerItem, DrawerList } from '@/ui/Drawer'

import { useInsert } from '@/hooks/gql'


export const $report = atom(null)

function ReportMenu() {
	const { id } = useCurrentMember()
	const { t } = useTranslate('report')
	const { name, closeAll, params } = useModal('report')
	const [ , insert ] = useInsert(addreportgql)

	const on = (clause: string) => () => {
		const object = {
			type: 'report',
			authorId: id,
			content: [{ ...params, clause }]
		} as IRequest
		insert(object)
		closeAll()
	}

	return (
		<Drawer data-testid='ReportMenu' name={name}>
			<DrawerList>
				<DrawerItem
					icon={<SmartToyTwoToneIcon color='error' />}
					text={t`spamTitle`}
					subtext={t`spamDesc`}
					onClick={on('spam')}
				/>
				<DrawerItem
					icon={<SentimentVeryDissatisfiedTwoToneIcon color='error' />}
					text={t`abuseTitle`}
					subtext={t`abuseDesc`}
					onClick={on('abuse')}
				/>
				<DrawerItem
					icon={<GppBadTwoToneIcon color='error' />}
					text={t`violationTitle`}
					subtext={t`violationDesc`}
					onClick={on('violation')}
				/>
			</DrawerList>
		</Drawer>
	)
}

export default ReportMenu

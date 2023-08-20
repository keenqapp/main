import { useTranslate } from '@/services/translate'

import Page from '@/ui/Page'

import UnderConstruction from '@/components/UnderConstruction'


function EventsPage() {
	const { t } = useTranslate('events')
	return (
		<Page data-testid='EventsPage'>
			<UnderConstruction text={t`still`} subtext={t`here`} />
		</Page>
	)
}

export default EventsPage

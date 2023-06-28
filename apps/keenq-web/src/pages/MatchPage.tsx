import Page from '@/ui/Page'

import Match from '@/components/Match'

import AcquaintanceDrawer from '@/modals/AcquaintanceDrawer'


function MatchPage() {
	return (
		<Page data-testid='MatchPage'>
			<Match />
			<AcquaintanceDrawer />
		</Page>
	)
}

export default MatchPage

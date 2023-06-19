import Page from '@/ui/Page'

import Match from '@/components/Match'

import ReportMenu from '@/modals/ReportMenu'


function MatchPage() {
	return (
		<Page data-testid='MatchPage'>
			<Match />
			<ReportMenu />
		</Page>
	)
}

export default MatchPage

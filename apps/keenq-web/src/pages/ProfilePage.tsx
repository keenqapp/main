import Page from '@/ui/Page'

import Profile from '@/components/Profile'

import ChooseCityDrawer from '@/modals/ChooseCityDrawer'
import GenderDrawer from '@/modals/GenderDrawer'
import LocationDrawer from '@/modals/LocationDrawer'
import SettingsDrawer from '@/modals/SettingsDrawer'
import TagsDrawer from '@/modals/TagsDrawer'


function ProfilePage() {
	return (
		<Page data-testid='ProfilePage' animation='fadeIn'>
			<Profile />
			<LocationDrawer />
			<ChooseCityDrawer />
			<TagsDrawer />
			<SettingsDrawer />
			<GenderDrawer />
		</Page>
	)
}

export default ProfilePage

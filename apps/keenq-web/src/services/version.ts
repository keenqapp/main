import { useCurrentMember } from '@/model/member'


const testersIds = [ 'boris', import.meta.env.VITE_TEST_ID || '' ]

export function useVersion() {
	const { id } = useCurrentMember()
	const long = import.meta.env.VITE_APP_VERSION || 'dev'
	return testersIds.includes(id) ? long.cut(7, false) : ''
}

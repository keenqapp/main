import { persistentAtom } from '@nanostores/persistent'

import { json } from '@/utils/utils'


export const $showTabs = persistentAtom('$showTabs', false, json)
export const $tab = persistentAtom<string>('$roomsTab', 'personal')

import { persistentAtom } from '@nanostores/persistent'

import { boolAtom } from '@/utils/utils'


export const $showTabs = persistentAtom('$showTabs', false, boolAtom)
export const $tab = persistentAtom('$roomsTab', 'personal')

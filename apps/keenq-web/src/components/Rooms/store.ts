import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores'

import { boolAtom } from '@/utils/utils'


export const $showTabs = persistentAtom('$showTabs', false, boolAtom)
export const $tab = atom('personal')

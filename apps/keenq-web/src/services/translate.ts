import { useCallback } from 'preact/hooks'
import { persistentAtom } from '@nanostores/persistent'
import { useStore } from '@nanostores/preact'
import get from 'lodash-es/get'

import en from '@/locales/en-US.json'
import ru from '@/locales/ru-RU.json'


type Locale = 'ru-RU' | 'en-US'
// type Dict = typeof en | typeof ru
// type Keys = keyof Dict

const $locale = persistentAtom<Locale>('lang', navigator.language as Locale)

function _path(key: string, namespace?: string) {
	return namespace ? `${namespace}.${key}` : key
}

function translate({ namespace, key, locale, values }: { key: TemplateStringsArray | string, namespace?: string, locale: string, values?: string[] }) {
	const r = values && Array.isArray(key)
		? (key as TemplateStringsArray).reduce((result, string, index) => result + string + (values[index] || ''), '')
		: key as string
	const path = _path(r, namespace)
	if (locale === 'ru-RU') return get(ru, path, path)
	if (locale === 'en-US') return get(en, path, path)
	return path
}

export function useTranslate(namespace?: string) {
	const locale = useStore($locale)
	const t = useCallback((key: TemplateStringsArray | string, ...values: string[]) => translate({ namespace, key, locale, values }), [ locale, namespace ])
	const change = useCallback((locale: Locale) => $locale.set(locale), [])
	return {
		t,
		locale,
		change
	}
}

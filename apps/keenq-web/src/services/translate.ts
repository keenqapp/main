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

function getTranslation(path: string, locale: string) {
	if (locale === 'ru-RU') return get(ru, path, path)
	if (locale === 'en-US') return get(en, path, path)
	return path
}

function interpolate(template: string, values: Record<string, string>) {
	return template.replace(/{(.*?)}/g, (_, match) => {
		return values[match]
	})
}

export function translate({ namespace, key, locale, values }: { key: TemplateStringsArray | string, namespace?: string, locale: string, values?: string[] | Record<string, string>[]  }) {
	if (values && Array.isArray(key)) {
		const result = (key as TemplateStringsArray).reduce((result, string, index) => result + string + (values[index] || ''), '')
		const path = _path(result, namespace)
		return getTranslation(path, locale)
	}
	else if (typeof key === 'string' && typeof values?.[0] === 'object') {
		const path = _path(key, namespace)
		const translated = getTranslation(path, locale)
		return interpolate(translated, values[0])
	}
	else {
		const path = _path(key as string, namespace)
		return getTranslation(path, locale)
	}
}

export function useTranslate(namespace?: string) {
	const locale = useStore($locale)
	const t = useCallback((key: TemplateStringsArray | string, ...values: string[] | Record<string, string>[]) => translate({ namespace, key, locale, values }), [ locale, namespace ])
	const change = useCallback((locale: Locale) => $locale.set(locale), [])
	return {
		t,
		locale,
		change
	}
}

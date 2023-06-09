const GLOBAL_PREFIX = '@keenq-web'
export function create(namespace: string) {
  const namespacePrefix = `${GLOBAL_PREFIX}/${namespace}/`
  return {
    setItem: (key: string, value: any) => localStorage.setItem(`${namespacePrefix}${key}`, JSON.stringify(value)),
    getItem: <T>(key: string) => {
      const value = localStorage.getItem(`${namespacePrefix}${key}`)
      return value ? JSON.parse(value) as T : null
    },
    removeItem: (key: string) => localStorage.removeItem(`${namespacePrefix}${key}`),
    hasItem: (key: string) => localStorage.getItem(`${namespacePrefix}${key}`) !== null,
    clear: () => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith(namespacePrefix)) localStorage.removeItem(key)
      }
    },
    clearAll: () => localStorage.clear()
  }
}

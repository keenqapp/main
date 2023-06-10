import { useCallback, useState } from 'preact/hooks'


export function useMenuOpen() {
  const [open, setOpen] = useState(false)
  const toggleMenu = useCallback(() => setOpen(prev => !prev), [setOpen])
  const closeMenu = useCallback(() => setOpen(false), [setOpen])
  const setMenuOpen = useCallback((status: boolean) => () => setOpen(status), [setOpen])
  return { open, setOpen, setMenuOpen, toggleMenu, closeMenu }
}

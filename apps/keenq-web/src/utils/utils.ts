import { ID } from '@/types/types'

export function toId(i: string | number) {
  return String(i) as ID
}

export function toIds(i: string[] | number[]) {
  return i.map(String) as ID[]
}

export function setClipboard(text: string) {
  const type = 'text/plain'
  const blob = new Blob([text], { type })
  const data = [new ClipboardItem({ [type]: blob })]
  navigator.clipboard.write(data)
}

import { format, parse,parseISO } from 'date-fns'

import { IEvent } from '@/services/events'

export function formatNumber(number: number | string, currency?: string) {
  if (!number) return ''
  const parts = number.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (parts[1]) parts[1] = parts[1].substring(0, 2)
  return `${parts.join('.')} ${(currency || '')}`
}

const defaultDateFormat = 'HH:mm dd MMM'
type formatDateOptions = { from?: string, to?: string }
export function formatDate(date: string | Date, options?: formatDateOptions) {
  try {
    const parsed = date instanceof Date
      ? date
      : options?.from ? parse(date, options?.from, new Date()) : parseISO(date)
    return format(parsed, options?.to || defaultDateFormat)
  } catch(e) {
    return ''
  }
}
function getString(string?: string) {
  return string ? `${string}, ` : ''
}
export function formatLocation({ country, city, place }: IEvent['location']) {
  return `${getString(country)}${getString(city)}${getString(place)}`.replace(/, $/, '')
}

// export function formatBytes(bytes: any, decimals = 2) {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
// }
//
// export function formatContentType(type: string) {
//   if (type === 'image/jpeg') return 'jpeg'
//   if (type === 'image/png') return 'png'
//   if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx'
//   if (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'xlsx'
//   if (type === 'application/pdf') return 'pdf'
//   return type.split('/').join(' / ').split('.').join(' . ')
// }
//
// export function getWorkSections(total: number, states: { [key in WorkState]: number }, t: any) {
//   return Object.entries(states)
//     .filter(([ state ]) => state !== 'archieved' && state !== 'canceled')
//     .map(([state, count]) => ({ color: colorBy[state as WorkState], value: (count / total) * 100, state: t(state).decapitalize(), count }))
// }
//
// export function GetAccessDescription (accessDescription: number) {
//   const { t, i18n } = useTranslation('projectSettings')
//   switch (accessDescription) {
//    case 1: return t`owner`
//    case 2: return t`designer`
//    case 3: return t`constructor`
//    case 4: return t`worker`
//    case 5: return t`advisor`
//   }
//   return accessDescription
// }

export function getCurrencySign(currency: string) {
  switch (currency) {
  case 'EUR': return '€'
  case 'USD': return '$'
  case 'GBP': return '£'
  case 'CZK': return 'Kč'
  case 'TRY': return '₺'
  case 'AED': return 'د.إ'
  case 'AFN': return '؋'
  case 'ARS': return '$'
  case 'AUD': return '$'
  case 'BBD': return '$'
  case 'BDT': return 'Tk'
  case 'BGN': return 'лв'
  case 'BHD': return 'BD'
  case 'BMD': return '$'
  case 'BND': return '$'
  case 'BOB': return '$b'
  case 'BRL': return 'R$'
  case 'BTN': return 'Nu.'
  case 'BYN': return 'р.'
  case 'BZD': return 'BZ$'
  case 'CAD': return '$'
  case 'CHF': return 'CHF'
  case 'CLP': return '$'
  case 'CNY': return '¥'
  case 'COP': return '$'
  case 'CRC': return '₡'
  case 'DKK': return 'kr'
  case 'DOP': return 'RD$'
  case 'EGP': return '£'
  case 'ETB': return 'Br'
  case 'GEL': return '₾'
  case 'GHS': return '¢'
  case 'GMD': return 'D'
  case 'GYD': return '$'
  case 'HKD': return '$'
  case 'HRK': return 'kn'
  case 'HUF': return 'Ft'
  case 'IDR': return 'Rp'
  case 'ILS': return '₪'
  case 'INR': return '₹'
  case 'ISK': return 'kr'
  case 'JMD': return 'J$'
  case 'JPY': return '¥'
  case 'KES': return 'KSh'
  case 'KRW': return '₩'
  case 'KWD': return 'KD'
  case 'KYD': return '$'
  case 'KZT': return 'лв'
  case 'LAK': return '₭'
  case 'LKR': return '₨'
  case 'LRD': return '$'
  case 'LTL': return 'Lt'
  case 'MAD': return 'MAD'
  case 'MDL': return 'MDL'
  case 'MKD': return 'ден'
  case 'MNT': return '₮'
  case 'MUR': return '₨'
  case 'MWK': return 'MK'
  case 'MXN': return '$'
  case 'MYR': return 'RM'
  case 'MZN': return 'MT'
  case 'NAD': return '$'
  case 'NGN': return '₦'
  case 'NIO': return 'C$'
  case 'NOK': return 'kr'
  case 'NPR': return '₨'
  case 'NZD': return '$'
  case 'OMR': return '﷼'
  case 'PEN': return 'S/.'
  case 'PGK': return 'K'
  case 'PHP': return '₱'
  case 'PKR': return '₨'
  case 'PLN': return 'zł'
  case 'PYG': return 'Gs'
  case 'QAR': return '﷼'
  case 'RON': return 'lei'
  case 'RSD': return 'Дин.'
  case 'RUB': return '₽'
  case 'SAR': return '﷼'
  case 'SEK': return 'kr'
  case 'SGD': return '$'
  case 'SOS': return 'S'
  case 'SRD': return '$'
  case 'THB': return '฿'
  case 'TTD': return 'TT$'
  case 'TWD': return 'NT$'
  case 'TZS': return 'TSh'
  case 'UAH': return '₴'
  case 'UGX': return 'USh'
  case 'UYU': return '$U'
  case 'VEF': return 'Bs'
  case 'VND': return '₫'
  case 'YER': return '﷼'
  case 'ZAR': return 'R'
  }
  return currency
}

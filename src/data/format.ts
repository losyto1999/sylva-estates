// Formati per prezzi, superfici ed ettari, nella lingua attiva (letta a ogni chiamata). Tra numero e unità c'è uno spazio unificatore,
// così "420 m²" non va mai a capo a metà.
import { currentLocale } from '../i18n/locale'

const NBSP = ' '

const formats = new Map<string, { euro: Intl.NumberFormat; decimal: Intl.NumberFormat }>()

function formatsFor(locale: string) {
    let found = formats.get(locale)
    if (!found) {
        found = {
            euro: new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
            decimal: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
        }
        formats.set(locale, found)
    }
    return found
}

/** 2350000 -> "2.350.000 €" / "€2,350,000". */
export const formatPrice = (euros: number) => formatsFor(currentLocale()).euro.format(euros)

/** 420 -> "420 m²". */
export const formatArea = (m2: number) => `${formatsFor(currentLocale()).decimal.format(m2)}${NBSP}m²`

/** 0.8 -> "0,8 ha" / "0.8 ha". */
export const formatHectares = (hectares: number) => `${formatsFor(currentLocale()).decimal.format(hectares)}${NBSP}ha`

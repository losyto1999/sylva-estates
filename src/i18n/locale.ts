import i18n from 'i18next'
import { useTranslation } from 'react-i18next'

// Lingua attiva e helper per i testi. La lingua si può cambiare in qualsiasi momento dal
// selettore nell'header: niente testi o formattatori calcolati una volta sola a livello di
// modulo, si legge sempre la lingua al momento della chiamata.

export type Lang = 'it' | 'en'

/** Locale per `Intl`: italiano o inglese britannico (stesso ordine giorno-mese). */
const LOCALES: Record<Lang, string> = { it: 'it-IT', en: 'en-GB' }

/** Lingua attiva, ridotta a it/en (`i18n.language` può essere anche `en-US`). */
const currentLang = (): Lang => (i18n.resolvedLanguage === 'en' ? 'en' : 'it')

/** Locale `Intl` della lingua attiva. */
export const currentLocale = () => LOCALES[currentLang()]

/** Testo nella lingua attiva, per il codice fuori dai componenti (dati). */
export const translate = (key: string, options?: Record<string, unknown>) =>
    i18n.getFixedT(currentLang())(key, options)

/** Numero scritto a parole ("cinque") se c'è la chiave `numbers.<n>`, altrimenti in cifre. */
export const spellNumber = (n: number) => translate(`numbers.${n}`, { defaultValue: String(n) })

/** Lingua attiva per i componenti: si ri-renderizzano se la lingua cambia. */
export function useLang(): Lang {
    const { i18n: instance } = useTranslation()
    return instance.resolvedLanguage === 'en' ? 'en' : 'it'
}

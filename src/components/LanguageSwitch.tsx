import { useTranslation } from 'react-i18next'
import type { Lang } from '../i18n/locale'
import { useLang } from '../i18n/locale'

const LANGS: Lang[] = ['it', 'en']

/** Selettore IT/EN a pillola, come la barra delle tab: la scelta resta salvata nel browser (vedi i18n/index.ts). */
export function LanguageSwitch({ className = '' }: { className?: string }) {
    const { t, i18n } = useTranslation()
    const lang = useLang()

    function choose(next: Lang) {
        if (next === lang) return
        i18n.changeLanguage(next)
        // Toglie un eventuale ?lng= dall'URL, altrimenti al ricaricamento avrebbe la precedenza sulla scelta.
        const url = new URL(window.location.href)
        if (url.searchParams.has('lng')) {
            url.searchParams.delete('lng')
            window.history.replaceState(window.history.state, '', url)
        }
    }

    return (
        <div role="group" aria-label={t('header.language')} className={`flex gap-0.5 rounded-[999px] bg-pietra p-1 ${className}`}>
            {LANGS.map((l) => (
                <button
                    key={l}
                    type="button"
                    lang={l}
                    aria-pressed={lang === l}
                    onClick={() => choose(l)}
                    className={`pill h-9 min-w-10 px-3 text-[13px] font-semibold tracking-[0.08em] uppercase mobile:h-8 mobile:min-w-9 mobile:px-2.5 ${
                        lang === l ? 'bg-nero-bosco text-pietra-chiara' : 'bg-transparent text-nero-bosco'
                    }`}
                >
                    {l}
                </button>
            ))}
        </div>
    )
}

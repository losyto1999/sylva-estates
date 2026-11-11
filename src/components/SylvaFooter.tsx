import { useTranslation } from 'react-i18next'
import { SITE } from '../data/site'

export function SylvaFooter() {
    const { t } = useTranslation()
    return (
        <footer className="mt-[112px] flex justify-between gap-x-6 gap-y-2 border-t border-pietra px-(--margine) py-10 text-[13px] text-muschio-grigio tablet:flex-wrap mobile:flex-col">
            <p>
                {SITE.name} · {SITE.address} · {t('footer.vat')}
            </p>
            {/* Solo testo: il telefono non avvia chiamate e non c'è una pagina privacy. */}
            <p>
                {SITE.phone} · {SITE.email} · {t('footer.privacy')}
            </p>
        </footer>
    )
}

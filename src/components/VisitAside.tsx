import { useTranslation } from 'react-i18next'
import { FakeButton } from './FakeButton'

/** Riquadro scuro accanto alle schede della villa. */
export function VisitAside() {
    const { t } = useTranslation()
    return (
        <aside className="flex flex-col gap-4 rounded-[28px] bg-nero-bosco p-8 text-pietra-chiara">
            <h2 className="text-[28px] leading-[1.1] font-semibold">{t('property.asideTitle')}</h2>
            <p className="text-[15px] leading-[1.6] text-salvia-chiara">
                {t('property.asideText')}
            </p>
            {/* Largo quanto il riquadro: la colonna flex allunga i suoi elementi. */}
            <FakeButton className="h-[52px] bg-ottone text-[16px] font-bold text-nero-bosco">
                {t('property.asideButton')}
            </FakeButton>
        </aside>
    )
}

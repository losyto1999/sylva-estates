import { useTranslation } from 'react-i18next'
import { FakeButton } from './FakeButton'

/** Fascia scura in fondo alla home. */
export function ClosingBand() {
    const { t } = useTranslation()
    return (
        <section className="mx-(--margine) flex items-center justify-between gap-12 rounded-[32px] bg-nero-bosco p-20 text-pietra-chiara tablet:flex-col tablet:items-start tablet:gap-4 tablet:p-[clamp(32px,7.8125vw,80px)] mobile:p-8">
            <h2 className="max-w-[700px] text-[56px] leading-none font-semibold tablet:text-[length:clamp(36px,5.47vw,56px)]">
                {t('home.closing')}
            </h2>
            <FakeButton className="h-[60px] shrink-0 bg-ottone px-8 text-[17px] font-bold text-nero-bosco">
                {t('home.closingButton')}
            </FakeButton>
        </section>
    )
}

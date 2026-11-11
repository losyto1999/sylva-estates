import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ClosingBand } from '../components/ClosingBand'
import { FakeButton } from '../components/FakeButton'
import { Photo } from '../components/Photo'
import { TerritoryRow } from '../components/TerritoryRow'
import { VillaCarousel } from '../components/VillaCarousel'
import { HERO_PHOTOS, TERRITORIES } from '../data/home'
import { resolvePhoto } from '../data/photos'
import { PROPERTIES } from '../data/properties'
import { paths } from '../routes'

export function SylvaHome() {
    const { t } = useTranslation()
    return (
        <div className="flex flex-col gap-[112px] pt-4">
            <section className="mx-(--margine) grid min-h-[680px] grid-cols-5 gap-4 tablet:min-h-0 tablet:grid-cols-1">
                <div className="col-span-3 flex flex-col justify-between gap-10 rounded-[32px] bg-verde-bosco p-16 text-pietra-chiara tablet:col-span-full mobile:p-8">
                    <p className="text-[14px] font-semibold">{t('home.kicker')}</p>
                    <h1 className="text-[96px] leading-[0.95] font-semibold tracking-[-0.02em] tablet:text-[length:clamp(48px,9.375vw,96px)]">
                        {t('home.title')}
                    </h1>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to={paths.ville}
                            className="pill h-14 bg-pietra-chiara px-7 text-[16px] font-semibold text-nero-bosco"
                        >
                            {t('home.seeVillas')}
                        </Link>
                        <FakeButton className="h-14 border-2 border-pietra-chiara bg-transparent px-7 text-[16px] font-semibold text-pietra-chiara">
                            {t('home.book')}
                        </FakeButton>
                    </div>
                </div>

                {/* contain-size: le foto prendono l'altezza delle righe (332px) senza allungare la hero
                    con le loro proporzioni, che la porterebbero a 720px invece di 680. */}
                <div className="col-span-2 grid grid-rows-2 gap-4 tablet:col-span-full tablet:grid-cols-2 tablet:grid-rows-none">
                    {HERO_PHOTOS.map((ref) => {
                        const resolved = resolvePhoto(ref)
                        if (!resolved) return null
                        return (
                            <Photo
                                key={ref.src}
                                name={resolved.property.name}
                                photo={resolved.photo}
                                eager
                                className="size-full rounded-[32px] contain-size tablet:h-[clamp(160px,32vw,332px)]"
                            />
                        )
                    })}
                </div>
            </section>

            <section aria-labelledby="scopri-le-ville" className="flex flex-col gap-8">
                <div className="flex items-end justify-between gap-x-6 gap-y-2 px-(--margine) mobile:flex-wrap">
                    <h2
                        id="scopri-le-ville"
                        className="text-[56px] font-semibold tablet:text-[length:clamp(36px,5.47vw,56px)]"
                    >
                        {t('home.discover')}
                    </h2>
                </div>

                <VillaCarousel properties={PROPERTIES} />
            </section>

            <section className="flex flex-col gap-[72px] px-(--margine)">
                <h2 className="sr-only">{t('home.territories')}</h2>
                {TERRITORIES.map((territory, i) => (
                    <TerritoryRow key={territory.landscape} territory={territory} index={i} />
                ))}
            </section>

            <ClosingBand />
        </div>
    )
}

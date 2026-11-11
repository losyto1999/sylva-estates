import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import type { Fact } from '../components/FactCard'
import { FactCard } from '../components/FactCard'
import { Gallery } from '../components/Gallery'
import { Lightbox } from '../components/Lightbox'
import type { TabItem } from '../components/Tabs'
import { TabList, TabPanel } from '../components/Tabs'
import { VisitAside } from '../components/VisitAside'
import { formatArea, formatHectares, formatPrice } from '../data/format'
import { propertyDescription } from '../data/photos'
import type { Property } from '../data/properties'
import { PROPERTIES } from '../data/properties'
import { paths } from '../routes'

export function SylvaProperty() {
    const { slug } = useParams()
    const property = PROPERTIES.find((p) => p.slug === slug)

    if (!property) return <Navigate to={paths.ville} replace />

    // key: passando da una villa all'altra la scheda riparte dalla prima tab.
    return <PropertyView key={property.slug} property={property} />
}

function PropertyView({ property }: { property: Property }) {
    const { t } = useTranslation()
    const [active, setActive] = useState('panoramica')
    // null = chiusa; altrimenti l'indice della foto aperta, tra tutte quelle della casa.
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    // `rooms` sono i locali (Casale delle Querce: 9 locali, 4 camere), per questo non c'è "Camere".
    const facts: Fact[] = [
        { label: t('property.area'), value: formatArea(property.area) },
        { label: t('property.rooms'), value: String(property.rooms) },
        { label: t('property.bathrooms'), value: String(property.bathrooms) },
        { label: t('property.land'), value: formatHectares(property.greenHectares) },
        ...(property.pool ? [{ label: t('property.pool'), value: t('property.yes') }] : []),
    ]

    const tabs: TabItem[] = [
        { id: 'panoramica', label: t('property.overview') },
        { id: 'spazi', label: t('property.spaces') },
    ]

    return (
        <div className="flex flex-col gap-8 px-(--margine) pt-4">
            <section className="flex items-end justify-between gap-x-8 rounded-[32px] bg-verde-bosco px-14 py-12 text-pietra-chiara tablet:flex-col tablet:items-start tablet:gap-4 mobile:px-6 mobile:py-8">
                <div className="flex min-w-0 flex-col items-start gap-3">
                    {/* L'::after allarga l'area cliccabile a 44px senza spostare niente. */}
                    <Link
                        to={paths.ville}
                        className="relative text-[14px] font-semibold text-pietra-chiara after:absolute after:-inset-x-2 after:-inset-y-3"
                    >
                        {t('property.back')}
                    </Link>
                    <h1 className="text-[80px] leading-[0.95] font-bold tablet:text-[length:clamp(44px,7.8125vw,80px)]">
                        {property.name}
                    </h1>
                </div>
                <p className="shrink-0 font-display text-[40px] font-semibold tablet:text-[length:clamp(28px,3.906vw,40px)]">
                    {formatPrice(property.price)}
                </p>
            </section>

            <Gallery name={property.name} photos={property.photos} onOpen={setLightboxIndex} />
            {lightboxIndex !== null && (
                <Lightbox
                    name={property.name}
                    photos={property.photos}
                    index={lightboxIndex}
                    onIndexChange={setLightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}

            <TabList label={t('property.tabs')} tabs={tabs} active={active} onChange={setActive} />

            <div className="grid grid-cols-3 items-start gap-12 tablet:grid-cols-1">
                <div className="col-span-2 tablet:col-span-full">
                    <TabPanel id="panoramica" active={active}>
                        <div className="flex flex-col gap-5 text-[19px] leading-[1.75] text-grafite">
                            {propertyDescription(property.slug).map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </TabPanel>

                    <TabPanel id="spazi" active={active}>
                        <dl className="grid grid-cols-2 gap-4">
                            {facts.map((fact) => (
                                <FactCard key={fact.label} fact={fact} />
                            ))}
                        </dl>
                    </TabPanel>
                </div>

                <VisitAside />
            </div>
        </div>
    )
}


import { useTranslation } from 'react-i18next'
import { VillaCardRow } from '../components/VillaCardRow'
import { VillaFilters } from '../components/VillaFilters'
import { matchesFilters } from '../data/filters'
import { PROPERTIES } from '../data/properties'
import { useVillaFilters } from '../useVillaFilters'

export function SylvaListings() {
    const { t } = useTranslation()
    const { selected, activeCount, setPriceRange, setRoomsRange, setLandscapes, togglePool, reset } = useVillaFilters()
    const filtered = PROPERTIES.filter((property) => matchesFilters(property, selected))

    return (
        <div className="flex flex-col gap-10 px-(--margine) pt-8">
            <h1 className="text-[104px] leading-[0.9] font-bold tracking-[-0.03em] tablet:text-[length:clamp(56px,10.156vw,104px)]">
                {t('listings.title')}<span className="text-verde-bosco">.</span>
            </h1>

            <VillaFilters
                selected={selected}
                onPriceChange={setPriceRange}
                onRoomsChange={setRoomsRange}
                onLandscapeChange={setLandscapes}
                onTogglePool={togglePool}
                onReset={reset}
                activeCount={activeCount}
                resultCount={filtered.length}
            />

            {filtered.length > 0 ? (
                <ul className="flex flex-col gap-6">
                    {filtered.map((property, i) => (
                        <li key={property.slug}>
                            <VillaCardRow property={property} index={i} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-[16px] text-muschio-grigio">
                    {t('listings.empty')}{' '}
                    <button
                        type="button"
                        onClick={reset}
                        className="font-semibold text-verde-bosco underline decoration-1 underline-offset-4 hover:text-verde-notte"
                    >
                        {t('listings.reset')}
                    </button>
                </p>
            )}
        </div>
    )
}

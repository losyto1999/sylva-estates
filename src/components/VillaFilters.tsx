import { useTranslation } from 'react-i18next'
import { PRICE_BOUNDS, ROOMS_BOUNDS } from '../data/filters'
import type { Selected } from '../data/filters'
import { formatPrice } from '../data/format'
import type { Landscape } from '../data/properties'
import { LandscapeFilter } from './LandscapeFilter'
import { RangeFilter } from './RangeFilter'

interface VillaFiltersProps {
    selected: Selected
    onPriceChange: (min: number | null, max: number | null) => void
    onRoomsChange: (min: number | null, max: number | null) => void
    onLandscapeChange: (landscapes: Landscape[]) => void
    onTogglePool: () => void
    onReset: () => void
    activeCount: number
    resultCount: number
}

const formatRooms = (n: number) => String(n)

/**
 * Pillole per filtrare l'elenco: due intervalli a scelta libera (prezzo, locali), dietro una
 * tendina con "Da"/"A", il paesaggio (tendina a checkbox), più "Con piscina". Si combinano tra loro con AND.
 */
export function VillaFilters({
    selected,
    onPriceChange,
    onRoomsChange,
    onLandscapeChange,
    onTogglePool,
    onReset,
    activeCount,
    resultCount,
}: VillaFiltersProps) {
    const { t } = useTranslation()
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <RangeFilter
                label={t('filters.price')}
                bounds={PRICE_BOUNDS}
                min={selected.priceMin}
                max={selected.priceMax}
                step={10_000}
                format={formatPrice}
                onApply={onPriceChange}
            />

            <RangeFilter
                label={t('filters.rooms')}
                bounds={ROOMS_BOUNDS}
                min={selected.roomsMin}
                max={selected.roomsMax}
                format={formatRooms}
                onApply={onRoomsChange}
            />

            <LandscapeFilter selected={selected.landscape} onChange={onLandscapeChange} />

            <button
                type="button"
                aria-pressed={selected.pool}
                onClick={onTogglePool}
                className={`pill h-11 px-5 text-[14px] font-semibold ${
                    selected.pool ? 'bg-nero-bosco text-pietra-chiara' : 'bg-pietra text-nero-bosco'
                }`}
            >
                {t('filters.pool')}
            </button>

            {activeCount > 0 && (
                <button
                    type="button"
                    onClick={onReset}
                    className="text-[14px] font-semibold text-muschio-grigio underline decoration-1 underline-offset-4 hover:text-nero-bosco"
                >
                    {t('filters.reset')}
                </button>
            )}

            <p aria-live="polite" className="text-[14px] text-muschio-grigio">
                {t('listings.count', { count: resultCount })}
            </p>
        </div>
    )
}

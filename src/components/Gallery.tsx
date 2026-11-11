import { useTranslation } from 'react-i18next'
import type { Property } from '../data/properties'
import { Photo } from './Photo'

// Classi di ogni foto in base a quante sono (al massimo 4), senza lasciare buchi nella griglia 4×2.
// Sotto i 640px la griglia passa a due colonne: le foto larghe in 3:2, le piccole quadrate.
const WIDE = 'mobile:col-span-2 mobile:row-span-1 mobile:h-auto mobile:aspect-[3/2]'
const SMALL = 'mobile:col-span-1 mobile:row-span-1 mobile:h-auto mobile:aspect-square'

const LAYOUTS: Record<number, string[]> = {
    // Una sola foto: tutta la larghezza, alta quanto le due righe (536px).
    1: [`col-span-4 row-span-2 ${WIDE}`],
    2: [`col-span-2 row-span-2 ${WIDE}`, `col-span-2 row-span-2 ${WIDE}`],
    3: [`col-span-2 row-span-2 ${WIDE}`, `col-span-2 ${SMALL}`, `col-span-2 ${SMALL}`],
    4: [`col-span-2 row-span-2 ${WIDE}`, SMALL, SMALL, `col-span-2 ${WIDE}`],
}

interface GalleryProps {
    name: Property['name']
    photos: Property['photos']
    /** Apre a schermo intero tutte le foto della casa (non solo le prime quattro), dalla foto indicata. */
    onOpen: (index: number) => void
}

/**
 * Le prime quattro foto della casa: la prima grande, 2×2. Se ce ne sono altre, l'ultima ha in
 * basso a destra la pillola per vederle tutte. Ogni foto si apre a schermo intero con un clic.
 */
export function Gallery({ name, photos, onOpen }: GalleryProps) {
    const { t } = useTranslation()
    const shown = photos.slice(0, 4)
    const layout = LAYOUTS[shown.length]
    if (!layout) return null

    const lastIndex = shown.length - 1
    const hasMore = photos.length > shown.length

    return (
        <div className="grid grid-cols-4 grid-rows-[260px_260px] gap-4 tablet:grid-rows-[repeat(2,clamp(160px,25.4vw,260px))] mobile:grid-cols-2 mobile:grid-rows-none">
            {shown.map((photo, i) => (
                <div key={photo.src} className={`relative ${layout[i]}`}>
                    <Photo
                        name={name}
                        photo={photo}
                        className="size-full rounded-[28px]"
                    />
                    <button
                        type="button"
                        onClick={() => onOpen(i)}
                        aria-label={t('gallery.open', { index: i + 1, total: photos.length })}
                        className="absolute inset-0 rounded-[28px]"
                    />
                    {hasMore && i === lastIndex && (
                        <button
                            type="button"
                            onClick={() => onOpen(0)}
                            className="pill absolute right-4 bottom-4 h-11 bg-pietra-chiara px-5 text-[14px] font-semibold text-nero-bosco"
                        >
                            {t('gallery.all', { total: photos.length })}
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

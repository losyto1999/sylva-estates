import { Link } from 'react-router-dom'
import { formatPrice } from '../data/format'
import type { Property } from '../data/properties'
import { paths } from '../routes'
import { Photo } from './Photo'

/** Card della fila "Scopri le ville", tutta cliccabile: foto di copertina, nome e prezzo. */
export function VillaCardScroll({ property, decorative = false }: { property: Property; decorative?: boolean }) {
    return (
        <Link
            to={paths.villa(property.slug)}
            tabIndex={decorative ? -1 : undefined}
            aria-hidden={decorative ? true : undefined}
            className="flex w-[380px] shrink-0 grow-0 flex-col gap-4 rounded-[28px] bg-bianco px-3 pt-3 pb-6 mobile:w-[min(380px,calc(100vw_-_80px))]"
        >
            <Photo name={property.name} photo={property.photos[0]} className="h-[300px] w-full rounded-[20px]" />
            <div className="px-3">
                <h3 className="text-[28px] font-semibold">{property.name}</h3>
                <p className="text-[14px] text-muschio-grigio">
                    {formatPrice(property.price)}
                </p>
            </div>
        </Link>
    )
}

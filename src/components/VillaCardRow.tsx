import { Link } from 'react-router-dom'
import { formatPrice } from '../data/format'
import { propertySummary } from '../data/photos'
import type { Property } from '../data/properties'
import { paths } from '../routes'
import { Photo } from './Photo'

interface VillaCardRowProps {
    property: Property
    /** Posizione nell'elenco, da 0: le pari sono verdi con la foto a sinistra, le dispari pietra e rovesciate. */
    index: number
}

export function VillaCardRow({ property, index }: VillaCardRowProps) {
    const even = index % 2 === 0

    return (
        <Link
            to={paths.villa(property.slug)}
            className={`flex gap-3 rounded-[32px] p-3 ${
                even ? 'flex-row bg-verde-bosco text-pietra-chiara' : 'flex-row-reverse bg-pietra text-nero-bosco'
            } tablet:flex-col`}
        >
            {/* La foto riempie tutta l'altezza della card, anche quando il testo la fa crescere oltre i 360px. */}
            <div className="relative min-h-[360px] min-w-0 flex-[3] tablet:min-h-[clamp(220px,35vw,360px)] tablet:flex-none">
                <Photo
                    name={property.name}
                    photo={property.photos[0]}
                    className="absolute inset-0 size-full rounded-[24px]"
                />
            </div>
            <div className="flex min-w-0 flex-[2] flex-col items-start justify-between gap-6 p-8 text-left tablet:flex-none mobile:p-5">
                <h2 className="text-[44px] leading-none font-semibold tablet:text-[length:clamp(30px,4.297vw,44px)]">
                    {property.name}
                </h2>
                <p className="text-[16px] leading-[1.6] opacity-90">{propertySummary(property.slug)}</p>
                <p className="font-display text-[16px] font-semibold">{formatPrice(property.price)} →</p>
            </div>
        </Link>
    )
}

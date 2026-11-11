import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { Territory } from '../data/home'
import { resolvePhoto } from '../data/photos'
import { paths } from '../routes'
import { Photo } from './Photo'

interface TerritoryRowProps {
    territory: Territory
    /** Da 0: le righe 01 e 03 hanno la foto a sinistra, la 02 a destra. */
    index: number
}

export function TerritoryRow({ territory, index }: TerritoryRowProps) {
    const { t } = useTranslation()
    const resolved = resolvePhoto(territory.photo)

    return (
        <div
            className={`flex items-center gap-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} tablet:flex-col tablet:items-stretch`}
        >
            {resolved && (
                <Photo
                    name={resolved.property.name}
                    photo={resolved.photo}
                    className="h-[480px] min-w-0 flex-1 rounded-[32px] tablet:h-[clamp(260px,46.875vw,480px)] tablet:flex-none"
                />
            )}
            <div className="flex min-w-0 flex-1 flex-col items-start gap-5 px-8 tablet:flex-none mobile:px-0">
                <p className="font-display text-[20px] font-semibold text-verde-bosco">
                    {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-[48px] leading-none font-semibold tablet:text-[length:clamp(32px,4.6875vw,48px)]">
                    {t(`territories.${territory.landscape}.title`)}
                </h3>
                <p className="text-[17px] leading-[1.7] text-grafite">{t(`territories.${territory.landscape}.text`)}</p>
                <Link
                    to={`${paths.ville}?paesaggio=${territory.landscape}`}
                    className="pill h-12 bg-nero-bosco px-[22px] text-[15px] font-semibold text-pietra-chiara"
                >
                    {t(`territories.${territory.landscape}.cta`)}
                </Link>
            </div>
        </div>
    )
}

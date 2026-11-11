// Le foto stanno in assets/foto/ e nei dati si scrive solo il nome del file ('casa-1.1.webp'):
// Vite le trova tutte qui sotto e le pubblica con il nome con l'hash.
import { translate as t } from '../i18n/locale'
import type { Photo, Property } from './properties'
import { PROPERTIES } from './properties'

const FILES = import.meta.glob<string>('../assets/foto/*.webp', { eager: true, import: 'default' })

export function photoUrl(src: string) {
    const url = FILES[`../assets/foto/${src}`]
    if (!url && import.meta.env.DEV) console.warn(`Sylva Estates: foto non trovata in assets/foto/: ${src}`)
    return url
}

/** Una foto precisa di una casa, scelta a mano (hero e territori della home). */
export interface PhotoRef {
    slug: Property['slug']
    src: Photo['src']
}

/** La casa e la foto indicate; `null` se nei dati non ci sono più. */
export function resolvePhoto(ref: PhotoRef) {
    const property = PROPERTIES.find((p) => p.slug === ref.slug)
    const photo = property?.photos.find((p) => p.src === ref.src)
    if (!property || !photo) {
        if (import.meta.env.DEV) console.warn(`Sylva Estates: foto ${ref.src} di ${ref.slug} non trovata nei dati`)
        return null
    }
    return { property, photo }
}


/** Cosa mostra la foto, nella lingua attiva: è l'alt e la didascalia nella galleria. Chiave: "casa-1.1.webp" -> `photos.casa-1-1`. */
export const photoAlt = (src: string) => t(`photos.${src.replace('.webp', '').replace('.', '-')}`)

/** Sommario (una frase) e descrizione (paragrafi) di una villa, nella lingua attiva. */
export const propertySummary = (slug: string) => t(`properties.${slug}.summary`)
export const propertyDescription = (slug: string) => t(`properties.${slug}.description`, { returnObjects: true }) as unknown as string[]

/** "Casale delle Querce: la casa vista dall'uliveto…": nome della villa e cosa mostra la foto, come alt. */
export const photoAltText = (name: string, src: string) => {
    const alt = photoAlt(src)
    return `${name}: ${alt.charAt(0).toLowerCase()}${alt.slice(1)}`
}

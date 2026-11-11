import type { Photo as PhotoData, Property } from '../data/properties'
import { photoAltText, photoUrl } from '../data/photos'

interface PhotoProps {
    name: Property['name']
    photo: PhotoData
    /** Solo per le foto della hero: le altre si caricano quando stanno per entrare in vista. */
    eager?: boolean
    className?: string
}

/** Foto di una casa, ritagliata con object-cover. Mentre si carica resta il fondo pietra-scura (sylva.css). */
export function Photo({ name, photo, eager = false, className = '' }: PhotoProps) {
    return (
        <img
            src={photoUrl(photo.src)}
            // Nome della villa e cosa mostra la foto: "Casale delle Querce: la casa vista dall’uliveto…".
            alt={photoAltText(name, photo.src)}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : undefined}
            decoding="async"
            draggable={false}
            className={`object-cover ${className}`}
        />
    )
}

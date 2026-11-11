// Foto scelte a mano per la home (i testi stanno in locales/*.json). Le foto si cambiano qui, indicando casa e file.
import type { PhotoRef } from './photos'
import type { Landscape } from './properties'

export interface Territory {
    /** Paesaggio con cui si apre l'elenco delle ville. Titolo, testo e pulsante stanno nei testi, alla chiave `territories.<landscape>`. */
    landscape: Landscape
    photo: PhotoRef
}

export const HERO_PHOTOS: PhotoRef[] = [
    { slug: 'tenuta-la-sughereta', src: 'casa-8.1.webp' },
    { slug: 'villa-dei-lecci', src: 'casa-6.1.webp' },
]

// I tre territori della specifica: i pulsanti aprono l'elenco già filtrato per quel paesaggio.
export const TERRITORIES: Territory[] = [
    {
        landscape: 'ulivi',
        photo: { slug: 'casale-delle-querce', src: 'casa-1.2.webp' },
    },
    {
        landscape: 'mare',
        photo: { slug: 'villa-della-serra', src: 'casa-5.1.webp' },
    },
    {
        landscape: 'colline',
        photo: { slug: 'tenuta-la-sughereta', src: 'casa-8.2.webp' },
    },
]

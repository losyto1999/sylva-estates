// Foto della pagina Agenzia. I testi (presentazione, passaggi, schede, domande) stanno in locales/*.json, alla chiave
// `agency`. Niente numeri o distanze inventati: i fatti sulle schede vengono dai campi di properties.ts.
import type { PhotoRef } from './photos'

// Tre foto una accanto all'altra, scelte tra le più belle: tramonto sulla tenuta, la villa con la piscina, il mare.
export const AGENCY_HERO_PHOTOS: PhotoRef[] = [
    { slug: 'tenuta-la-sughereta', src: 'casa-8.1.webp' },
    { slug: 'villa-dei-lecci', src: 'casa-6.1.webp' },
    { slug: 'villa-della-serra', src: 'casa-5.1.webp' },
]

// Foto della colonna sinistra di "Come lavoriamo".
export const AGENCY_STEPS_PHOTO: PhotoRef = { slug: 'cascina-dei-tigli', src: 'casa-2.1.webp' }

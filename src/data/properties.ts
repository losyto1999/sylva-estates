// Gli immobili in vendita. Il nome è un nome proprio, uguale in tutte le lingue; sommario, descrizione
// e didascalie delle foto stanno nei testi (locales/*.json).
// Prezzi in euro, superfici in m² commerciali, verde in ettari.
// Le foto sono percorsi relativi ad assets/foto/ (vedi photos.ts), e la prima foto di ogni casa è la copertina.

export interface Photo {
    /** Percorso relativo ad assets/foto/. Cosa mostra la foto (alt e didascalia) sta in locales/*.json, vedi photoAlt. */
    src: string
}

/** Paesaggio in cui sta la villa. Non si mostra da nessuna parte: serve solo al filtro dell'elenco e ai link della home. */
export const LANDSCAPES = ['ulivi', 'mare', 'colline'] as const

export type Landscape = (typeof LANDSCAPES)[number]

export interface Property {
    slug: string
    /** Nome proprio, uguale in tutte le lingue. Sommario e descrizione stanno in locales/*.json, alla chiave `properties.<slug>`. */
    name: string
    /** Uno o più paesaggi (una villa può stare tra gli ulivi e in collina). */
    landscape: Landscape[]
    price: number
    area: number
    /** Locali, non camere: Casale delle Querce ha 9 locali e 4 camere. */
    rooms: number
    bathrooms: number
    /** Se la villa ha la piscina. */
    pool: boolean
    greenHectares: number
    photos: Photo[]
}

export const PROPERTIES: Property[] = [
    {
        slug: 'casale-delle-querce',
        name: 'Casale delle Querce',
        landscape: ['ulivi', 'colline'],
        price: 2_350_000,
        area: 420,
        rooms: 9,
        bathrooms: 4,
        pool: true,
        greenHectares: 3,
        photos: [
            { src: 'casa-1.1.webp' },
            { src: 'casa-1.2.webp' },
            { src: 'casa-1.6.webp' },
            { src: 'casa-1.4.webp' },
            { src: 'casa-1.5.webp' },
            { src: 'casa-1.3.webp' },
        ],
    },
    {
        slug: 'villa-glicine',
        name: 'Villa Glicine',
        landscape: ['colline'],
        price: 3_900_000,
        area: 610,
        rooms: 12,
        bathrooms: 6,
        pool: true,
        greenHectares: 0.8,
        photos: [
            { src: 'casa-13.1.webp' },
            { src: 'casa-13.2.webp' },
            { src: 'casa-13.3.webp' },
            { src: 'casa-13.4.webp' },
            { src: 'casa-13.5.webp' },
            { src: 'casa-13.6.webp' },
        ],
    },
    {
        slug: 'tenuta-la-sughereta',
        name: 'Tenuta La Sughereta',
        landscape: ['colline'],
        price: 6_800_000,
        area: 880,
        rooms: 16,
        bathrooms: 8,
        pool: true,
        greenHectares: 24,
        photos: [
            { src: 'casa-8.1.webp' },
            { src: 'casa-8.2.webp' },
            { src: 'casa-8.3.webp' },
            { src: 'casa-8.4.webp' },
            { src: 'casa-8.5.webp' },
            { src: 'casa-8.6.webp' },
        ],
    },
    {
        slug: 'casa-nel-castagneto',
        name: 'Casa nel Castagneto',
        landscape: ['colline'],
        price: 890_000,
        area: 180,
        rooms: 5,
        bathrooms: 2,
        pool: true,
        greenHectares: 1.5,
        photos: [
            { src: 'casa-4.1.webp' },
            { src: 'casa-4.2.webp' },
            { src: 'casa-4.3.webp' },
            { src: 'casa-4.4.webp' },
            { src: 'casa-4.5.webp' },
            { src: 'casa-4.6.webp' },
        ],
    },
    {
        slug: 'villa-dei-lecci',
        name: 'Villa dei Lecci',
        landscape: ['colline'],
        price: 3_200_000,
        area: 390,
        rooms: 7,
        bathrooms: 5,
        pool: true,
        greenHectares: 1.2,
        photos: [
            { src: 'casa-6.1.webp' },
            { src: 'casa-6.2.webp' },
            { src: 'casa-6.3.webp' },
            { src: 'casa-6.4.webp' },
            { src: 'casa-6.5.webp' },
            { src: 'casa-6.6.webp' },
        ],
    },
    {
        slug: 'podere-ginestra',
        name: 'Podere Ginestra',
        landscape: ['colline'],
        price: 1_450_000,
        area: 340,
        rooms: 8,
        bathrooms: 3,
        pool: false,
        greenHectares: 6,
        photos: [
            { src: 'casa-11.1.webp' },
            { src: 'casa-11.2.webp' },
            { src: 'casa-11.3.webp' },
            { src: 'casa-11.4.webp' },
            { src: 'casa-11.5.webp' },
            { src: 'casa-11.6.webp' },
        ],
    },
    {
        slug: 'cascina-dei-tigli',
        name: 'Cascina dei Tigli',
        landscape: ['ulivi', 'colline'],
        price: 2_800_000,
        area: 950,
        rooms: 18,
        bathrooms: 7,
        pool: true,
        greenHectares: 12,
        photos: [
            { src: 'casa-2.1.webp' },
            { src: 'casa-2.2.webp' },
            { src: 'casa-2.3.webp' },
            { src: 'casa-2.4.webp' },
            { src: 'casa-2.5.webp' },
            { src: 'casa-2.6.webp' },
        ],
    },
    {
        slug: 'villa-della-serra',
        name: 'Villa della Serra',
        landscape: ['mare'],
        price: 2_450_000,
        area: 520,
        rooms: 10,
        bathrooms: 5,
        pool: true,
        greenHectares: 0.6,
        photos: [
            { src: 'casa-5.1.webp' },
            { src: 'casa-5.2.webp' },
            { src: 'casa-5.3.webp' },
            { src: 'casa-5.4.webp' },
            { src: 'casa-5.5.webp' },
            { src: 'casa-5.6.webp' },
        ],
    },
    {
        slug: 'rifugio-del-faggio',
        name: 'Rifugio del Faggio',
        landscape: ['ulivi', 'colline'],
        price: 1_250_000,
        area: 260,
        rooms: 6,
        bathrooms: 3,
        pool: true,
        greenHectares: 2,
        photos: [
            { src: 'casa-9.1.webp' },
            { src: 'casa-9.2.webp' },
            { src: 'casa-9.3.webp' },
            { src: 'casa-9.4.webp' },
            { src: 'casa-9.5.webp' },
            { src: 'casa-9.6.webp' },
        ],
    },
    {
        slug: 'villa-nella-pineta',
        name: 'Villa nella Pineta',
        landscape: ['colline'],
        price: 1_100_000,
        area: 300,
        rooms: 6,
        bathrooms: 4,
        pool: true,
        greenHectares: 0.9,
        photos: [
            { src: 'casa-12.1.webp' },
            { src: 'casa-12.2.webp' },
            { src: 'casa-12.3.webp' },
            { src: 'casa-12.4.webp' },
            { src: 'casa-12.5.webp' },
            { src: 'casa-12.6.webp' },
        ],
    },
    {
        slug: 'masseria-degli-ulivi',
        name: 'Masseria degli Ulivi',
        landscape: ['colline'],
        price: 4_600_000,
        area: 700,
        rooms: 14,
        bathrooms: 9,
        pool: true,
        greenHectares: 8,
        photos: [
            { src: 'casa-10.1.webp' },
            { src: 'casa-10.2.webp' },
            { src: 'casa-10.3.webp' },
            { src: 'casa-10.4.webp' },
            { src: 'casa-10.5.webp' },
            { src: 'casa-10.6.webp' },
        ],
    },
    {
        slug: 'casa-della-limonaia',
        name: 'Casa della Limonaia',
        landscape: ['ulivi', 'colline'],
        price: 1_980_000,
        area: 450,
        rooms: 9,
        bathrooms: 5,
        pool: true,
        greenHectares: 0.4,
        photos: [
            { src: 'casa-7.1.webp' },
            { src: 'casa-7.2.webp' },
            { src: 'casa-7.3.webp' },
            { src: 'casa-7.4.webp' },
            { src: 'casa-7.5.webp' },
            { src: 'casa-7.6.webp' },
        ],
    },
    {
        slug: 'mulino-del-rio',
        name: 'Mulino del Rio',
        landscape: ['colline'],
        price: 1_380_000,
        area: 310,
        rooms: 7,
        bathrooms: 3,
        pool: true,
        greenHectares: 2.5,
        photos: [
            { src: 'casa-3.1.webp' },
            { src: 'casa-3.2.webp' },
            { src: 'casa-3.3.webp' },
            { src: 'casa-3.4.webp' },
            { src: 'casa-3.5.webp' },
            { src: 'casa-3.6.webp' },
        ],
    },
    {
        slug: 'villa-del-pioppeto',
        name: 'Villa del Pioppeto',
        landscape: ['colline'],
        price: 980_000,
        area: 220,
        rooms: 5,
        bathrooms: 3,
        pool: true,
        greenHectares: 1,
        photos: [
            { src: 'casa-14.1.webp' },
            { src: 'casa-14.2.webp' },
            { src: 'casa-14.3.webp' },
            { src: 'casa-14.4.webp' },
            { src: 'casa-14.5.webp' },
            { src: 'casa-14.6.webp' },
        ],
    },
]

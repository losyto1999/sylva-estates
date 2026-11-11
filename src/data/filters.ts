// Filtri della pagina Ville: due intervalli a scelta libera (prezzo, locali), i paesaggi (uno o più) e un parametro secco
// (piscina), tutti combinati con AND. Gli estremi degli intervalli vengono dai dati stessi, non
// da fasce fisse: si aggiornano da soli se cambiano le case in vendita.
import { PROPERTIES } from './properties'
import type { Landscape, Property } from './properties'

export interface Bounds {
    min: number
    max: number
}

const boundsOf = (values: number[]): Bounds => ({ min: Math.min(...values), max: Math.max(...values) })

export const PRICE_BOUNDS = boundsOf(PROPERTIES.map((p) => p.price))
export const ROOMS_BOUNDS = boundsOf(PROPERTIES.map((p) => p.rooms))

export interface Selected {
    priceMin: number | null
    priceMax: number | null
    roomsMin: number | null
    roomsMax: number | null
    landscape: Landscape[]
    pool: boolean
}

export function matchesFilters(property: Property, selected: Selected) {
    if (selected.priceMin !== null && property.price < selected.priceMin) return false
    if (selected.priceMax !== null && property.price > selected.priceMax) return false
    if (selected.roomsMin !== null && property.rooms < selected.roomsMin) return false
    if (selected.roomsMax !== null && property.rooms > selected.roomsMax) return false
    // Dentro il filtro paesaggio basta uno qualsiasi dei selezionati (OR); con gli altri filtri è AND.
    if (selected.landscape.length > 0 && !selected.landscape.some((l) => property.landscape.includes(l))) return false
    if (selected.pool && !property.pool) return false
    return true
}

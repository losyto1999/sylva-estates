import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Selected } from './data/filters'
import { LANDSCAPES } from './data/properties'
import type { Landscape } from './data/properties'

// I filtri dell'elenco vivono nella query string (?prezzoMin=...&localiMax=...&piscina=si):
// sopravvivono al tasto indietro e si possono condividere. Prezzo e locali sono intervalli a scelta
// libera, non un insieme di opzioni fisse.

const PARAMS = {
    priceMin: 'prezzoMin',
    priceMax: 'prezzoMax',
    roomsMin: 'localiMin',
    roomsMax: 'localiMax',
    landscape: 'paesaggio',
    pool: 'piscina',
} as const

function readNumber(params: URLSearchParams, name: string) {
    const raw = params.get(name)
    if (raw === null) return null
    const n = Number(raw)
    return Number.isFinite(n) ? n : null
}

// ?paesaggio=ulivi,colline: valori sconosciuti ignorati, ordine sempre quello di LANDSCAPES.
function readLandscapes(params: URLSearchParams): Landscape[] {
    const values = (params.get(PARAMS.landscape) ?? '').split(',')
    return LANDSCAPES.filter((l) => values.includes(l))
}

export function useVillaFilters() {
    const [params, setParams] = useSearchParams()

    const selected = useMemo<Selected>(
        () => ({
            priceMin: readNumber(params, PARAMS.priceMin),
            priceMax: readNumber(params, PARAMS.priceMax),
            roomsMin: readNumber(params, PARAMS.roomsMin),
            roomsMax: readNumber(params, PARAMS.roomsMax),
            landscape: readLandscapes(params),
            pool: params.get(PARAMS.pool) === 'si',
        }),
        [params],
    )

    const activeCount =
        (selected.priceMin !== null || selected.priceMax !== null ? 1 : 0) +
        (selected.roomsMin !== null || selected.roomsMax !== null ? 1 : 0) +
        (selected.landscape.length > 0 ? 1 : 0) +
        (selected.pool ? 1 : 0)

    // Si parte dall'URL attuale e non da `params`: react-router aggiorna la pagina in una
    // transizione, e con due scritture ravvicinate la seconda basata su `params` cancellerebbe la prima.
    function setRange(next: URLSearchParams, minName: string, maxName: string, min: number | null, max: number | null) {
        if (min === null) next.delete(minName)
        else next.set(minName, String(min))
        if (max === null) next.delete(maxName)
        else next.set(maxName, String(max))
    }

    function setPriceRange(min: number | null, max: number | null) {
        const next = new URLSearchParams(window.location.search)
        setRange(next, PARAMS.priceMin, PARAMS.priceMax, min, max)
        setParams(next, { replace: true })
    }

    function setRoomsRange(min: number | null, max: number | null) {
        const next = new URLSearchParams(window.location.search)
        setRange(next, PARAMS.roomsMin, PARAMS.roomsMax, min, max)
        setParams(next, { replace: true })
    }

    function setLandscapes(landscapes: Landscape[]) {
        const next = new URLSearchParams(window.location.search)
        if (landscapes.length === 0) next.delete(PARAMS.landscape)
        else next.set(PARAMS.landscape, landscapes.join(','))
        setParams(next, { replace: true })
    }

    function togglePool() {
        const next = new URLSearchParams(window.location.search)
        if (next.get(PARAMS.pool) === 'si') next.delete(PARAMS.pool)
        else next.set(PARAMS.pool, 'si')
        setParams(next, { replace: true })
    }

    function reset() {
        setParams({}, { replace: true })
    }

    return { selected, activeCount, setPriceRange, setRoomsRange, setLandscapes, togglePool, reset }
}

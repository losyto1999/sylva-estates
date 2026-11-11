import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { KeyboardEvent, MouseEvent, TouchEvent } from 'react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Photo, Property } from '../data/properties'
import { photoAlt, photoAltText, photoUrl } from '../data/photos'

interface LightboxProps {
    name: Property['name']
    photos: Photo[]
    index: number
    onIndexChange: (index: number) => void
    onClose: () => void
}

/**
 * Tutte le foto della casa, a schermo intero e sfogliabili: si apre da una foto della galleria o dalla pillola. Su mobile la foto occupa tutta la larghezza e si sfoglia strisciando, senza frecce.
 * Un `<dialog>` nativo, così stanno gratis il livello sopra il resto della pagina, il fondo,
 * la chiusura con Esc e il focus intrappolato dentro.
 */
export function Lightbox({ name, photos, index, onIndexChange, onClose }: LightboxProps) {
    const { t } = useTranslation()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        // Guardia per lo StrictMode dello sviluppo, che monta/smonta l'effetto due volte: senza,
        // la seconda showModal() su un <dialog> già aperto lancia un'eccezione.
        if (!dialog.open) dialog.showModal()
        // Mentre è aperta non si scorre la pagina sotto.
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            // Non richiude il <dialog>: lo farebbe anche nel doppio smontaggio dello StrictMode,
            // e la sua chiusura nativa avviserebbe subito la pagina (vedi sotto), richiudendo la
            // lightbox da sola prima che l'effetto rimonti. A toglierla dalla vista basta che
            // lightboxIndex torni null e il componente esca dall'albero.
            document.body.style.overflow = previousOverflow
        }
    }, [])

    // L'evento "close" copre ogni modo di chiudere (Esc, il bottone, il clic sul fondo):
    // avvisa la pagina, che toglie lo stato che tiene aperto il componente.
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        dialog.addEventListener('close', onClose)
        return () => dialog.removeEventListener('close', onClose)
    }, [onClose])

    function go(delta: number) {
        onIndexChange((index + delta + photos.length) % photos.length)
    }

    function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
        if (event.key === 'ArrowRight') go(1)
        if (event.key === 'ArrowLeft') go(-1)
    }

    // Il fondo, cliccabile, è sia il <dialog> sia lo spazio vuoto dentro il contenitore del
    // contenuto (che riempie tutto il <dialog>): un clic vi arriva solo se non ha già colpito un
    // elemento suo dentro (foto, fasce, bottone di chiusura, didascalia), che ha la sua forma e
    // non fa da sfondo a nulla.
    function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
        if (event.target === dialogRef.current || event.target === contentRef.current) dialogRef.current?.close()
    }

    // Striscio orizzontale (solo touch): oltre la soglia, foto precedente o successiva.
    const touchStart = useRef<{ x: number; y: number } | null>(null)
    function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
        const start = touchStart.current
        touchStart.current = null
        if (!start || photos.length < 2) return
        const dx = event.changedTouches[0].clientX - start.x
        const dy = event.changedTouches[0].clientY - start.y
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1)
    }

    const photo = photos[index]
    const multiple = photos.length > 1

    return (
        <dialog
            ref={dialogRef}
            onClick={onBackdropClick}
            onKeyDown={onKeyDown}
            aria-label={t('lightbox.label', { name })}
            // Il fondo è sul <dialog> stesso, non su ::backdrop: i custom property di sylva.css
            // (--nero-bosco) non arrivano in modo affidabile fin lì, essendo fuori dal DOM normale.
            className="fixed inset-0 m-0 h-dvh select-none max-h-none w-dvw max-w-none border-0 bg-nero-bosco p-0"
        >
            <div
                ref={contentRef}
                onTouchStart={(event) => {
                    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
                }}
                onTouchEnd={onTouchEnd}
                className="relative flex h-full flex-col items-center justify-center gap-4 p-4 mobile:gap-3 mobile:px-0"
            >
                <button
                    type="button"
                    onClick={() => dialogRef.current?.close()}
                    aria-label={t('lightbox.close')}
                    className="pill absolute top-4 right-4 z-10 size-11 bg-pietra-chiara/90 text-nero-bosco"
                >
                    <X aria-hidden="true" className="size-5" />
                </button>

                {/* Due fasce ferme ai bordi dello schermo, alte quanto tutta la lightbox: la loro
                    posizione non dipende dalla larghezza della foto (che cambia da una foto
                    all'altra), a differenza di frecce appoggiate al bordo dell'immagine. */}
                {multiple && (
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label={t('lightbox.previous')}
                        className="absolute inset-y-0 left-0 flex w-24 items-center justify-center text-pietra-chiara hover:bg-pietra-chiara/5 mobile:hidden"
                    >
                        <span className="pill size-11 bg-pietra-chiara/10">
                            <ChevronLeft aria-hidden="true" className="size-5" />
                        </span>
                    </button>
                )}

                {/* pointer-events-none: fa da cornice, non da sfondo cliccabile. Vuoto intorno alla
                    foto (i suoi bordi raramente coincidono con quelli, larghi, di questo blocco)
                    conta come fondo: il clic vi passa attraverso, fino al contenitore, che chiude. */}
                <div
                    className={`relative flex min-h-0 w-full flex-1 items-center justify-center pointer-events-none ${multiple ? 'px-24 mobile:px-0' : ''}`}
                >
                    <img
                        key={photo.src}
                        src={photoUrl(photo.src)}
                        alt={photoAltText(name, photo.src)}
                        className="pointer-events-auto size-full bg-transparent object-contain"
                        draggable={false}
                    />
                </div>

                {multiple && (
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label={t('lightbox.next')}
                        className="absolute inset-y-0 right-0 flex w-24 items-center justify-center text-pietra-chiara hover:bg-pietra-chiara/5 mobile:hidden"
                    >
                        <span className="pill size-11 bg-pietra-chiara/10">
                            <ChevronRight aria-hidden="true" className="size-5" />
                        </span>
                    </button>
                )}

                <p className="text-center text-[14px] text-pietra-chiara text-balance">
                    {photoAlt(photo.src)} · {index + 1}/{photos.length}
                </p>
            </div>
        </dialog>
    )
}

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Property } from '../data/properties'
import { VillaCardScroll } from './VillaCardScroll'

const COPIES = [0, 1, 2]
const SWIPE_THRESHOLD = 40

/**
 * Fila "Scopri le ville": infinita, senza scorrimento libero. Le case sono ripetute in tre copie e si
 * avanza di una card per volta con le frecce ai lati (trasparenti finché non ci si passa sopra; sempre
 * visibili sui dispositivi touch, dove si può anche strisciare). Arrivati al bordo della copia centrale
 * si salta, senza animazione, alla stessa posizione nella copia vicina.
 */
export function VillaCarousel({ properties }: { properties: Property[] }) {
    const { t } = useTranslation()
    const count = properties.length
    const trackRef = useRef<HTMLDivElement>(null)
    const [step, setStep] = useState(0)
    const [index, setIndex] = useState(count)
    const [animate, setAnimate] = useState(false)
    const swipe = useRef<{ x: number; done: boolean } | null>(null)

    // Passo = larghezza di una card + spazio: dipende dal viewport, quindi si rimisura.
    useLayoutEffect(() => {
        const measure = () => {
            const cards = trackRef.current?.children
            if (cards && cards.length > 1) {
                setStep((cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft)
            }
        }
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [])

    // Dopo il salto silenzioso l'animazione si riattiva solo al frame successivo.
    useEffect(() => {
        if (animate) return
        const id = requestAnimationFrame(() => setAnimate(true))
        return () => cancelAnimationFrame(id)
    }, [animate, index])

    function go(delta: number) {
        if (!step) return
        // Senza animazione non scatta transitionend: si riallinea subito.
        const next = index + delta
        if (reduce) setIndex(next >= count * 2 ? next - count : next < count ? next + count : next)
        else {
            setAnimate(true)
            setIndex(next)
        }
    }

    function settle() {
        if (index >= count * 2) {
            setAnimate(false)
            setIndex(index - count)
        } else if (index < count) {
            setAnimate(false)
            setIndex(index + count)
        }
    }

    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const arrow =
        'absolute top-[calc(50%-8px)] z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-bianco text-nero-bosco opacity-0 ring-1 ring-pietra transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100 mobile:hidden'

    return (
        <div className="group relative">
            <div
                className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)] mobile:[mask-image:none]"
                style={{ touchAction: 'pan-y' }}
                onPointerDown={(event) => {
                    if (event.pointerType === 'touch') swipe.current = { x: event.clientX, done: false }
                }}
                onPointerMove={(event) => {
                    const s = swipe.current
                    if (!s || s.done) return
                    const dx = event.clientX - s.x
                    if (Math.abs(dx) > SWIPE_THRESHOLD) {
                        s.done = true
                        go(dx < 0 ? 1 : -1)
                    }
                }}
                onPointerUp={() => (swipe.current = null)}
                onPointerCancel={() => (swipe.current = null)}
            >
                {/* I 5px sopra (compensati dal margine negativo) lasciano spazio all'anello di focus. */}
                <div
                    ref={trackRef}
                    onTransitionEnd={(event) => {
                        if (event.target === event.currentTarget) settle()
                    }}
                    className="-mt-[5px] flex gap-5 pt-[5px] pb-4 pl-(--margine)"
                    style={{
                        transform: `translateX(${-index * step}px)`,
                        transition: animate && !reduce ? 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                    }}
                >
                    {COPIES.flatMap((copy) =>
                        properties.map((property) => (
                            <VillaCardScroll key={`${copy}-${property.slug}`} property={property} decorative={copy !== 1} />
                        )),
                    )}
                </div>
            </div>

            <button type="button" aria-label={t('carousel.previous')} onClick={() => go(-1)} className={`${arrow} left-4`}>
                <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
            <button type="button" aria-label={t('carousel.next')} onClick={() => go(1)} className={`${arrow} right-4`}>
                <ChevronRight aria-hidden="true" className="size-6" />
            </button>

            {/* Su mobile niente frecce: la card successiva fa capolino a destra e questa riga dice di strisciare. */}
            <p className="hidden items-center justify-center gap-1 text-[14px] text-muschio-grigio mobile:flex">
                {t('carousel.hint')}
                <ChevronRight aria-hidden="true" className="size-4" />
            </p>
        </div>
    )
}

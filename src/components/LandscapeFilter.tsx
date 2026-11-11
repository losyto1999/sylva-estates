import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LANDSCAPES } from '../data/properties'
import type { Landscape } from '../data/properties'

interface LandscapeFilterProps {
    selected: Landscape[]
    onChange: (landscapes: Landscape[]) => void
}

const VIEWPORT_MARGIN = 16

/**
 * Pillola "Paesaggio" a tendina con una checkbox per paesaggio. Le scelte si applicano subito (niente
 * "Applica": non c'è nulla da digitare) e valgono in OR tra loro.
 */
export function LandscapeFilter({ selected, onChange }: LandscapeFilterProps) {
    const { t } = useTranslation()
    const label = (landscape: Landscape) => t(`landscapes.${landscape}`)
    const [open, setOpen] = useState(false)
    const [shift, setShift] = useState(0)
    const rootRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const panelId = useId()
    const active = selected.length > 0

    // Come RangeFilter: il riquadro resta ancorato alla pillola ma non esce dalla finestra.
    useLayoutEffect(() => {
        if (!open || !panelRef.current) return
        const { left, right } = panelRef.current.getBoundingClientRect()
        const overflowRight = right - (document.documentElement.clientWidth - VIEWPORT_MARGIN)
        setShift(overflowRight > 0 ? -Math.min(overflowRight, left - VIEWPORT_MARGIN) : 0)
    }, [open])

    useEffect(() => {
        if (!open) return
        function onPointerDown(event: PointerEvent) {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
        }
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') setOpen(false)
        }
        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [open])

    function toggle(landscape: Landscape) {
        onChange(selected.includes(landscape) ? selected.filter((l) => l !== landscape) : [...selected, landscape])
    }

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
                className={`pill h-11 gap-1.5 px-5 text-[14px] font-semibold ${
                    active ? 'bg-nero-bosco text-pietra-chiara' : 'bg-pietra text-nero-bosco'
                }`}
            >
                {active ? t('filters.landscapeSelected', { list: selected.map(label).join(', ') }) : t('filters.landscape')}
                <ChevronDown aria-hidden="true" className={`size-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div
                    ref={panelRef}
                    id={panelId}
                    role="group"
                    aria-label={t('filters.landscape')}
                    style={{ transform: shift ? `translateX(${shift}px)` : undefined }}
                    className="absolute top-[calc(100%+8px)] left-0 z-10 w-64 max-w-[calc(100vw-32px)] rounded-[20px] bg-bianco p-3 ring-1 ring-pietra"
                >
                    {LANDSCAPES.map((landscape) => {
                        const checked = selected.includes(landscape)
                        return (
                            <label
                                key={landscape}
                                className="flex h-11 cursor-pointer items-center gap-3 rounded-[10px] px-2 text-[15px] text-nero-bosco hover:bg-pietra-chiara has-focus-visible:outline-2 has-focus-visible:outline-ottone"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggle(landscape)}
                                    className="sr-only"
                                />
                                <span
                                    aria-hidden="true"
                                    className={`flex size-5 shrink-0 items-center justify-center rounded-[6px] border ${
                                        checked
                                            ? 'border-nero-bosco bg-nero-bosco text-pietra-chiara'
                                            : 'border-muschio-grigio bg-bianco'
                                    }`}
                                >
                                    {checked && <Check className="size-3.5" strokeWidth={3} />}
                                </span>
                                {label(landscape)}
                            </label>
                        )
                    })}
                    <button
                        type="button"
                        onClick={() => onChange([])}
                        disabled={!active}
                        className="mt-1 px-2 text-[13px] font-semibold text-muschio-grigio underline decoration-1 underline-offset-4 hover:text-nero-bosco disabled:opacity-40 disabled:hover:text-muschio-grigio"
                    >
                        {t('filters.clear')}
                    </button>
                </div>
            )}
        </div>
    )
}

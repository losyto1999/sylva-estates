import { ChevronDown } from 'lucide-react'
import type { FormEvent } from 'react'
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Bounds } from '../data/filters'

interface RangeFilterProps {
    label: string
    bounds: Bounds
    min: number | null
    max: number | null
    step?: number
    /** Numero -> testo per il campo e per l'etichetta del bottone ("1.500.000 €"). */
    format: (n: number) => string
    onApply: (min: number | null, max: number | null) => void
}

/**
 * Un intervallo a scelta libera (non fasce già pronte), dietro una pillola a tendina: apre un
 * riquadro con "Da"/"A", precompilato agli estremi dei dati quando non c'è ancora un valore.
 */
export function RangeFilter({ label, bounds, min, max, step = 1, format, onApply }: RangeFilterProps) {
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)
    const panelId = useId()
    const active = min !== null || max !== null

    // Clic fuori, o Esc: chiude senza applicare la bozza.
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
                {active ? `${label}: ${format(min ?? bounds.min)} – ${format(max ?? bounds.max)}` : label}
                <ChevronDown aria-hidden="true" className={`size-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Montato solo mentre è aperto: la bozza riparte da sola dai valori attuali a ogni
                apertura, senza un effetto che la risincronizzi. */}
            {open && (
                <RangeFilterPanel
                    panelId={panelId}
                    label={label}
                    bounds={bounds}
                    min={min}
                    max={max}
                    step={step}
                    active={active}
                    onApply={(nextMin, nextMax) => {
                        onApply(nextMin, nextMax)
                        setOpen(false)
                    }}
                    onClear={() => {
                        onApply(null, null)
                        setOpen(false)
                    }}
                />
            )}
        </div>
    )
}

interface RangeFilterPanelProps {
    panelId: string
    label: string
    bounds: Bounds
    min: number | null
    max: number | null
    step: number
    active: boolean
    onApply: (min: number | null, max: number | null) => void
    onClear: () => void
}

const VIEWPORT_MARGIN = 16

function RangeFilterPanel({ panelId, label, bounds, min, max, step, active, onApply, onClear }: RangeFilterPanelProps) {
    const { t } = useTranslation()
    // Le bozze sono testo, così il campo si può svuotare del tutto mentre si scrive una nuova cifra.
    const [minDraft, setMinDraft] = useState(String(min ?? bounds.min))
    const [maxDraft, setMaxDraft] = useState(String(max ?? bounds.max))
    const [submitted, setSubmitted] = useState(false)
    const [shift, setShift] = useState(0)
    const formRef = useRef<HTMLFormElement>(null)

    // Ancorato a sinistra della pillola, poi spostato quanto basta perché resti dentro la finestra.
    useLayoutEffect(() => {
        if (!formRef.current) return
        const { left, right } = formRef.current.getBoundingClientRect()
        const overflowRight = right - (document.documentElement.clientWidth - VIEWPORT_MARGIN)
        if (overflowRight > 0) setShift(-Math.min(overflowRight, left - VIEWPORT_MARGIN))
    }, [])

    const minValue = minDraft.trim() === '' ? null : Number(minDraft)
    const maxValue = maxDraft.trim() === '' ? null : Number(maxDraft)
    const minError = minValue === null ? t('filters.enterNumber') : Number.isNaN(minValue) ? t('filters.invalidNumber') : null
    const maxError = maxValue === null ? t('filters.enterNumber') : Number.isNaN(maxValue) ? t('filters.invalidNumber') : null
    const orderError =
        !minError && !maxError && minValue !== null && maxValue !== null && minValue > maxValue
            ? t('filters.orderError')
            : null
    const showMin = submitted && (minError ?? orderError)
    const showMax = submitted && maxError

    function submit(event: FormEvent) {
        event.preventDefault()
        setSubmitted(true)
        if (minError || maxError || orderError || minValue === null || maxValue === null) return
        // Agli estremi dei dati equivale a "nessun limite": non sporca l'URL con valori impliciti.
        onApply(minValue <= bounds.min ? null : minValue, maxValue >= bounds.max ? null : maxValue)
    }

    const inputClass = (invalid: boolean) =>
        `mt-1 h-11 w-full rounded-[10px] border bg-pietra-chiara px-3 text-[15px] text-nero-bosco placeholder:text-muschio-grigio ${
            invalid ? 'border-[#B3261E]' : 'border-pietra'
        }`

    return (
        <form
            ref={formRef}
            id={panelId}
            onSubmit={submit}
            noValidate
            aria-label={label}
            style={{ transform: shift ? `translateX(${shift}px)` : undefined }}
            className="absolute top-[calc(100%+8px)] left-0 z-10 w-72 max-w-[calc(100vw-32px)] rounded-[20px] bg-bianco p-5 ring-1 ring-pietra"
        >
            <div className="flex items-end gap-3">
                <label className="min-w-0 flex-1">
                    <span className="text-[13px] text-muschio-grigio">{t('filters.from')}</span>
                    <input
                        type="number"
                        inputMode="numeric"
                        min={bounds.min}
                        max={bounds.max}
                        step={step}
                        placeholder={t('filters.enterNumber')}
                        value={minDraft}
                        aria-invalid={Boolean(showMin)}
                        onChange={(event) => setMinDraft(event.target.value)}
                        className={inputClass(Boolean(showMin))}
                    />
                </label>
                <span aria-hidden="true" className="flex h-11 items-center text-muschio-grigio">
                    –
                </span>
                <label className="min-w-0 flex-1">
                    <span className="text-[13px] text-muschio-grigio">{t('filters.to')}</span>
                    <input
                        type="number"
                        inputMode="numeric"
                        min={bounds.min}
                        max={bounds.max}
                        step={step}
                        placeholder={t('filters.enterNumber')}
                        value={maxDraft}
                        aria-invalid={Boolean(showMax)}
                        onChange={(event) => setMaxDraft(event.target.value)}
                        className={inputClass(Boolean(showMax))}
                    />
                </label>
            </div>

            {(showMin || showMax) && (
                <p role="alert" className="mt-2 text-[13px] text-[#B3261E]">
                    {showMin || showMax}
                </p>
            )}

            <div className="mt-4 flex items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={onClear}
                    disabled={!active}
                    className="text-[13px] font-semibold text-muschio-grigio underline decoration-1 underline-offset-4 hover:text-nero-bosco disabled:opacity-40 disabled:hover:text-muschio-grigio"
                >
                    {t('filters.clear')}
                </button>
                <button type="submit" className="pill h-9 bg-nero-bosco px-4 text-[13px] font-semibold text-pietra-chiara">
                    {t('filters.apply')}
                </button>
            </div>
        </form>
    )
}

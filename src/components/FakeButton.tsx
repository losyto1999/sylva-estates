import type { ReactNode } from 'react'

interface FakeButtonProps {
    children: ReactNode
    className?: string
}

/**
 * Pulsante di contatto finto ("Prenota una visita"): ha lo stile completo e si può mettere a fuoco,
 * ma non naviga e non apre niente: il sito non ha un backend.
 */
export function FakeButton({ children, className = '' }: FakeButtonProps) {
    return (
        <button type="button" className={`pill ${className}`}>
            {children}
        </button>
    )
}

import type { KeyboardEvent, ReactNode } from 'react'

// Schede con il pattern ARIA "tabs": la lista e i pannelli sono separati perché nella scheda della villa
// stanno in punti diversi della pagina (i pannelli dentro la griglia con il riquadro laterale).

export interface TabItem {
    id: string
    label: string
}

const tabId = (id: string) => `scheda-${id}`
const panelId = (id: string) => `pannello-${id}`

interface TabListProps {
    label: string
    tabs: TabItem[]
    active: string
    onChange: (id: string) => void
}

/** Frecce, Home e Fine spostano la scheda attiva; con Tab si entra nella scheda attiva e si passa al pannello. */
export function TabList({ label, tabs, active, onChange }: TabListProps) {
    function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        const index = tabs.findIndex((tab) => tab.id === active)
        const moves: Record<string, number> = {
            ArrowRight: index + 1,
            ArrowLeft: index - 1,
            Home: 0,
            End: tabs.length - 1,
        }
        const next = moves[event.key]
        if (next === undefined) return
        event.preventDefault()
        const tab = tabs[(next + tabs.length) % tabs.length]
        onChange(tab.id)
        document.getElementById(tabId(tab.id))?.focus()
    }

    return (
        <div
            role="tablist"
            aria-label={label}
            onKeyDown={onKeyDown}
            className="flex gap-2 self-start rounded-[999px] bg-pietra p-1.5 mobile:max-w-full mobile:overflow-x-auto"
        >
            {tabs.map((tab) => {
                const selected = tab.id === active
                return (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={tabId(tab.id)}
                        aria-selected={selected}
                        aria-controls={panelId(tab.id)}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => onChange(tab.id)}
                        className={`pill h-11 shrink-0 px-[22px] text-[15px] font-semibold ${
                            selected ? 'bg-nero-bosco text-pietra-chiara' : 'bg-transparent text-nero-bosco'
                        }`}
                    >
                        {tab.label}
                    </button>
                )
            })}
        </div>
    )
}

interface TabPanelProps {
    id: string
    active: string
    children: ReactNode
}

/** Tutti i pannelli restano nel DOM (aria-controls punta sempre a qualcosa); quelli non attivi sono hidden. */
export function TabPanel({ id, active, children }: TabPanelProps) {
    return (
        <div role="tabpanel" id={panelId(id)} aria-labelledby={tabId(id)} hidden={id !== active} tabIndex={0}>
            {children}
        </div>
    )
}

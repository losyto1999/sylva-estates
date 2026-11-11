export interface Fact {
    label: string
    value: string
}

/** Card bianca della scheda "Spazi": un dato della casa. Va dentro un <dl>. */
export function FactCard({ fact }: { fact: Fact }) {
    return (
        <div className="rounded-[20px] bg-bianco p-6">
            <dt className="text-[13px] text-muschio-grigio">{fact.label}</dt>
            <dd className="font-display text-[26px] font-semibold">{fact.value}</dd>
        </div>
    )
}

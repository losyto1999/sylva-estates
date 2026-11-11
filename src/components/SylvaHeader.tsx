import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import headerLogo from '../assets/header-logo.webp'
import { SITE } from '../data/site'
import { paths } from '../routes'
import { FakeButton } from './FakeButton'
import { LanguageSwitch } from './LanguageSwitch'

// "Ville" senza `end`: resta attiva anche nella scheda di una villa.
const LINKS = [
    { to: paths.home, key: 'header.home', end: true },
    { to: paths.ville, key: 'header.villas', end: false },
    { to: paths.agenzia, key: 'header.agency', end: false },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-[52px] shrink-0 items-center border-b-[3px] px-5 text-[13px] font-semibold tracking-[0.14em] text-nero-bosco uppercase ${
        isActive ? 'border-verde-bosco' : 'border-transparent'
    }`

export function SylvaHeader() {
    const { t } = useTranslation()
    return (
        <header className="sticky top-0 z-10 bg-pietra-chiara">
            {/* Tre colonne uguali: lingua, logo al centro, prenotazione. Sotto i 640px il bottone di
                prenotazione sparisce; sotto i 375px il logo si rimpicciolisce per stare accanto al selettore.
                Aperta dal portfolio (back:), la pillola fissa "torna al portfolio" occupa l'angolo in alto a
                sinistra: il selettore si sposta a destra di lei e, sotto i 640px, nella terza colonna. */}
            <div className="grid grid-cols-3 items-center px-(--margine) py-4">
                <LanguageSwitch className="justify-self-start back:ml-[max(0px,calc(116px-var(--margine)))] back:mobile:col-start-3 back:mobile:row-start-1 back:mobile:ml-0 back:mobile:justify-self-end" />

                <Link to={paths.home} className="col-start-2 inline-flex min-h-11 items-center justify-self-center">
                    <img
                        src={headerLogo}
                        alt={SITE.name}
                        width={560}
                        height={236}
                        // bg-transparent: sylva.css dà a ogni <img> un fondo pietra-scura per il caricamento,
                        // ma qui si vedrebbe anche a caricamento finito, negli spazi trasparenti del logo.
                        className="h-14 w-auto bg-transparent tablet:h-[length:clamp(43px,5.469vw,56px)] mobile:h-10 narrow:h-[33px]"
                    />
                </Link>

                <FakeButton className="h-12 justify-self-end bg-verde-bosco px-[22px] text-[15px] font-semibold text-pietra-chiara hover:bg-verde-notte mobile:hidden">
                    {t('header.book')}
                </FakeButton>
            </div>

            <nav
                aria-label={t('header.nav')}
                className="flex justify-center gap-4 border-y border-pietra mobile:justify-center-safe mobile:overflow-x-auto mobile:px-(--margine)"
            >
                {LINKS.map((link) => (
                    <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                        {t(link.key)}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}

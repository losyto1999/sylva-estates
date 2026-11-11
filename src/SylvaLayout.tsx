import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SylvaFooter } from './components/SylvaFooter'
import { SylvaHeader } from './components/SylvaHeader'
import { BackToPortfolio } from './portfolio/BackToPortfolio'
import { cameFromPortfolio } from './portfolio/fromPortfolio'

// Con "indietro" il browser rimetterebbe lo scroll di prima dopo lo scrollTo qui sotto, appena la
// pagina torna abbastanza lunga: si riparte sempre dall'alto, anche con avanti e indietro.
history.scrollRestoration = 'manual'

/** Header, pagina e footer, comuni a tutte le pagine. */
export function SylvaLayout() {
    const location = useLocation()
    const [showBack] = useState(cameFromPortfolio)

    // A ogni cambio di *pagina* si riparte dall'alto, o dalla sezione indicata dall'hash
    // (`/agenzia#domande`). "instant" perché `html` ha scroll-behavior: smooth (sylva.css).
    // Solo il pathname conta: i filtri dell'elenco (?prezzoMin=…) cambiano la query string
    // restando sulla stessa pagina, e non devono far saltare lo scroll a ogni clic su una pillola.
    const previousPath = useRef<string | null>(null)
    useEffect(() => {
        if (previousPath.current === location.pathname) return
        previousPath.current = location.pathname
        const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
        if (target) target.scrollIntoView({ behavior: 'instant' })
        else window.scrollTo({ top: 0, behavior: 'instant' })
    }, [location.pathname, location.hash])

    return (
        <div className="sylva-root min-h-screen">
            {showBack && <BackToPortfolio />}
            <SylvaHeader />
            <main>
                <Outlet />
            </main>
            <SylvaFooter />
        </div>
    )
}

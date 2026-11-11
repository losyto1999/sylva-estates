import { Navigate, Route, Routes } from 'react-router-dom'
import { SylvaLayout } from './SylvaLayout'
import { SylvaAgency } from './pages/SylvaAgency'
import { SylvaHome } from './pages/SylvaHome'
import { SylvaListings } from './pages/SylvaListings'
import { SylvaProperty } from './pages/SylvaProperty'

function App() {
    return (
        <Routes>
            <Route element={<SylvaLayout />}>
                <Route index element={<SylvaHome />} />
                <Route path="ville" element={<SylvaListings />} />
                <Route path="ville/:slug" element={<SylvaProperty />} />
                <Route path="agenzia" element={<SylvaAgency />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App

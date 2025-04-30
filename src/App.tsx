import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner.tsx";

const NeonLinesHome = lazy(() => import('./pages/neonLinesHome/NeonLinesHome.tsx' ))
const Poets = lazy (() => import('./pages/poets/Poets.tsx'));
const Collections = lazy (() => import('./pages/collections/Collections.tsx'));
const Sections = lazy (() => import('./pages/sections/Sections.tsx'));
import PoemPage from "./pages/poem/PoemPage.tsx";
const AboutUs = lazy (() => import('./pages/supportPages/AboutUs.tsx'));
const PageNotFound = lazy (() => import('./pages/supportPages/PageNotFound.tsx'));
const PrivacyPolicy = lazy (() => import('./pages/supportPages/PrivacyPolicy.tsx'));
const Terms = lazy (() => import('./pages/supportPages/Terms.tsx'));
const MobileOnly = lazy (() => import('./pages/supportPages/mobileOnly/MobileOnly.tsx'));
const Services = lazy(() => import('./pages/supportPages/services/Consultancy.tsx'));

import './index.css'

const App =() => {
    return (
        <Suspense fallback={<div><LoadingSpinner /></div>}>
            <Router>
                <Routes>
                    <Route path="/" element={<NeonLinesHome />} />
                    <Route path="/poets" element={<Poets />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/sections" element={<Sections />} />
                    <Route path="/poem/:uid/:slug?" element={<PoemPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/mobileOnly" element={<MobileOnly />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </Suspense>
    );
}

export default App;
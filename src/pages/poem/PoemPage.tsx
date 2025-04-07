import React, { lazy } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchPoetDocument } from '../../dataConnections/poetDataLoader.ts';
import { useEffect, useState } from 'react';
import { Poem, Section } from '../../models/poets.ts';
import useWindowResizeThreshold from '../../hooks/useWindowResizeThreshold.ts';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner.tsx';
import TopNavWithHome from '../../components/topNavWithHome/TopNavWithHome.tsx';
import BottomNav from '../../components/bottomNav/BottomNav.tsx';
import DataLoadingError from "../supportPages/DataLoadingError.tsx";
import MobileOnly from "../supportPages/mobileOnly/MobileOnly.tsx";

// Section imports
const Section001 = lazy (() => import('../../poemLogic/poet001/collection001/sections/S001.tsx'));
const Section002 = lazy (() => import('../../poemLogic/poet001/collection001/sections/S002.tsx'));
const Section003 = lazy (() => import('../../poemLogic/poet001/collection001/sections/S003.tsx'));
const Section004 = lazy (() => import('../../poemLogic/poet001/collection001/sections/S004.tsx'));

// Section map
const sectionComponents: Record<string, React.FC<{ poem: Poem }>> = {
    "collection-001-section-001": Section001,
    "collection-001-section-002": Section002,
    "collection-001-section-003": Section003,
    "collection-001-section-004": Section004,
};

const MAX_MOBILE_WIDTH = 768;

function PoemPage() {
    const { uid } = useParams<{ uid: string }>();
    const location = useLocation();
    const [sections, setSections] = useState<Section[]>([]);
    const [poem, setPoem] = useState<Poem | null>(null);
    const [error, setError] = useState<string | null>(null);
    const isMobile = useWindowResizeThreshold(MAX_MOBILE_WIDTH);

    const sectionUid = poem ? `collection-001-section-${poem.uid.split('-')[1]}` : location.state?.sectionUid;

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchPoem = async () => {
            try {
                // Fetch PoetDocument from IndexedDB or API
                const poetDocument = await fetchPoetDocument();

                if (signal.aborted) return;

                if (poetDocument.poet?.collections) {
                    const allSections = poetDocument.poet.collections.flatMap(
                        (collection) => collection.sections
                    );

                    const foundPoem = allSections
                        .flatMap((section) => section.poems)
                        .find((poem) => poem.uid === uid);

                    if (foundPoem) {
                        setPoem(foundPoem);
                        setSections(allSections);
                    } else {
                        setError("PoemPage not found.");
                    }
                } else {
                    setError("No poet data available.");
                }
            } catch (err) {
                console.error("Error fetching poem:", err);
                setError("Failed to fetch poem. Please try again.");
            }
        };
        (async () => {
            await fetchPoem();
        })();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return () => controller.abort();
    }, [uid]);

    if (error) {
        return <div><DataLoadingError/></div>;
    }

    if (!poem) {
        return <div><LoadingSpinner /></div>;
    }

    if (!isMobile && uid !== "poem-004-008") {
        return <div><MobileOnly /></div>;
    }

    const SectionComponent = sectionComponents[sectionUid || ""] || "NotFound";

    return (
        <>
            <TopNavWithHome />
            <SectionComponent key={poem.uid} poem={poem} />
            <BottomNav
                key={sectionUid}
                currentPoemUID={poem.uid}
                sections={sections}
                sectionUid={sectionUid}
            />
        </>
    );
}

export default PoemPage;
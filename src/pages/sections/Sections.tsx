import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { fetchPoetDocument } from '../../dataConnections/poetDataLoader.ts';
import { PoetDocument, Section, Poem } from '../../models/poets.ts';
import useWindowResizeThreshold from '../../hooks/useWindowResizeThreshold.ts';

import HorizontalScrollMenu from '../../components/horizontalScrollMenu/HorizontalScrollMenu.tsx';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner.tsx';
import DataLoadingError from '../supportPages/DataLoadingError.tsx';
import MobileOnly from '../supportPages/mobileOnly/MobileOnly.tsx';
import TopNavWithHome from '../../components/topNavWithHome/TopNavWithHome';

import neonBackground from '/neonBackgroundLandscape.svg'
import styles from './Sections.module.css'

const MAX_MOBILE_WIDTH = 768;

const Sections: React.FC = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [poems, setPoems] = useState<Poem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedSectionUid, setSelectedSectionUid] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const isMobile = useWindowResizeThreshold(MAX_MOBILE_WIDTH);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const loadPoetData = async () => {
            setLoading(true); // Start loading

            try {
                const poetDocument: PoetDocument = await fetchPoetDocument();
                if (signal.aborted) return;

                const fetchedSections = poetDocument.poet.collections?.[0]?.sections || [];
                setSections(fetchedSections);

                const initialSectionUid = location.state?.sectionUid || fetchedSections[0]?.uid || null;

                if (initialSectionUid) {
                    setSelectedSectionUid(initialSectionUid);
                    const selectedSection = fetchedSections.find(sec => sec.uid === initialSectionUid);
                    setPoems(selectedSection ? selectedSection.poems : []);
                } else {
                    setError("No sections available.");
                }
            } catch (err) {
                if (!signal.aborted) return; {
                    console.error("Error loading poet data:", err);
                    setError("Failed to load sections. Please try again later.");
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };
        (async () => {
            await loadPoetData();
        })();
        return () => controller.abort();
    }, [location.state?.sectionUid]);

    if (loading) {
        return <div><LoadingSpinner/></div>;
    }

    if (error) {
        return <div><DataLoadingError/></div>;
    }

    if (!sections || sections.length === 0) {
        return <div><DataLoadingError/></div>;
    }

    if (!isMobile) {
        return <div><MobileOnly/></div>;
    }

    const handleSelectSection = (sectionUid: string) => {
        setSelectedSectionUid(sectionUid);
        const selectedSection = sections.find((section) => section.uid === sectionUid);
        setPoems(selectedSection?.poems || []);
    };

    return (
        <div className={styles.container}>
            <TopNavWithHome />
            <img src={neonBackground} alt="Neon Nation landscape" className={styles.overlay}/>
            <div className={styles.menuWrapper}>
                <HorizontalScrollMenu
                    sections={sections}
                    onSelectSection={handleSelectSection}
                    selectedSectionUid={selectedSectionUid}
                />
            </div>
            <div className={styles.scrollableContent}>
                <div className={styles.poemNameContainer}>
                    <ul>
                        {poems.map((poem) => (
                            <li key={poem.uid}>
                                <Link
                                    to={`/poem/${poem.uid}/${poem.slug}`}
                                    state={{ sectionUid: selectedSectionUid }}
                                >
                                    <div className={styles.poemName}>
                                        <h3>{poem.title}</h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sections;
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Section } from '../../models/poets.ts';
import PaymentModal from '../paymentModal/PaymentModal.tsx';

import next from '/nextNew.svg';
import previous from '/previousNew.svg';

import styles from './BottomNav.module.css';

interface PoemNavigationProps {
    currentPoemUID: string;
    sections: Section[];
    sectionUid: string;
    collectionUid: string;
}

const BottomNav: React.FC<PoemNavigationProps> = ({ currentPoemUID, sections, sectionUid }) => {
    const navigate = useNavigate();
    const [prevPoemUID, setPrevPoemUID] = useState<string | null>(null);
    const [nextPoemUID, setNextPoemUID] = useState<string | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const getAdjacentPoemUID = useCallback((step: number): string | null => {
        if (!sections || !currentPoemUID) return null;

        const match = currentPoemUID.match(/poem-(\d+)-(\d+)/);
        if (!match) return null;

        const sectionId = parseInt(match[1], 10);
        const poemIndex = parseInt(match[2], 10);

        const currentSectionIndex = sections.findIndex(
            (section) => {
                const sectionMatch = section.uid.match(/section-(\d+)/);
                return sectionMatch && parseInt(sectionMatch[1], 10) === sectionId;
            }
        );

        if (currentSectionIndex === -1) {
            return null;
        }

        const currentSection = sections[currentSectionIndex];
        const targetPoemIndex = poemIndex + step;

        if (targetPoemIndex > 0 && targetPoemIndex <= currentSection.poems.length) {
            return `poem-${sectionId.toString().padStart(3, '0')}-${targetPoemIndex
                .toString()
                .padStart(3, '0')}`;
        }

        if (step === 1 && targetPoemIndex > currentSection.poems.length) {
            const isLastSection = currentSectionIndex === sections.length - 1;
            if (!isLastSection) {
                const nextSection = sections[currentSectionIndex + 1];
                const nextSectionId = parseInt(nextSection.uid.match(/section-(\d+)/)?.[1] || '', 10);
                return `poem-${nextSectionId.toString().padStart(3, '0')}-001`;
            } else {
                return null;
            }
        }

        if (step === -1 && poemIndex === 1) {
            const prevSection = sections[currentSectionIndex - 1];
            if (prevSection) {
                const lastPoem = prevSection.poems.length;
                return `poem-${(sectionId - 1).toString().padStart(3, "0")}-${lastPoem.toString().padStart(3, "0")}`;
            }
        }
        return null;
    }, [currentPoemUID, sections]);

    useEffect(() => {
        if (!currentPoemUID || sections.length === 0) return;

        setTimeout(() => {
            setPrevPoemUID(getAdjacentPoemUID(-1));
            setNextPoemUID(getAdjacentPoemUID(1));
        }, 100);
    }, [currentPoemUID, sectionUid, sections.length, getAdjacentPoemUID]);

    const navigateToPoem = (poemUID: string | null) => {

        const atEndOfCollection = currentPoemUID && poemUID === null;

        if (atEndOfCollection) {
            //console.log(`📌 End of collection '${collectionUid}' reached.`);
            setShowPaymentModal(true);
            return;
        }

        if (poemUID) {
            navigate(`/poem/${poemUID}`, { state: { sectionUid } });
        }
    };

    const navigateToSections = (sectionUid: string | null) => {
        navigate("/sections", { state: { sectionUid } });
    };

    return (
        <div className={styles.bottomNavBar} >
            <button className={styles.navButtons}
                    onClick={() => navigateToPoem(prevPoemUID)}
            >
                <img src={previous} alt="Previous Poem" className={styles.navIconPrevious} />
            </button>
            <Link to="/sections"
                  state={{ sectionUid }}>
                <button className={`${styles.navButtons} ${styles.homeButton}`}
                        onClick={() => navigateToSections(sectionUid)}
                >
                </button>
            </Link>
            <button className={styles.navButtons}
                    onClick={() => navigateToPoem(nextPoemUID)}
            >
                <img src={next} alt="Previous Poem" className={styles.navIconNext} />
            </button>
            {showPaymentModal && (
                <PaymentModal
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                />
            )}
        </div>
    );
};

export default BottomNav;
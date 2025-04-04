import React, { useEffect, useRef } from 'react';
import styles from './HorizontalScrollMenu.module.css';
import { Section } from '../../models/poets.ts';

interface HorizontalScrollMenuProps {
    sections: Section[];
    onSelectSection: (sectionUid: string) => void;
    selectedSectionUid: string | null;
}

const HorizontalScrollMenu: React.FC<HorizontalScrollMenuProps> = ({
    sections, onSelectSection,
    selectedSectionUid,
    }) => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!selectedSectionUid) {
            return;
        }
        if (containerRef.current && selectedSectionUid) {
            const selectedElement = containerRef.current.querySelector(
                `[data-section-id="${selectedSectionUid}"]`
            ) as HTMLElement;

            if (selectedElement) {
                selectedElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
            }
        }
    }, [selectedSectionUid]);

    return (
        <div className={styles.scrollContainer} ref={containerRef}>
            <ul className={styles.scrollMenu}>
                {sections.map((section) => (
                    <li
                        key={section.uid}
                        data-section-id={section.uid}
                        className={`${styles.sectionItem} ${
                            section.uid === selectedSectionUid ? styles.active : ""
                        }`}
                        onClick={() => onSelectSection(section.uid)}
                    >
                        <p>{section.name}</p>
                        <h3 className={styles.sectionName}>{section.description}</h3>
                    </li>
                ))}
                <li className={styles.scrollSpacer}></li>
            </ul>
        </div>
    );
};

export default HorizontalScrollMenu;
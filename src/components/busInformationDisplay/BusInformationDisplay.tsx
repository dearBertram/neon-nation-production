import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../../models/poets.ts';
import { fetchPoetDocument } from '../../dataConnections/poetDataLoader.ts';

import './BusInformationDisplay.css';

const DISPLAY_INTERVAL = 4000;

const BusInformationDisplay: React.FC = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const poetDoc = await fetchPoetDocument();
                const allSections = poetDoc.poet.collections.flatMap(col => col.sections);
                const filtered = allSections.filter(section =>
                    section.uid.startsWith('collection-002')
                );
                setSections(filtered);
            } catch (err) {
                console.error('Error loading sections:', err);
            }
        })();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % sections.length);
        }, DISPLAY_INTERVAL);
        return () => clearInterval(interval);
    }, [sections.length]);

    const currentSection = sections[currentIndex];

    return (
        <div className='section-name-display-container'>
            <div className='section-name-roller'>
                <AnimatePresence mode='wait'>
                    {currentSection && (
                        <motion.p
                            key={currentSection.uid}
                            className='section-name'
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 1.4, ease: 'easeInOut' }}
                        >
                            <span className='section-text'>
                                {currentSection.name.replace(/\d+$/, '').trim()}
                            </span>
                            <span className='section-number'>
                                {currentSection.name.match(/\d+$/)?.[0]}
                            </span>
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BusInformationDisplay;
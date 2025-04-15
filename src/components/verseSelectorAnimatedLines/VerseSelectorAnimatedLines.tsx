import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Poem } from '../../models/poets.ts';

import "./VerseSelectorAnimatedLines.css";

interface VerseSelectorProps {
    poem: Poem;
}

const verseOffsets: Record<string, number> = {
    NAIL: 0,
    WINE: 21,
    IRON: 42,
    SOAP: 63,
};

const VerseSelectorAnimatedLines: React.FC<VerseSelectorProps> = ({ poem }) => {
    const [currentVerse, setCurrentVerse] = useState<'NAIL' | 'WINE' | 'IRON' | 'SOAP'>('NAIL');
    const [cooldownActive, setCooldownActive] = useState(false);
    const [glitchedVerseKey, setGlitchedVerseKey] = useState<string | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const glitchResetRef = useRef<NodeJS.Timeout | null>(null);

    const verseKeys = Object.keys(verseOffsets) as Array<"NAIL" | "WINE" | "IRON" | "SOAP">;

    const verses: Record<"NAIL" | "WINE" | "IRON" | "SOAP", string[]> = {
        NAIL: poem.lines.slice(verseOffsets.NAIL, verseOffsets.NAIL + 21),
        WINE: poem.lines.slice(verseOffsets.WINE, verseOffsets.WINE + 21),
        IRON: poem.lines.slice(verseOffsets.IRON, verseOffsets.IRON + 21),
        SOAP: poem.lines.slice(verseOffsets.SOAP, verseOffsets.SOAP + 21),
    };

    useEffect(() => {
        if (!cooldownActive) {
            intervalRef.current = setInterval(() => {
                setCurrentVerse(prev => {
                    const currentIndex = verseKeys.indexOf(prev);
                    return verseKeys[(currentIndex + 1) % verseKeys.length];
                });
            }, 300);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [cooldownActive, verseKeys]);

    const handleSelectVerse = (verseKey: 'NAIL' | 'WINE' | 'IRON' | 'SOAP') => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (glitchResetRef.current) clearTimeout(glitchResetRef.current);

        setCurrentVerse(verseKey);
        setCooldownActive(true);
        setGlitchedVerseKey(verseKey); // Apply glitch effect

        // Reset glitch effect after ~0.5s
        glitchResetRef.current = setTimeout(() => {
            setGlitchedVerseKey(null);
        }, 500);

        // Resume auto-cycling after 20 seconds
        setTimeout(() => {
            setCooldownActive(false);
        }, 15000);
    };

    return (
        <div className='verseSelectorWrapper'>
            <div className='verseLineView'>
                <div className='reflection'></div>
                <motion.div
                    key={currentVerse}
                    className='scrollingTextContainer'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    {verses[currentVerse].map((line, index) => (
                        <p key={index} className={`${poem.uid} poem-line`}>
                            {line}
                        </p>
                    ))}
                </motion.div>
            </div>

            <div className='selectContainer'>
                {verseKeys.map((verseKey) => (
                    <motion.div
                        key={verseKey}
                        className={`selectItem ${currentVerse === verseKey ? 'selected' : ''}`}
                        onClick={() => handleSelectVerse(verseKey)}
                        animate={
                            glitchedVerseKey === verseKey
                                ? {
                                    scale: [1, 0.95, 1.05, 1],
                                    rotate: [0, -2, 2, 0],
                                }
                                : { scale: 1, rotate: 0 }
                        }
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {verseKey}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default VerseSelectorAnimatedLines;
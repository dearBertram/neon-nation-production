import React, { useState, useEffect, useRef } from "react";
import { a } from "@react-spring/web";
import { Poem } from '../../models/poets.ts';

import "./VerseSelectorAnimatedLines.css";

interface VerseSelector2Props {
    poem: Poem;
}

const verseOffsets: Record<string, number> = {
    NAIL: 0,
    WINE: 21,
    IRON: 42,
    SOAP: 63,
};

const VerseSelectorAnimatedLines: React.FC<VerseSelector2Props> = ({ poem }) => {
    const [currentVerse, setCurrentVerse] = useState<"NAIL" | "WINE" | "IRON" | "SOAP">("NAIL");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);


    const verseKeys = Object.keys(verseOffsets) as Array<"NAIL" | "WINE" | "IRON" | "SOAP">;

    const verses: Record<"NAIL" | "WINE" | "IRON" | "SOAP", string[]> = {
        NAIL: poem.lines.slice(verseOffsets.NAIL, verseOffsets.NAIL + 21),
        WINE: poem.lines.slice(verseOffsets.WINE, verseOffsets.WINE + 21),
        IRON: poem.lines.slice(verseOffsets.IRON, verseOffsets.IRON + 21),
        SOAP: poem.lines.slice(verseOffsets.SOAP, verseOffsets.SOAP + 21),
    };

    useEffect(() => {
        timeoutRef.current = setInterval(() => {
            setCurrentVerse((prev) => verseKeys[(verseKeys.indexOf(prev) + 1) % 4]);
        }, 300);

        return () => clearInterval(timeoutRef.current!);
    }, [verseKeys]);

    const handleSelectVerse = (verseType: "NAIL" | "WINE" | "IRON" | "SOAP") => {
        clearInterval(timeoutRef.current!); // Stop auto-scroll
        setCurrentVerse(verseType); // Update selected verse

        // Resume auto-scroll after 10 seconds
        timeoutRef.current = setTimeout(() => {
            setCurrentVerse((prev) => verseKeys[(verseKeys.indexOf(prev) + 1) % 4]);
        }, 20000);
    };

    return (
        <div className='verseSelectorWrapper'>
            <div className="verseLineView">
                <div className="reflection"></div>
                <a.div className="scrollingTextContainer">
                    {verses[currentVerse].map((line, index) => (
                        <p key={index} className={`${poem.uid} poem-line`}>
                            {line}
                        </p>
                    ))}
                </a.div>
            </div>
            <div className="selectContainer">
                {Object.keys(verseOffsets).map((verseKey) => (
                    <div
                        key={verseKey}
                        className={`selectItem ${currentVerse === verseKey ? "selected" : ""}`}
                        onClick={() => handleSelectVerse(verseKey as "NAIL" | "WINE" | "IRON" | "SOAP")}
                    >
                        {verseKey}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerseSelectorAnimatedLines;
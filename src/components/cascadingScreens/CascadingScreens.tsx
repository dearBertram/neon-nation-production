// This wouldn't have been possible without: https://codepen.io/ashmind/pen/newyxy
import React, { useEffect, useState } from "react";
import { Poem } from '../../models/poets.ts';
import beast from '/beast.svg';

import './CascadingScreens.css'

interface CascadingScreenProps {
    poem: Poem;
}

const NUM_TVS = 299;
const IMAGE_COUNT = 3;
const WORD_COUNT = 288;

const CascadingScreens: React.FC<CascadingScreenProps> = ( { poem } ) => {
    const [tvs, setTvs] = useState<{ id: number; left: number; size: number; depth: number; imageIndex: number; word?: string; special?: boolean }[]>([]);
    const [showPoem, setShowPoem] = useState(false);

    useEffect(() => {
        if (showPoem) return;

        const allWords = poem.lines.flatMap((line) => line.split(" "));

        const selectedWords = allWords
            .sort(() => 0.5 - Math.random()) // Shuffle words randomly
            .slice(0, Math.min(WORD_COUNT, allWords.length));

        const newTvs = Array.from({ length: NUM_TVS }).map((_, index) => {
            const depth = Math.random();
            const baseSize = 40
            return {
                id: index,
                left: Math.random() * window.innerWidth,
                size: Math.floor(baseSize + 40 * (1 - depth)), // adjust screen size here
                depth: depth,
                imageIndex: 1 + Math.floor(Math.random() * IMAGE_COUNT),
                word: index < selectedWords.length ? selectedWords[index] : undefined,
            };
        });

        setTvs(newTvs);

        const timer = setTimeout(() => {
            const specialTV = {
                id: NUM_TVS,
                left: Math.random() * window.innerWidth,
                size: 70,
                depth: Math.random(),
                imageIndex: 1 + Math.floor(Math.random() * IMAGE_COUNT),
                special: true, // Marks this as special
            };
            setTvs((prevTvs) => [...prevTvs, specialTV]); // Add special screen after delay
        }, 10000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [poem, showPoem]);

    const handleRevealPoem = () => {
        setShowPoem(true);
    };

    return (
        <>
            <div className={`tv-container ${showPoem ? "fade-out" : ""}`}>
                {!showPoem &&
                    tvs.map(({ id, left, size, depth, imageIndex, word, special }) => (
                    <div
                        key={id}
                        className={`tv ${special ? "special-tv" : ""}`}
                        style={{
                            left: `${left}px`,
                            width: `${1.2 * size}px`,
                            height: `${size}px`,
                            animationDuration: special ? "10s" : `${3 + 6 * depth}s`,
                            opacity: special ? 1 : 0.1 + 0.8 * (1 - depth),
                        }}
                        onClick={special ? handleRevealPoem : undefined}
                    >
                        <div className={`content image-${imageIndex}`} />
                        {word && <div className="word">{word}</div>}
                        {special && <div className="special-content">
                            <img src={beast} className="beast" alt="Wide open jaws"/>
                        </div>}
                    </div>
                ))}

            </div>
            {showPoem && (
                <div className="full-poem">
                    {poem.lines.map((line, index) => (
                        <p key={index} className="poem-line-full">{line}</p>
                    ))}
                </div>
            )}
        </>
    );
};

export default CascadingScreens;
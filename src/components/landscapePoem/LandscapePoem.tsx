import React, { useEffect, useState } from 'react';
import { Poem } from '../../models/poets.ts';

import './LandscapePoem.css'

interface LandscapePoemProps {
    poem: Poem;
}

const LandscapePoem: React.FC<LandscapePoemProps> = ({ poem }) => {
    const [isLandscape, setIsLandscape] = useState<boolean>(
        window.matchMedia("(orientation: landscape)").matches
    );

    const [currentBlock, setCurrentBlock] = useState<number>(0);

    // Define index groups
    const indexBlocks: number[][] = [];
    const totalLines = poem.lines.length;

    if (totalLines > 0) indexBlocks.push([0, 1, 2, 3, 4]);  // First block (0-4)
    if (totalLines > 5) indexBlocks.push([5, 6, 7, 8, 9, 10]); // Second block (5-10)
    for (let i = 11; i < totalLines; i++) {
        indexBlocks.push([i]); // Individual index blocks from 11+
    }

    useEffect(() => {
        const handleOrientationChange = () => {
            setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
        };

        window.addEventListener("resize", handleOrientationChange);

        return () => {
            window.removeEventListener("resize", handleOrientationChange);
        };
    }, []);

    const nextBlock = () => {
        if (currentBlock < indexBlocks.length - 1) {
            setCurrentBlock(currentBlock + 1);
        }
    };

    const prevBlock = () => {
        if (currentBlock > 0) {
            setCurrentBlock(currentBlock - 1);
        }
    };

    return (
        <div className={`${poem.uid} landscape-container`}>
            {isLandscape ? (
                <>
                <div className={`${poem.uid} poem-lines-group`}>
                    {poem.lines.length > 0 ? (
                        indexBlocks[currentBlock].map((index) => (
                            <p key={index} className={`${poem.uid} poem-line`} data-index={index}>
                                {poem.lines[index]}
                            </p>
                        ))
                    ) : (
                        <p className="poem-line">No lines available.</p>
                    )}
                </div>
                    <div className="navigation-bar">
                        <button onClick={prevBlock} disabled={currentBlock === 0} className="nav-button">👆</button>
                        <button onClick={nextBlock} disabled={currentBlock === indexBlocks.length - 1} className="nav-button">👇</button>
                    </div>
                </>
            ) : (
                <div className="rotate-message">
                    <div className='phone'>
                        <div className='message'>
                            Events on rotation
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandscapePoem;
import React, { useEffect, useRef, useState } from 'react';
import { Poem } from '../../models/poets.ts';

import pauseButton from '/pauseButton.svg';
import './MovingPoem.css'

interface MovingPoemProps {
    poem: Poem;
}

const MovingPoem: React.FC<MovingPoemProps> = ({ poem }) => {
    const [duplicatedPoem, setDuplicatedPoem] = useState<string[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!poem || poem.lines.length === 0) return;
        setDuplicatedPoem([...poem.lines, ...poem.lines]); // Duplicate the array
    }, [poem]);

    const handlePress = () => setIsPaused(true);
    const handleRelease = () => setIsPaused(false);

    return (
        <div className="scrollContainer">
            <div className={`scrollWrapper ${isPaused ? "paused" : ""}`}>
                <div className="scrollContent" ref={scrollRef}>
                    {duplicatedPoem.map((line, index) => (
                        <span key={index} className="poem-line">
                    {line} &nbsp;
                    </span>
                    ))}
                </div>
            </div>

            {/* Control Button */}
            <div
                className="pauseControl"
                onMouseDown={handlePress}
                onMouseUp={handleRelease}
                onTouchStart={handlePress}
                onTouchEnd={handleRelease}
            >
                <div className='pauseControlContent'>
                    <img src={pauseButton} className="pauseButton" alt="Wide open jaws"/>
                </div>
            </div>
        </div>
    );
};

export default MovingPoem;

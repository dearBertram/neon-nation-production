import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { loadLinesFlashEffect } from '../../poemLogic/poet001/collection001/sharedUtils.ts';
import paint from '/splat.svg'
import { Poem } from '../../models/poets.ts';

import './SplatNavigation.css';

interface SplatNavigationProps {
    poem: Poem;
}

const SplatNavigation: React.FC<SplatNavigationProps> = ({ poem }) => {
    const controls = useAnimation();

    const handleClick = async () => {
        await controls.start({
            y: 300,
            scale: 8,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 0.5,
            },
        });

        loadLinesFlashEffect(poem.uid);

        await controls.start({
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                mass: 0.5,
            },
        });
    };

    useEffect(() => {
        return () => {
            document.querySelectorAll('.poem-line').forEach((line) => {
                (line as HTMLElement).style.opacity = '1';
                (line as HTMLElement).style.transform = 'none';
            });
        };
    }, [poem.uid]);

    return (
        <>
            <div className={`${poem.uid} poem-lines-group`}>
                {poem.lines.length > 0 ? (
                    poem.lines.map((line, index) => (
                        <p key={index} className={`${poem.uid} poem-line`} data-index={index}>
                            {line}
                        </p>
                    ))
                ) : (
                    <p className='poem-line'>No lines available.</p>
                )}
            </div>
            <div className='splatContainer'>
                <motion.div
                    className='animatedCircle'
                    onClick={handleClick}
                    animate={controls}
                >
                    <img src={paint} alt='Splatter Effect' className='splatterImage' />
                </motion.div>
            </div>
        </>
    );
};

export default SplatNavigation;
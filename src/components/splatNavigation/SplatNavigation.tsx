import React, { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web'
import { loadLinesFlashEffect } from '../../poemLogic/poet001/collection001/sharedUtils.ts';
import paint from '/splat.svg';
import { Poem } from '../../models/poets.ts';

import "./SplatNavigation.css";

interface SplatNavigationProps {
    poem: Poem;
}

const SplatNavigation: React.FC<SplatNavigationProps> = ({ poem }) => {
    const [springs, api] = useSpring(() => ({
        from: { x: 0 },
        config: { tension: 200, friction: 10 }
    }))

    const handleClick = () => {
        api.start({
            from: { x: 0 },
            to: { x: 200 },
        })
        loadLinesFlashEffect(poem.uid)
    };

    useEffect(() => {
        return () => {
            // Cleanup any animations before leaving the page
            document.querySelectorAll(".poem-line").forEach((line) => {
                (line as HTMLElement).style.opacity = "1";
                (line as HTMLElement).style.transform = "none";
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
                    <p className="poem-line">No lines available.</p>
                )}
            </div>
            <div className="splatContainer">
                <animated.div
                className="animatedCircle"
                onClick={() => { handleClick(); }}
                style={springs}
                >
                    <img src={paint} alt="Splatter Effect" className="splatterImage" />
                </animated.div>
            </div>
        </>
    );
};

export default SplatNavigation;
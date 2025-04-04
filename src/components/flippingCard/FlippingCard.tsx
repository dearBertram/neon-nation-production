import React, { useState } from "react";
import { useSpring, a } from '@react-spring/web'
import { Poem } from '../../models/poets.ts';

import "./FlippingCard.css"

interface FlippingCardProps {
    poem: Poem;
}

const FlippingCard: React.FC<FlippingCardProps> = ({ poem }) => {
    const [flipped, setFlipped] = useState(false);
    const [lineIndex, setLineIndex] = useState(0);


    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
        onRest: () => {
            // Only update the lineIndex *after* the flip completes
            if (flipped) {
                setLineIndex((prevIndex) => (prevIndex + 1) % poem.lines.length);
            }
        }
    });

    const handleFlip = () => {
        setFlipped((prev) => !prev);
    };

    return (
        <div className="card-container" onClick={handleFlip}>
            {/* Back side */}
            <a.div className="card front" style={{ opacity: opacity.to((o) => 1 - o), transform }}>
                {poem.lines[lineIndex]}

            </a.div>

            {/* Front side */}
            <a.div
                className="card back"
                style={{ opacity, transform, rotateX: "180deg" }}
            >
                {poem.lines[(lineIndex + 1) % poem.lines.length]}
                <a.div className='backButton'>
                    <div className='backButtonText'>REPEAT</div>
                </a.div>
            </a.div>
        </div>
    );
};

export default FlippingCard
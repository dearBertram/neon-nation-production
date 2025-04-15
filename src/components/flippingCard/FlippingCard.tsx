import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Poem } from "../../models/poets.ts";

import "./FlippingCard.css"

interface FlippingCardProps {
    poem: Poem;
}

const FlippingCard: React.FC<FlippingCardProps> = ({ poem }) => {
    const [flipped, setFlipped] = useState(false);
    const [lineIndex, setLineIndex] = useState(0);

    const handleFlipToBack = () => {
        setFlipped(true);
    };

    const handleFlipToFront = () => {
        setFlipped(false);
        setTimeout(() => {
            setLineIndex((prev) => (prev + 1) % poem.lines.length);
        }, 600); // matches flip duration
    };

    return (
        <div className='card-container' onClick={!flipped ? handleFlipToBack : undefined}>
            <AnimatePresence initial={false}>
                {!flipped ? (
                    <motion.div
                        key='front'
                        className='card front'
                        initial={{ rotateX: 180, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: -180, opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        {poem.lines[lineIndex]}
                    </motion.div>
                ) : (
                    <motion.div
                        key='back'
                        className='card back'
                        initial={{ rotateX: 0, opacity: 0 }}
                        animate={{ rotateX: 180, opacity: 1 }}
                        exit={{ rotateX: 360, opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        {poem.lines[(lineIndex + 1) % poem.lines.length]}
                        <div className='backButton' onClick={handleFlipToFront}>
                            <div className='backButtonText'>REPEAT</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FlippingCard
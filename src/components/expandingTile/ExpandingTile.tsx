//Many thanks to https://codesandbox.io/p/sandbox/q6ffu for the inspiration
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Poem} from '../../models/poets.ts';

import './ExpandingTile.css'

interface ExpandingTileProps {
    poem: Poem;
}

const ExpandingTile: React.FC<ExpandingTileProps> = ( {poem}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className='tiles-wrapper'>
            <motion.div
                className='tiles-container'
                onClick={() => setOpen((prev) => !prev)}
                animate={{
                    width: open ? '100%' : '30%',
                    height: open ? '100%' : '30%',
                    backgroundColor: open ? '#0a0223' : '#20e72e',
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
                <AnimatePresence>
                    {open &&
                        poem.lines.map((line, index) => (
                            <motion.div
                                key={index}
                                className='item'
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                            >
                                <p className='poem-line'>{line}</p>
                            </motion.div>
                        ))}
                </AnimatePresence>

                <div className='button-text-container'>
                    <motion.p className='button-text'>OUT🤬</motion.p>
                    <motion.p className='button-text'>IN</motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default ExpandingTile;
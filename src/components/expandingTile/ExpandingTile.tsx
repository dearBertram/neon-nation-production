//Many thanks to https://codesandbox.io/p/sandbox/q6ffu for the inspiration
import React, { useState } from "react";
import {
    useTransition,
    useSpring,
    useChain,
    config,
    animated,
    useSpringRef,
} from '@react-spring/web'
import { Poem } from '../../models/poets.ts';

import "./ExpandingTile.css"

interface ExpandingTileProps {
    poem: Poem;
}

const ExpandingTile: React.FC<ExpandingTileProps> = ( {poem}) => {
    const [open, set] = useState(false)

    const springApi = useSpringRef()
    const { size, ...rest } = useSpring({
        ref: springApi,
        config: config.stiff,
        from: { size: '30%', background: '#20e72e' },
        to: {
            size: open ? '100%' : '30%',
            background: open ? '#0a0223' : '#20e72e',
        },
    })

    const transApi = useSpringRef()
    const transition = useTransition(open ? poem.lines : [], {
        ref: transApi,
        trail: 400 / poem.lines.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    })

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain(open ? [springApi, transApi] : [transApi, springApi], [
        0,
        open ? 0.1 : 0.6,
    ])

    return (
        <div className="tiles-wrapper">
            <animated.div
                style={{ ...rest, width: size, height: size }}
                className="tiles-container"
                onClick={() => set(open => !open)}
            >
                {transition((style, item, _, index) => (
                    <animated.div
                        key={index}
                        className="item"
                        style={{ ...style, background: item }}
                    >
                        <p className="poem-line">{poem.lines[index]}</p>
                    </animated.div>
                ))}
                <div className="button-text-container">
                    <animated.p className="button-text">OUT🤬</animated.p>
                    <animated.p className="button-text">IN</animated.p>
                </div>
            </animated.div>
        </div>
    );
};

export default ExpandingTile;
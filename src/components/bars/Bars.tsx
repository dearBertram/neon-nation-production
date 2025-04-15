import React, {useState, useEffect } from "react";
import { Poem } from '../../models/poets.ts';

import "./Bars.css";

const MIN_WIDTH = 20
const MAX_WIDTH = 390
const INTERVAL_TIME = 1200; // Change every 2 seconds

interface BarsProps {
        poem: Poem;
}

const Bars: React.FC<BarsProps> = ({ poem }) => {
        const [barWidths, setBarWidths] = useState<number[]>(() =>
            Array.from({ length: 15 }, () =>
                Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH)
            )
        );

        const [activeBar, setActiveBar] = useState<number | null>(null);

        useEffect(() => {
                const interval = setInterval(() => {
                        setBarWidths(
                            Array.from({ length: 15 }, () =>
                                Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH)
                            )
                        );
                }, INTERVAL_TIME);

                return () => clearInterval(interval); // Cleanup on unmount
        }, [activeBar]);

        const handleBarClick = (index: number) => {
                setActiveBar((prevIndex) => (prevIndex === index ? null : index)); // Toggle active bar
        };

        return (
            <div className="bar-scroll-wrapper">
                    <div className="bar-holder">
                            {barWidths.map((width, index) => (
                                <div
                                    key={index}
                                    className={`bar ${activeBar === index ? "active" : ""}`}
                                    style={{ width: `${width}px` }}
                                    onClick={() => handleBarClick(index)}
                                >
                                        {activeBar === index && (
                                            <div className="poem-lines">
                                                    <p>{poem.lines[index * 2] || ""}</p>
                                                    <p>{poem.lines[index * 2 + 1] || ""}</p>
                                            </div>
                                        )}
                                </div>
                            ))}
                    </div>
            </div>
        );
};

export default Bars;

// Many thanks to: https://codepen.io/dazld/pen/npydRK for the inspiration for this one
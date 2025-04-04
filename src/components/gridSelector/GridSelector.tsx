import React, {useState } from "react";
import { Poem } from '../../models/poets.ts';

import fish from '/fishHead.svg'

import "./GridSelector.css"

interface GridSwipeSelectorProps {
    poem: Poem;
}

const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const GridSelector: React.FC<GridSwipeSelectorProps> = ({poem}) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <div className="grid-container">
            <div className="line-view">
                {selectedIndex !== null ? (
                    <>
                        <p>
                            {selectedIndex * 2 < poem.lines.length ? poem.lines[selectedIndex * 2] : ""}
                        </p>
                        <br />
                        <p>
                            {selectedIndex * 2 + 1 < poem.lines.length ? poem.lines[selectedIndex * 2 + 1] : ""}
                        </p>
                    </>
                ) : (
                    <div>
                        <img src={fish} className='fishHead' alt="A fish head in the bin" />
                    </div>
                )}
            </div>

            <nav className="ui-scroll-grid-nav">
                {Array.from({ length: TOTAL_CELLS }).map((_, index) => (
                    <a
                        key={index}
                        href={`#r${Math.floor(index / GRID_SIZE) + 1}-c${(index % GRID_SIZE) + 1}`}
                        title={`Row ${Math.floor(index / GRID_SIZE) + 1}, Cell ${(index % GRID_SIZE) + 1}`}
                        onClick={() => setSelectedIndex(index)}
                    />
                ))}
            </nav>
        </div>
    );
};

export default GridSelector



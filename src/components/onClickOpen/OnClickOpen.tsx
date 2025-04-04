import React from 'react';
import { Poem } from '../../models/poets.ts';

import './OnClickOpen.css'

interface OnClickOpenProps {
    poem: Poem;
}

const OnClickOpen: React.FC<OnClickOpenProps> = ({ poem }) => {

    return (
        <>
            <div className={`${poem.uid} poem-lines-group`}>
                {Array.from({ length: 4 }).map((_, divIndex) => (
                    <div key={divIndex} className={`poem-section section-${divIndex + 1}`}>
                        {poem.lines.slice(divIndex * 5, divIndex * 5 + 5).map((line, index) => {
                            const globalIndex = divIndex * 5 + index + 1; // 1-based index for styling
                            return (
                                <p
                                    key={globalIndex}
                                    className={`${poem.uid} poem-line ${globalIndex % 5 === 0 ? "highlight-line" : ""}`}
                                    data-index={globalIndex}
                                >
                                    {line}
                                </p>
                            );
                        })}
                    </div>
                ))}
            </div>
        </>
    );
};

export default OnClickOpen;
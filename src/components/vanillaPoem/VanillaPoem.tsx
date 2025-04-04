import React, { useEffect } from 'react';
import { Poem } from '../../models/poets.ts';

import "../../poemLogic/poet001/collection001/sections/S001.css";
import "../../poemLogic/poet001/collection001/sections/S002.css";
import "../../poemLogic/poet001/collection001/sections/S003.css";
import "../../poemLogic/poet001/collection001/sections/S004.css";


interface SectionProps {
    poem: Poem;
}

const VanillaPoem: React.FC<SectionProps> = ({ poem }) => {

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
            <h2 className={`${poem.uid} poem-title`}>{poem.title.slice(4)|| "No title provided"}</h2>
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
        </>
    );
};

export default VanillaPoem;
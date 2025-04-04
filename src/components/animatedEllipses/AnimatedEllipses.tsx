import React from "react";
import { displayNextLineInArray } from "../../poemLogic/poet001/collection001/sections/s001Utils.ts";

import "./AnimatedEllipses.css";

const AnimatedEllipses: React.FC<{ poemUid: string }> = ({ poemUid }) => {
    return (
        <div className="wrapper">
            <div className="ellipsesContainer" onClick={() => displayNextLineInArray(poemUid)}>
                <div className="ellipses">.</div>
                <div className="ellipses">.</div>
                <div className="ellipses">.</div>
            </div>
        </div>
    );
};

export default AnimatedEllipses;
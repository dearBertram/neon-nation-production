import React from "react";
import { handleDotClick } from "../../poemLogic/poet001/collection001/sections/s002Utils.ts";

import "./SelectionDots.css"

interface SelectionDotProps {
    poemUid: string;
}

const SelectionDots: React.FC<SelectionDotProps> = ({ poemUid }) => {
    return (
        <div className="dotsWrapper">
            <p className="dotLabelTop">THERE</p>
            <div className="dotContainer">
                {[...Array(10)].map((_, index) => (
                    <div
                        key={index}
                        className="dot"
                        onClick={() => handleDotClick(poemUid, index)} // Pass index
                    ></div>
                ))}
            </div>
            <p className="dotLabelBottom">HERE</p>
        </div>
    );
};

export default SelectionDots;
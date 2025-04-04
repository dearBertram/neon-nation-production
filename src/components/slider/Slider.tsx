import React from "react";
import {animatePoemWithSlider} from "../../poemLogic/poet001/collection001/sections/s002Utils.ts";

import "./Slider.css";

const Slider: React.FC = () => {
    return (
        <div className="slider-container">
            <div className="slider-track"></div>
            <input type="range"
                   min="0"
                   max="5"
                   defaultValue="0"
                   className="slider"
                   id="poemSlider"
                   onChange={() => animatePoemWithSlider("poem-002-001")}
            />
        </div>
    );
};

export default Slider;
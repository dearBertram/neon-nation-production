import React, { useState } from "react";
import { FormControlType } from "../formTypes.ts";

import "./RadioButton.css"

interface RadioButtonProps {
    type: FormControlType;
    label: string;
    onChange: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ type, label, onChange }) => {
    const [showEffect, setShowEffect] = useState(false);

    const handleClick = () => {
        if (showEffect) return; // Prevent multiple clicks

        setShowEffect(true); // Show selection effect

        setTimeout(() => {
            setShowEffect(false); // Hide effect before triggering change
            onChange(); // Calls `handleNext` from `FormHandler`
        }, 2000); // Delay navigation by 1 second
    };

    return (
        <div className={`radio-group ${type}`} onClick={handleClick}>
            <div className="custom-radio-circle">
                {showEffect && <div className="selected-effect"></div>} {/* Selection effect */}
            </div>
            <span className="radio-label">{label}</span>
        </div>
    );
};

export default RadioButton;
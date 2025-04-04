import React, { useState } from "react";
import { FormControlType } from "../formTypes.ts";

import "./CheckBox.css"

interface CheckBoxProps {
    type: FormControlType;
    label: string;
    onChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ type, label, onChange }) => {
    const [showTick, setShowTick] = useState(false);

    const handleClick = () => {
        if (showTick) return; // Prevent multiple clicks

        setShowTick(true); // Show tick animation

        setTimeout(() => {
            setShowTick(false); // Hide tick before triggering change
            onChange(); // Calls `handleNext` from `FormHandler`
        }, 1000); // Delay navigation by 2 seconds
    };


    return (
        <div className={`checkbox-container ${type}`} onClick={handleClick}>
            <label className="checkbox-label">
                <input type="checkbox" readOnly />
                <span className="custom-checkbox">
                    {showTick}
                </span>
                {label}
            </label>
        </div>
    );
};

export default CheckBox;
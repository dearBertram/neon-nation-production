import React from "react";
import { FormControlType } from "../formTypes.ts";

import "./ClickButton.css"

interface ClickButtonProps {
    type: FormControlType; // Enforce the type
    label: string;
    onClick: () => void;
}

const ClickButton: React.FC<ClickButtonProps> = ({ type, label, onClick }) => {
    return (
        <div className="button-container">
            <button className={`click-button ${type}`} onClick={onClick}>
                {label}
            </button>
        </div>

    );
};

export default ClickButton;
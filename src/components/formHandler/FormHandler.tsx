import React, { useState } from "react";
import RadioButton from "./radioButton/RadioButton.tsx";
import ClickButton from "./clickButton/ClickButton.tsx";
import CheckBox from "./checkBox/CheckBox.tsx";
import TextBox from "./textBox/TextBox.tsx";
import DropDown from "./dropDown/DropDown.tsx";
import { FormControlConfig, FormControlType } from "./formTypes.ts";
import { Poem } from '../../models/poets.ts';

import "./FormHandler.css"

interface FormHandlerProps {
    poem: Poem;
}

const FormHandler: React.FC<FormHandlerProps> = ({ poem }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);
    const LINES_PER_STEP = 4

    // Controls which interaction type is shown per poem line
    const formControlsConfig: FormControlConfig[] = [
        { index: 0, type: "click-button" as FormControlType, label: "[H]APPLY" },
        { index: 4, type: "checkbox" as FormControlType, label: "_CERTAIN" },
        { index: 8, type: "radio-button" as FormControlType, label: "PROCEED" },
        { index: 12, type: "text-entry" as FormControlType },
        { index: 16, type: "drop-down" as FormControlType, options: ["No", "Way", "Back"] },
        { index: 20, type: "click-button" as FormControlType, label: "SIGN?" },
        { index: 24, type: "click-button" as FormControlType, label: "SUBMIT" },
    ];

    const handleNext = () => {
        if (currentIndex === 24) {
            setShowThankYou(true);
            return;
        }

        if (currentIndex + LINES_PER_STEP < poem.lines.length) {
            setCurrentIndex((prevIndex) => prevIndex + LINES_PER_STEP);
        }
    };

    const currentControl = formControlsConfig.find((control) => control.index === currentIndex) as FormControlConfig | undefined;

    return (
        <div className="form-container">
            {showThankYou ? (
                <p className="thank-you-message">Thank you for your contribution!</p>
            ) : (
                <>
                {poem.lines.slice(currentIndex, currentIndex + LINES_PER_STEP).map((line, index) => (
                    <p key={index} className="poem-line">
                        {line}
                    </p>
                ))}

            {currentControl?.type === "click-button" && (
                <ClickButton type="click-button" label={currentControl.label || "Continue"} onClick={handleNext} />
            )}

            {currentControl?.type === "radio-button" && (
                <RadioButton
                    type="radio-button"
                    label={currentControl.label || ""}
                    onChange={handleNext}
                />
            )}

            {currentControl?.type === "checkbox" && (
                <CheckBox
                    type={currentControl.type}
                    label={currentControl.label || "Select"}
                    onChange={handleNext}
                />
            )}

            {currentControl?.type === "text-entry" && (
                <TextBox
                    type="text-entry"
                    label={currentControl.label || "Submit"}
                    onSubmit={handleNext}
                />
            )}

            {currentControl?.type === "drop-down" && (
                <DropDown
                    type="drop-down"
                    label={currentControl.label || "Choose an option"}
                    options={currentControl.options || []}
                    onSelect={handleNext}
                />
            )}
                </>
            )}
        </div>
    );
};

export default FormHandler;
import React, { useState } from "react";

import "./TextBox.css"

interface TextBoxProps {
    type: string;
    label: string;
    onSubmit: () => void;
}

const TextBox: React.FC<TextBoxProps> = ({ type, label, onSubmit }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setError(""); // Clear error when user types
    };

    const handleSubmit = () => {
        if (!inputValue.trim()) {
            setError("Can't proceed, no wish!");
        } else {
            onSubmit(); // Move to the next set of lines
        }
    };

    return (
        <div className={`text-box-container ${type}`}>
            <input
                type="text-entry"
                className="text-box-input"
                placeholder="Express your wish..."
                value={inputValue}
                onChange={handleChange}
            />
            <button className="text-box-submit" onClick={handleSubmit}>
                {label}
            </button>
            {error && <p className="text-box-error">{error}</p>}
        </div>
    );
};

export default TextBox;
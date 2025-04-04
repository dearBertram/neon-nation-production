import React, { useState } from "react";

import "./DropDown.css"

interface DropDownProps {
    type: string;
    label: string;
    options: string[];
    onSelect: () => void;
}

const DropDown: React.FC<DropDownProps> = ({ type, label, options, onSelect }) => {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        onSelect(); // Trigger the next lines when a selection is made
    };

    return (
        <div className={`dropdown-container ${type}`}>
            <label className="dropdown-label">{label}</label>
            <select className="dropdown-select" value={selectedValue} onChange={handleChange}>
                <option value="" disabled>The choice is yours</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropDown;
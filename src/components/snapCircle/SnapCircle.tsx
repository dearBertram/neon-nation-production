import React from "react";

import "./SnapCircle.css";

interface SnapCircleProps {
    onClick: () => void; // Function to handle clicks (e.g., load next lines)
}

const SnapCircle: React.FC<SnapCircleProps> = ({ onClick }) => {
    return (
        <div className="snapWrapper" >
            <div className="snapCircle" onClick={onClick}>
            </div>
        </div>
    );
};

export default SnapCircle;
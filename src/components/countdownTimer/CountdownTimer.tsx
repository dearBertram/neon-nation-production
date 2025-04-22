import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';

interface CountdownTimerProps {
    subHeading: string;
}

const TARGET_DATE = new Date('2025-07-05T00:00:00Z').getTime();

const CountdownTimer: React.FC<CountdownTimerProps> = ({ subHeading }) => {
    const [minutesRemaining, setMinutesRemaining] = useState<number>(() =>
        Math.max(0, Math.floor((TARGET_DATE - Date.now()) / 60000))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const newMinutes = Math.max(0, Math.floor((TARGET_DATE - Date.now()) / 60000));
            setMinutesRemaining(newMinutes);
        }, 60000); // Recalculate every 60 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <p className='countdown-timer-text'>
            {subHeading} – {minutesRemaining}min
        </p>
    );
};

export default CountdownTimer;
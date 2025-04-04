import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import leftFoot from '/leftFoot.svg';
import rightFoot from '/rightFoot.svg';

import "./FootstepAnimation.css";

const stepSize = 100; // Movement up Y-axis
const fadeDuration = 700; // Fade duration (ms)
const moveDuration = 500; // Move duration (ms)
const delayBetweenSteps = 500; // Delay between each step (ms)
const maxSteps = 13; // Total steps before reset

const FootstepAnimation: React.FC = () => {
    const [leftY, setLeftY] = useState(0);
    const [rightY, setRightY] = useState(10); // Slight offset for staggered effect
    const [stepCount, setStepCount] = useState(0);
    const [isLeftVisible, setIsLeftVisible] = useState(true);
    const [isRightVisible, setIsRightVisible] = useState(true);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const startAnimation = () => {
            interval = setInterval(() => {
                if (stepCount >= maxSteps) {
                    // **Start reset fade-out**
                    setIsLeftVisible(false);
                    setIsRightVisible(false);

                    setTimeout(() => {
                        // **Reset positions OFF-SCREEN before reappearing**
                        setLeftY(0);
                        setRightY(10);
                        setStepCount(0);
                        setIsResetting(true); // Avoid showing them during reset

                        setTimeout(() => {
                            // **Reappear after reset**
                            setIsLeftVisible(true);
                            setIsRightVisible(true);
                            setIsResetting(false);
                        }, fadeDuration);
                    }, fadeDuration);
                    return;
                }

                setStepCount((prev) => prev + 1);

                if (stepCount % 2 === 0) {
                    // Left footstep
                    setIsLeftVisible(false);
                    setTimeout(() => {
                        setLeftY((prev) => prev - stepSize);
                        setTimeout(() => {
                            setIsLeftVisible(true);
                        }, moveDuration);
                    }, fadeDuration);
                } else {
                    // Right footstep
                    setIsRightVisible(false);
                    setTimeout(() => {
                        setRightY((prev) => prev - stepSize);
                        setTimeout(() => {
                            setIsRightVisible(true);
                        }, moveDuration);
                    }, fadeDuration);
                }
            }, fadeDuration + moveDuration + delayBetweenSteps);
        };

        startAnimation(); // Start the animation

        return () => {
            clearInterval(interval); // ✅ Cleanup: Stops animation when user navigates away
        };
    }, [stepCount]);

    const leftFootSpring = useSpring({
        opacity: isResetting ? 0 : isLeftVisible ? 0.8 : 0,
        transform: `translateY(${leftY}px)`,
        config: { duration: fadeDuration }
    });

    const rightFootSpring = useSpring({
        opacity: isResetting ? 0 : isRightVisible ? 0.8 : 0,
        transform: `translateY(${rightY}px)`,
        config: { duration: fadeDuration }
    });

    return (
        <div className="footstep-container">
            <animated.img src={leftFoot} className="footstep left-foot" style={leftFootSpring} />
            <animated.img src={rightFoot} className="footstep right-foot" style={rightFootSpring} />
        </div>
    );
};

export default FootstepAnimation;
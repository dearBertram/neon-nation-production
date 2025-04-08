import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import leftFoot from "/leftFoot.svg";
import rightFoot from "/rightFoot.svg";

import "./FootstepAnimation.css";

const stepSize = 100; // Movement up Y-axis
const fadeDuration = 700; // Fade duration (ms)
const moveDuration = 500; // Move duration (ms)
const delayBetweenSteps = 500; // Delay between each step (ms)
const maxSteps = 13; // Total steps before reset

const FootstepAnimation: React.FC = () => {
    const [leftY, setLeftY] = useState(0);
    const [rightY, setRightY] = useState(10);
    const [isVisible, setIsVisible] = useState({ left: true, right: true });
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep >= maxSteps) {
                // Fade out both feet
                setIsVisible({ left: false, right: false });

                setTimeout(() => {
                    // Reset positions off-screen
                    setLeftY(0);
                    setRightY(10);
                    setIsResetting(true);

                    setTimeout(() => {
                        // Fade in and restart
                        setIsVisible({ left: true, right: true });
                        setIsResetting(false);
                        currentStep = 0;
                    }, fadeDuration);
                }, fadeDuration);
                return;
            }

            if (currentStep % 2 === 0) {
                // Left footstep
                setIsVisible((prev) => ({ ...prev, left: false }));
                setTimeout(() => {
                    setLeftY((prev) => prev - stepSize);
                    setTimeout(() => {
                        setIsVisible((prev) => ({ ...prev, left: true }));
                    }, moveDuration);
                }, fadeDuration);
            } else {
                // Right footstep
                setIsVisible((prev) => ({ ...prev, right: false }));
                setTimeout(() => {
                    setRightY((prev) => prev - stepSize);
                    setTimeout(() => {
                        setIsVisible((prev) => ({ ...prev, right: true }));
                    }, moveDuration);
                }, fadeDuration);
            }

            currentStep++;
        }, fadeDuration + moveDuration + delayBetweenSteps);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="footstep-container">
            <motion.img
                src={leftFoot}
                className="footstep left-foot"
                initial={false}
                animate={{
                    opacity: isResetting ? 0 : isVisible.left ? 0.8 : 0,
                    y: leftY
                }}
                transition={{
                    opacity: { duration: fadeDuration / 1000, ease: "easeInOut" },
                    y: { duration: moveDuration / 1000, ease: "easeInOut" } }}
            />
            <motion.img
                src={rightFoot}
                className="footstep right-foot"
                initial={false}
                animate={{
                    opacity: isResetting ? 0 : isVisible.right ? 0.8 : 0,
                    y: rightY
                }}
                transition={{
                    opacity: { duration: fadeDuration / 1000, ease: "easeInOut" },
                    y: { duration: moveDuration / 1000, ease: "easeInOut" } }}
            />
        </div>
    );
};

export default FootstepAnimation;
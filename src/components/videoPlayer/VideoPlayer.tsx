import React, { useRef, useState, useEffect } from "react";
import videoFile from '/carsOnTheRoad.mp4';
//Video by Ana Benet: https://www.pexels.com/video/cars-on-the-road-8242990/
import "./VideoPlayer.css";

const VideoPlayer: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [showTrigger, setShowTrigger] = useState(false);
    const [fadeVideoOut, setFadeVideoOut] = useState(false);
    const [hideOverlay, setHideOverlay] = useState(false);
    const [triggerPosition, setTriggerPosition] = useState({ top: '10%', left: '20%' });

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            videoElement.play().catch((error) => {
                console.warn("Autoplay failed:", error);
            });

            const handleTimeUpdate = () => {
                const currentTime = videoElement.currentTime;
                const duration = videoElement.duration;

                if (duration - currentTime <= 3) {
                    setShowTrigger(true);
                } else {
                    setShowTrigger(false);
                }
            };

            videoElement.addEventListener("timeupdate", handleTimeUpdate);

            return () => {
                videoElement.removeEventListener("timeupdate", handleTimeUpdate);
            };
        }
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let moveCount = 0;
        const maxMoves = 3;

        if (showTrigger) {
            const buttonSize = 120;
            const padding = 20;

            const updatePosition = () => {
                const maxTop = window.innerHeight - buttonSize - padding;
                const maxLeft = window.innerWidth - buttonSize - padding;

                const randomTop = Math.floor(Math.random() * maxTop);
                const randomLeft = Math.floor(Math.random() * maxLeft);

                setTriggerPosition({ top: `${randomTop}px`, left: `${randomLeft}px` });
            };

            const finalPosition = () => {
                setTriggerPosition({ top: '70%', left: '80%' });
            };

            updatePosition(); // Start with one random flash
            interval = setInterval(() => {
                moveCount++;
                if (moveCount < maxMoves) {
                    updatePosition();
                } else {
                    clearInterval(interval);
                    finalPosition();
                }
            }, 1500);
        }

        return () => clearInterval(interval);
    }, [showTrigger]);

    useEffect(() => {
        return () => {
            document.body.classList.remove("poemReveal");
        };
    }, []);

    // Handle click on the green circle
    const handleTriggerClick = () => {
        if (videoRef.current) {
            videoRef.current.loop = false; // Stop looping
            videoRef.current.pause(); // Pause the video
            videoRef.current.style.transition = "opacity 2s ease-out"; // Apply fade-out transition
            videoRef.current.style.opacity = "0"; // Start fading
        }

        setFadeVideoOut(true); // Start fading out the video overlay
        setShowTrigger(false); // Hide the trigger button

        setTimeout(() => {
            setHideOverlay(true);
            if (videoRef.current) {
                videoRef.current.style.display = "none";
            }
        }, 2000); // Matches the fade-out duration
    };

    return (
        <div className="videoWrapper">
            <video
                ref={videoRef}
                src={videoFile}
                preload="auto"
                className={`videoBackground ${fadeVideoOut ? "fadeOut" : ""}`}
                autoPlay
                muted
                playsInline
                loop
            />
            {!hideOverlay && <div className="videoOverlay"></div>}

            {showTrigger && !hideOverlay && (
                <div className="videoTrigger"
                     style={{ top: triggerPosition.top, left: triggerPosition.left }}
                     onClick={handleTriggerClick}
                ></div>
            )}
        </div>
    );
};

export default VideoPlayer;
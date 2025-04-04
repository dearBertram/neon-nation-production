import React, { useRef, useState } from "react";
import { handleReadMode } from "../../poemLogic/poet001/collection001/sections/s002Utils.ts";

import audioIcon from "/headphones.svg"
import audioFile from "/neon.mp3";
import "./AudioIcon.css"

interface AudioIconProps {
    poemUid: string;
}

const AudioIcon: React.FC<AudioIconProps> = ({ poemUid }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Handle Play/Pause
    const toggleAudio = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    // Stop pulsing effect when audio ends
    const handleAudioEnd = () => setIsPlaying(false);

    return (
        <div className="audioWrapper">
            <audio ref={audioRef} src={audioFile} preload="auto" onEnded={handleAudioEnd}></audio>
            <div className="audioIcon">
                <img src={audioIcon} className={`audioIcon ${isPlaying ? "playing" : ""}`} onClick={toggleAudio} alt="headphones icon plays audio" />
            </div>
            <p className="instruction">HEAR</p>
            <button className="displayText" onClick={() => handleReadMode(poemUid)}>Read</button>
        </div>
    );
};

export default AudioIcon;
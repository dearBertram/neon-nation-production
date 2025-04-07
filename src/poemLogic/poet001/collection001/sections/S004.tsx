import React, { useEffect } from 'react';
import { Poem } from '../../../../models/poets.ts';
import { handlePoemAnimation } from "../sharedUtils.ts"
import { fadeInAnimation } from "./s001Utils.ts";

import VanillaPoem from '../../../../components/vanillaPoem/VanillaPoem.tsx';
import MovingPoem from '../../../../components/movingPoem/MovingPoem.tsx';
//import FlippingCard from '../../../../components/flippingCard/FlippingCard.tsx';
import CascadingScreens from '../../../../components/cascadingScreens/CascadingScreens.tsx';
import LandscapePoem from '../../../../components/landscapePoem/LandscapePoem.tsx';

import "./S004.css";

interface SectionProps {
    poem: Poem;
}

const Section004: React.FC<SectionProps> = ({ poem }) => {

    useEffect(() => {

        const animationConfig = {
            "poem-004-002": fadeInAnimation,
        };

        handlePoemAnimation(poem.uid, animationConfig);
    }, [poem.uid]);

    return (
        <div className={`${poem.uid} poem-lines-container`}>
            {poem.uid === "poem-004-001" && <MovingPoem poem={poem} />}
            {poem.uid === "poem-004-002" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-004-003" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-004-004" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-004-005" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-004-006" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-004-007" && <CascadingScreens poem={poem}/>}
            {poem.uid === "poem-004-008" && <LandscapePoem poem={poem} />}
        </div>
    );
};

export default Section004;
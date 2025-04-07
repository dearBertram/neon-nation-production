import React, { useEffect }  from 'react';
import { Poem } from '../../../../models/poets.ts';
import { handlePoemAnimation } from '../sharedUtils.ts';
import {
    cycleThroughLines, fadeInAnimation,
    showFirstTwelveLines, showFirstTwentyOneLines,
} from "./s001Utils.ts";

//import VerseSelectorAnimatedLines from '../../../../components/verseSelectorAnimatedLines/VerseSelectorAnimatedLines.tsx';
import AnimatedEllipses from '../../../../components/animatedEllipses/AnimatedEllipses.tsx';
import VanillaPoem from '../../../../components/vanillaPoem/VanillaPoem.tsx';
import GridSelector from '../../../../components/gridSelector/GridSelector.tsx';

import "./S001.css";

interface SectionProps {
    poem: Poem;
}

const Section001: React.FC<SectionProps> = ({ poem }) => {

    useEffect(() => {
        const animationConfig = {
            "poem-001-001": fadeInAnimation,
            "poem-001-002": cycleThroughLines,
            "poem-001-003": showFirstTwelveLines,
            "poem-001-005": showFirstTwentyOneLines,
        };

        handlePoemAnimation(poem.uid, animationConfig);
    }, [poem.uid]);

    return (
        <div className={`${poem.uid} poem-lines-container`}>
            {poem.uid === "poem-001-001" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-001-002" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-001-003" && <GridSelector poem={poem} />}
            {poem.uid === "poem-001-004" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-001-005" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-001-006" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-001-007" && (<><VanillaPoem poem={poem} /><AnimatedEllipses poemUid={poem.uid} /></>)}
            {poem.uid === "poem-001-008" && <VanillaPoem poem={poem} />}
        </div>
    );
};

export default Section001;
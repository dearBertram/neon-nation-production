import React, { useEffect } from 'react';
import { Poem } from '../../../../models/poets.ts';
import {handlePoemAnimation, /*hidePoemLinesOnLoad*/ } from '../sharedUtils.ts';

// less of the bombastic side eye, diagonal glance
import VanillaPoem from '../../../../components/vanillaPoem/VanillaPoem.tsx';
import SplatNavigation from '../../../../components/splatNavigation/SplatNavigation.tsx';
import VideoPlayer from '../../../../components/videoPlayer/VideoPlayer.tsx';
import Carousel from '../../../../components/carousel/Carousel.tsx';
import Bars from '../../../../components/bars/Bars.tsx';
import FootstepAnimation from '../../../../components/footstepAnimation/FootstepAnimation.tsx';
import FormHandler from '../../../../components/formHandler/FormHandler.tsx';
import ExpandingTile from '../../../../components/expandingTile/ExpandingTile.tsx';

import "./S003.css";

interface SectionProps {
    poem: Poem;
}

const Section003: React.FC<SectionProps> = ({ poem }) => {

    useEffect(() => {

        const animationConfig = {
            //"poem-003-001": hidePoemLinesOnLoad,
        };

        handlePoemAnimation(poem.uid, animationConfig);
    }, [poem.uid]);

    return (
        <div className={`${poem.uid} poem-lines-container`}>
            {poem.uid === "poem-003-001" && <SplatNavigation poem={poem}/>}
            {poem.uid === "poem-003-002" && (<><VanillaPoem poem={poem} /><VideoPlayer /></>)}
            {poem.uid === "poem-003-003" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-003-004" && <Carousel poem={poem} />}
            {poem.uid === "poem-003-005" && <Bars poem={poem}/>}
            {poem.uid === "poem-003-006" && <FormHandler poem={poem} />}
            {poem.uid === "poem-003-007" && (<><VanillaPoem poem={poem} /><FootstepAnimation /></>)}
            {poem.uid === "poem-003-008" && <ExpandingTile poem={poem} />}
        </div>
    );
};

export default Section003;

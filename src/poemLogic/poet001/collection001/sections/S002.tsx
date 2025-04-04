import React, { useEffect } from 'react';
import { Poem } from '../../../../models/poets.ts';
import { handlePoemAnimation, hidePoemLinesOnLoad, loadLinesFlashEffect } from '../sharedUtils.ts';
import { animateGreenDivOnClick, animatePoemWithSlider } from './s002Utils.ts';

import VanillaPoem from '../../../../components/vanillaPoem/VanillaPoem.tsx';
import Slider from '../../../../components/slider/Slider.tsx';
import SnapCircle from '../../../../components/snapCircle/SnapCircle.tsx';
import SelectionDots from '../../../../components/selectionDots/SelectionDots.tsx';
import AudioIcon from '../../../../components/audioIcon/AudioIcon.tsx';
import OnClickOpen from '../../../../components/onClickOpen/OnClickOpen.tsx';

import "./S002.css";
import "../../../../pages/poem/PoemPage.css";

interface SectionProps {
    poem: Poem;
}

const Section002: React.FC<SectionProps> = ({ poem }) => {

    useEffect(() => {
        const animationConfig = {
            "poem-002-001": animatePoemWithSlider,
            "poem-002-003": animateGreenDivOnClick,
            "poem-002-004": hidePoemLinesOnLoad,
            "poem-002-006": hidePoemLinesOnLoad,
            "poem-002-008": hidePoemLinesOnLoad,
        };

        handlePoemAnimation(poem.uid, animationConfig);
    }, [poem.uid]);

    return (
        <div className={`${poem.uid} poem-lines-container`}>
            {poem.uid === "poem-002-001" && <><VanillaPoem poem={poem} /><Slider /></>}
            {poem.uid === "poem-002-002" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-002-003" && <OnClickOpen poem={poem} />}
            {poem.uid === "poem-002-004" && <><VanillaPoem poem={poem} /><SnapCircle onClick={() => loadLinesFlashEffect(poem.uid)}/></>}
            {poem.uid === "poem-002-005" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-002-006" && <><VanillaPoem poem={poem} /><SelectionDots poemUid={poem.uid} /></>}
            {poem.uid === "poem-002-007" && <VanillaPoem poem={poem} />}
            {poem.uid === "poem-002-008" && <><VanillaPoem poem={poem} /><AudioIcon poemUid={poem.uid}/></>}
        </div>
    );
};

export default Section002;
import React, { useState, useEffect } from "react";
import { useSprings, animated } from "@react-spring/web";
import { Poem } from '../../models/poets.ts';

import person1 from '/streetCornerSVG/person1.svg'
import person2 from '/streetCornerSVG/person2.svg'
import person3 from '/streetCornerSVG/person3.svg'
import person4 from '/streetCornerSVG/person4.svg'
import person5 from '/streetCornerSVG/person5.svg'
import person6 from '/streetCornerSVG/person6.svg'
import person7 from '/streetCornerSVG/person7.svg'
import person8 from '/streetCornerSVG/person8.svg'
import person9 from '/streetCornerSVG/person9.svg'
import person10 from '/streetCornerSVG/person10.svg'
import person11 from '/streetCornerSVG/person11.svg'
import person12 from '/streetCornerSVG/person12.svg'
import person13 from '/streetCornerSVG/person13.svg'
import person14 from '/streetCornerSVG/person14.svg'
import person15 from '/streetCornerSVG/person15.svg'
import person16 from '/streetCornerSVG/person16.svg'

import "./Carousel.css";

interface CarouselProps {
    poem: Poem;
}

interface Card {
    id: number;
    lines: string[];
    image: string;
}

const cardImages: string[] = [
    person1, person2, person3, person4, person5, person6, person7, person8, person9, person10,
    person11, person12, person13, person14, person15, person16
];

const Carousel: React.FC<CarouselProps> = ({ poem }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showText, setShowText] = useState(false);
    const [allowClick, setAllowClick] = useState(false);

    const displayDuration = 4000;
    const fadeDuration = 1200;

    useEffect(() => {
        if (!poem || !poem.lines.length) return;

        const formattedCards: Card[] = poem.lines.reduce<Card[]>((result, _, index) => {
            if (index % 2 === 0 && poem.lines[index + 1]) {
                result.push({
                    id: index / 2,
                    lines: [poem.lines[index], poem.lines[index + 1]],
                    image: cardImages[index / 2] || person1
                });
            }
            return result;
        }, []);

        setCards(formattedCards);
    }, [poem]);

    useEffect(() => {
        setShowText(true);
        setAllowClick(false); // Prevent clicking while text is visible

        const fadeOutTimer = setTimeout(() => {
            setShowText(false);
            setTimeout(() => setAllowClick(true), fadeDuration);
        }, displayDuration);

        return () => clearTimeout(fadeOutTimer);
    }, [activeIndex]);

    const handleNext = () => {
        if (!allowClick) return;
        setShowText(false);
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % cards.length);

            setTimeout(() => {
                setShowText(true);
            }, 200); // Adjust timing to match transition delay
        }, fadeDuration);
    };

    const springs = useSprings(
        cards.length,
        cards.map((_, i) => ({
            opacity: i === activeIndex ? 1 : 0.3,
            scale: i === activeIndex ? 1 : 0.85,
            zIndex: i === activeIndex ? 10 : 5,
            transform: `translateX(${(i - activeIndex) * 100}px)`,
            config: { mass: 1, tension: 250, friction: 25 },
        }))
    );

    return (
        <div className="carousel-container">
            {springs.map((style, i) => (
                <animated.div
                    key={cards[i].id}
                    className="carousel-card"
                    style={style}
                    onClick={handleNext}
                >
                    <img src={cards[i].image} alt={`Poem Image ${cards[i].id}`} className="card-image" />
                    <div className="card-text" style={{ opacity: showText ? 1 : 0, transition: `opacity ${fadeDuration}ms ease-in-out` }}>
                        <p>{cards[i].lines[0]}</p>
                        <p>{cards[i].lines[1]}</p>
                    </div>
                </animated.div>
            ))}
        </div>
    );
};

export default Carousel;
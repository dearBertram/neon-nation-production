import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

import './Carousel.css';

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

        const formattedCards: Card[] = poem.lines.reduce<Card[]>((acc, _, index) => {
            if (index % 2 === 0 && poem.lines[index + 1]) {
                acc.push({
                    id: index / 2,
                    lines: [poem.lines[index], poem.lines[index + 1]],
                    image: cardImages[index / 2] || person1,
                });
            }
            return acc;
        }, []);

        setCards(formattedCards);
    }, [poem]);

    useEffect(() => {
        setShowText(true);
        setAllowClick(false);

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
            setTimeout(() => setShowText(true), 200);
        }, fadeDuration);
    };

    return (
        <div className="carousel-container">
            {cards.map((card, i) => {
                const isActive = i === activeIndex;

                return (
                    <motion.div
                        key={card.id}
                        className="carousel-card"
                        onClick={handleNext}
                        animate={{
                            opacity: isActive ? 1 : 0.3,
                            scale: isActive ? 1 : 0.85,
                            x: (i - activeIndex) * 100,
                            zIndex: isActive ? 10 : 5,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 25,
                        }}
                    >
                        <img src={card.image} alt={`Poem Image ${card.id}`} className="card-image" />
                        <div
                            className="card-text"
                            style={{
                                opacity: showText ? 1 : 0,
                                transition: `opacity ${fadeDuration}ms ease-in-out`,
                            }}
                        >
                            <p>{card.lines[0]}</p>
                            <p>{card.lines[1]}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default Carousel;
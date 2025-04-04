import React, { useState } from "react";
import { Link } from "react-router-dom";
import useWindowResizeThreshold from '../../hooks/useWindowResizeThreshold.ts';

import TopNavWithHome from '../../components/topNavWithHome/TopNavWithHome.tsx';
import MobileOnly from '../supportPages/mobileOnly/MobileOnly.tsx';
import PaymentModal from '../../components/paymentModal/PaymentModal.tsx';

import face from '/neonPoetFace.svg'
import styles from './SupportPagesStyles.module.css';

const MAX_MOBILE_WIDTH = 768;

const AboutUs: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const isMobile = useWindowResizeThreshold(MAX_MOBILE_WIDTH);

    if (!isMobile) {
        return <div><MobileOnly /></div>;
    }

    return (
        <div className={styles.container}>
            <TopNavWithHome />
            <div className={styles.copy}>
                <h1 className={styles.title}>I say Us…</h1>
                <div className={styles.decorativeIconContainer}>
                    <img src={face} alt="the neon poet" className={styles.decorativeIcon} />
                </div>
                <h3 className={styles.subHeading}>It’s more just me...</h3>
                <p className={styles.description}>
                    ...writing poetry and adding a few extra little touches here and there!
                </p>
                <p className={styles.description}>
                    More of a shack than a studio, Neon Nation aims to take words, add some extra bits, and share them.
                </p>
                <h3 className={styles.subHeading}>Welcome to my platform!</h3>
                <p className={styles.description}>
                    I want poetry to take its place at the heart of the conversation and be a welcome distraction while we all sit around the digital fireplace.
                </p>
                <p className={styles.description}>
                    All the words are Human Intelligence (HI), with inevitable creases included.
                </p>
                <p className={styles.description}>
                    No em dash was AI generated in the making of these poems!
                </p>
                <h3 className={styles.subHeading}>Starting somewhere</h3>
                <p className={styles.description}>
                    In this first collection, I take a bit of typography, add some interaction, and share a few stories from the maze.
                </p>
                <p className={styles.description}>
                    Spend a few minutes, tap around, hopefully you’ll see something you like.
                </p>
                <p className={styles.description}>
                    The pocket edition is made for sharing, pop the links on your favourite platform or just pass your phone round the table!
                </p>
                <h3 className={styles.subHeading}>Agile poetry!</h3>
                <p className={styles.description}>
                    You might see a few things that are not quite as pixel-perfect as all those lovely sites you visit every day. Most of these are intentional little metaphors that you may or may not notice. Some are not intentional… Did I mention it was more of a poetry shack than a studio?
                </p>
                <p className={styles.description}>
                    Like life, it is what it is…
                </p>
                <button className={styles.buttonContainer}>
                    <Link to="/poets" className={styles.button}>Explore</Link>
                </button>
                <p className={styles.description}>
                    If you've seen anything you'd consider worthy of your hard earned ... then please consider making a contribution to the running costs and ongoing development of Neon Lines.
                </p>
                <p className={styles.description}>
                    I would be very grateful and you'd be contributing to a more poetic world!
                </p>
                <p className={styles.description}>
                    Click below to find out how.
                </p>
                <button
                    className={styles.buttonContainer}
                    onClick={() => setModalOpen(true)}
                >
                    <span className={styles.button}>Tell me how</span>
                </button>

                <PaymentModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                />
            </div>
            <div className={styles.contactContainer}>
                <div className={styles.contactCopy}>
                    <h1 className={styles.title}>From I to Us</h1>
                    <h3 className={styles.subHeading}>A platform for poets</h3>
                    <p className={styles.description}>
                        If you have a few lines looking for a place to hang out and if you think you could add a little extra shine, then let's talk.
                    </p>
                    <p className={styles.description}>
                        Poetry isn’t just for reading. It’s for shaping, sharing, and sending out into the world.
                    </p>
                    <button className={styles.buttonContainer}>
                        <a href="mailto:publisher@neonnation.org?subject=Let's%20Talk%20Poetry" className={styles.button}>Get in TOUCH</a>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
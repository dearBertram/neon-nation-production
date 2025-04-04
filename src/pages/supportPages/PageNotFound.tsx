import React from "react";
import { Link } from "react-router-dom";

import TopNavWithHome from '../../components/topNavWithHome/TopNavWithHome.tsx';
import useWindowResizeThreshold from '../../hooks/useWindowResizeThreshold.ts';

import errorIcon from '/404Icon.svg'

import styles from './SupportPagesStyles.module.css';
import MobileOnly from "./mobileOnly/MobileOnly.tsx";

const MAX_MOBILE_WIDTH = 768;

const PageNotFound: React.FC = () => {
    const isMobile = useWindowResizeThreshold(MAX_MOBILE_WIDTH);

    if (!isMobile) {
        return <div><MobileOnly /></div>;
    }

    return (
        <div className={styles.container}>
            <TopNavWithHome />
            <div className={styles.copy}>
                <h1 className={styles.title}>Oh! A 404...</h1>
                <div className={styles.decorativeIconContainer}>
                    <img src={errorIcon} alt="decorative icon" className={styles.decorativeIcon} />
                </div>
                <h3 className={styles.subHeading}>The page might have moved or maybe there's a typo.</h3>
                <p className={styles.description}>
                    Hard to know beyond that.
                </p>
                <button className={styles.buttonContainer}>
                    <Link to="/poets" className={styles.button}>Try this...</Link>
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;
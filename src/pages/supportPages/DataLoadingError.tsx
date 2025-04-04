import React from "react";
import { Link } from "react-router-dom";
import useWindowResizeThreshold from '../../hooks/useWindowResizeThreshold.ts';

//import TopNavWithHome from "../../componenets/topNavWithHome/TopNavWithHome.tsx";
import MobileOnly from "../supportPages/mobileOnly/MobileOnly.tsx";

import styles from './SupportPagesStyles.module.css';

const MAX_MOBILE_WIDTH = 768;

const DataLoadingError: React.FC = () => {
    const isMobile = useWindowResizeThreshold(MAX_MOBILE_WIDTH);

    if (!isMobile) {
        return <div><MobileOnly /></div>;
    }

    return (
        <div className={styles.container}>
            {/*<TopNavWithHome />*/}
            <div className={styles.copy}>
                <h1 className={styles.title}>Missing Poet!</h1>
                <div className={styles.decorativeIconContainer}>
                </div>
                <h3 className={styles.subHeading}>A wandering poet, does inspiration bring..</h3>
                <p className={styles.description}>
                    Please come back later when I'm sure everything will be fine!
                </p>
                <button className={styles.buttonContainer}>
                    <Link to="/" className={styles.button}>Try this...</Link>
                </button>
            </div>
        </div>
    );
};

export default DataLoadingError;
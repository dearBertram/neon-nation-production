import React from "react";
import { Link } from "react-router-dom";
import useWindowResizeThreshold from '../../hooks/useWindowResizeThreshold.ts';

import TopNavWithHome from '../../components/topNavWithHome/TopNavWithHome.tsx';
import MobileOnly from '../supportPages/mobileOnly/MobileOnly.tsx';

import privacy from '/padLock.svg'
import styles from './SupportPagesStyles.module.css';

const MAX_MOBILE_WIDTH = 768;

const PrivacyPolicy: React.FC = () => {
    const isMobile = useWindowResizeThreshold(MAX_MOBILE_WIDTH);

    if (!isMobile) {
        return <div><MobileOnly /></div>;
    }

    return (
        <div className={styles.container}>
            <TopNavWithHome />
            <div className={styles.copy}>
                <h1 className={styles.title}>Poetry, not tracking</h1>
                <div className={styles.decorativeIconContainer}>
                    <img src={privacy} alt="decorative icon" className={styles.decorativeIcon} />
                </div>
                <h3 className={styles.subHeading}>Your privacy matters</h3>
                <p className={styles.description}>
                    At Neon Nation, we respect your privacy and are committed to providing a space where you can explore our poetry freely without intrusive tracking or data collection.
                </p>
                <h3 className={styles.subHeading}>No Cookies, no personal data collection</h3>
                <p className={styles.description}>
                    We do not use cookies or tracking technologies to monitor your activity, store personal data, or build user profiles. Your visit is anonymous, and we do not collect any information that can be used to identify you.
                </p>
                <h3 className={styles.subHeading}>Site performance</h3>
                <p className={styles.description}>
                    To understand how well our site is performing and to improve user experience, we track some analytics data. This helps us track general site usage statistics, such as page views and session duration. However:
                </p>
                <p className={styles.description}>
                    We will not use analytics to collect personal or identifiable information.
                </p>
                <p className={styles.description}>
                    Any data collected will is aggregated and anonymised.
                </p>
                <p className={styles.description}>
                    You will not be targeted for ads, marketing, or any commercial activities based on your visit.
                </p>
                <h3 className={styles.subHeading}>Your rights and data protection</h3>
                <p className={styles.description}>
                    As we do not store or collect any personally identifiable information, there is no data for us to share, sell, or exploit. In accordance with the relevant privacy laws, we ensure that:
                </p>
                <p className={styles.description}>
                    No personal data is processed without explicit consent.
                </p>
                <p className={styles.description}>
                    You can enjoy the site without being monitored or tracked.
                </p>
                <button className={styles.buttonContainer}>
                    <Link to="/poets" className={styles.button}>Explore</Link>
                </button>
            </div>
            <div className={styles.contactContainer}>
                <div className={styles.contactCopy}>
                    <h1 className={styles.title}>Contact Us, well me!</h1>
                    <h3 className={styles.subHeading}>Data protection question</h3>
                    <p className={styles.description}>
                        If you have any concerns or questions regarding privacy and data management on this site, please contact us.
                    </p>
                    <p className={styles.description}>
                        Enjoy the site, knowing that you chose what you share.
                    </p>
                    <p className={styles.description}>
                        Please do share though!
                    </p>
                    <button className={styles.buttonContainer}>
                        <a href="mailto:support@neonnation.org?subject=Let's%20Talk%20Data%20Protection" className={styles.button}>Contact us</a>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
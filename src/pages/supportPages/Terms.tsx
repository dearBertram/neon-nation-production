import React from 'react';
import { Link } from 'react-router-dom';
import useWindowResizeThreshold from '../../hooks/useWindowResizeThreshold.ts';

import TopNavWithHome from '../../components/topNavWithHome/TopNavWithHome.tsx';
import MobileOnly from '../supportPages/mobileOnly/MobileOnly.tsx';

import termsIcon from '/termsIcon.svg'
import styles from './SupportPagesStyles.module.css';

const MAX_MOBILE_WIDTH = 768;

const Terms: React.FC = () => {
    const isMobile = useWindowResizeThreshold(MAX_MOBILE_WIDTH);

    if (!isMobile) {
        return <div><MobileOnly /></div>;
    }

    return (
        <div className={styles.container}>
            <TopNavWithHome />
            <div className={styles.copy}>
                <h1 className={styles.title}>Terms and conditions</h1>
                <div className={styles.decorativeIconContainer}>
                    <img src={termsIcon} alt="decorative icon" className={styles.decorativeIcon} />
                </div>
                <h3 className={styles.subHeading}>Our Services</h3>
                <p className={styles.description}>
                    <a href="https://neonnation.org" target="_blank" rel="noopener noreferrer">neonnation.org</a> provides a platform for exploring and engaging with original literary works. By accessing or using this website, you agree to comply with these Terms and Conditions.
                </p>
                <h3 className={styles.subHeading}>Intellectual Property Rights</h3>
                <p className={styles.description}>
                    All content, including but not limited to text, images, and interactive elements, is the intellectual property of Neon Nation Limited and is protected by copyright and moral rights laws.
                </p>
                <p className={styles.description}>
                    The author retains full moral rights over all creative works.
                </p>
                <p className={styles.description}>
                    You may not claim authorship or modify the material in any way.
                </p>
                <p className={styles.description}>
                    Any reproduction or distribution of the content must be in its original published form and must include proper attribution to the author.
                </p>
                <h3 className={styles.subHeading}>By using this website, you confirm that:</h3>
                <p className={styles.description}>
                    You will respect the integrity of the content and will not alter, edit, or redistribute it in any way that changes its original meaning or presentation.
                </p>
                <p className={styles.description}>
                    You will not use the content for commercial gain without express written permission.
                </p>
                <h3 className={styles.subHeading}>You are strictly prohibited from:</h3>
                <p className={styles.description}>
                    Reformatting, remixing, or adapting any content.
                </p>
                <p className={styles.description}>
                    Using any content for AI training, machine learning, or data mining.
                </p>
                <p className={styles.description}>
                    Republishing material on any platform without written permission.
                </p>
                <h3 className={styles.subHeading}>General terms:</h3>
                <p className={styles.description}>
                    This site may contain links to external sites. We are not responsible for third-party content or privacy policies.
                </p>
                <p className={styles.description}>
                    We reserve the right to update, modify, or discontinue any part of the website at our discretion.
                </p>
                <p className={styles.description}>
                    We do not collect or track user data, except for anonymised performance analytics. No personal data is processed, stored, or shared.
                </p>
                <p className={styles.description}>
                    We reserve the right to terminate access to users who violate these terms.
                </p>
                <p className={styles.description}>
                    We may update these terms periodically. Continued use of the site after updates indicates acceptance of the changes.
                </p>
                <p className={styles.description}>
                    These Terms and Conditions shall be governed by the laws of England.
                </p>
                <p className={styles.description}>
                    Any disputes will be resolved through arbitration or in accordance with the relevant legal framework.
                </p>
                <p className={styles.description}>
                    We strive for accuracy but do not guarantee that all content is error-free.
                </p>
                <p className={styles.description}>
                    The content is provided “as is” without warranties of any kind.
                </p>
                <p className={styles.description}>
                    We are not liable for any losses incurred from the use of this website.
                </p>
                <p className={styles.description}>
                    You agree to indemnify Neon Nation Limited against any claims arising from misuse of the content.
                </p>
                <p className={styles.description}>
                    As per our Privacy Policy, no personally identifiable data is collected.
                </p>
                <p className={styles.description}>
                    If any clause of these Terms is found to be unenforceable, the remainder shall still apply.
                </p>

                <button className={styles.buttonContainer}>
                    <Link to="/poets" className={styles.button}>Explore</Link>
                </button>
            </div>
            <div className={styles.contactContainer}>
                <div className={styles.contactCopy}>
                    <h1 className={styles.title}>Contact Us, well me!</h1>
                    <h3 className={styles.subHeading}>Support</h3>
                    <p className={styles.description}>
                        For any questions or permissions, please contact us.
                    </p>
                    <button className={styles.buttonContainer}>
                        <a href="mailto:support@neonnation.org?subject=Let's%20Talk%20Data%20Protection" className={styles.button}>Contact us</a>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Terms;
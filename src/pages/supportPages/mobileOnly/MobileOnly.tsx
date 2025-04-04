import {Link} from "react-router-dom";

import neonLogo from '/nn_logo_green_bkg_circle.svg';
import fireSide from '/fireSide.svg'

import styles from './MobileOnly.module.css';

function MobileOnly() {
    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <Link to="/lines">
                    <img src={neonLogo} alt="Neon Nation home" className={styles.logo}/>
                </Link>
                <h1 className={styles.linesName}>NEON<span className={styles.neonLine}>_</span>LINES</h1>
                <p className={styles.strapLine}>A MOBILE HOME FOR POETRY</p>
                <p className={styles.bodyText}>Neon Line is designed to be viewed on a mobile.</p>
                <p className={styles.bodyText}>You could resize your browser but why not leave your desk, pick up your phone and visit us from there.</p>
                <p className={styles.bodyText}>Sit and tap a while.</p>
                <div>
                    <p className={styles.footerText}>
                        Words made for sharing, spend a few moments.
                    </p>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.imageContainer}>
                    <img src={fireSide} className={styles.fireSide} alt='Decorative image of an Armadillio next to a fire with an arm chair and an occasional table'/>
                </div>
                <p className={styles.fireSideCaption}>Relax and lean back, better still, find a friend</p>
            </div>

        </div>
    );
}

export default MobileOnly;
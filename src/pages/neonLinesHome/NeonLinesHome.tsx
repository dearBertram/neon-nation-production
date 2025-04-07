import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LandscapeView from '../../components/landscapeView/LandscapeView.tsx';

import neonLogo from '/nn_logo_green_bkg_circle.svg'

import styles from './NeonLinesHome.module.css'

const MAX_MOBILE_WIDTH = 768;

function NeonLinesHome() {
    const [isLandscape, setIsLandscape] = useState(
        window.innerWidth <= MAX_MOBILE_WIDTH &&
        window.matchMedia('(orientation: landscape)').matches
    );

    useEffect(() => {
        const handleOrientationChange = () => {
            const isMobile = window.innerWidth <= MAX_MOBILE_WIDTH;
            const isNowLandscape = window.matchMedia('(orientation: landscape)').matches;
            setIsLandscape(isMobile && isNowLandscape);
        };

        window.addEventListener('resize', handleOrientationChange);
        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleOrientationChange);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

    return (
        <>
            {isLandscape ? (
                <LandscapeView />
            ) : (
                <>
                    <div className={styles.homeContentContainer}>
                        <Link to="/">
                            <img src={neonLogo} alt="Neon Nation home" className={styles.logo}/>
                        </Link>
                        <h1 className={styles.linesName}>NEON<span className={styles.neonLine}>_</span>LINES</h1>
                        <p className={styles.strapLine}>A MOBILE HOME FOR POETRY</p>
                        <Link to="/poets">
                            <h1 className={styles.rotatedEllipse}>...</h1>
                        </Link>
                        <div>
                            <p className={styles.strapLine}>
                                Words made for sharing<br/> Spend a few moments
                            </p>
                        </div>
                        <p className={styles.imprintDetail}>Pocket edition</p>
                    </div>
                </>
            )}
        </>
    )
}

export default NeonLinesHome
import React from 'react';
import neonHome from '/nn_lines_white.svg';

import styles from './TopNavAlternative.module.css';


interface TopNavProps {
    homePath?: string;
}

const TopNavAlternative: React.FC<TopNavProps> = () => {
    return (
        <nav className={styles.topNav}>
                <img className={styles.neonHome} src={neonHome} alt="Neon Nation home"/>
        </nav>
    );
};

export default TopNavAlternative;
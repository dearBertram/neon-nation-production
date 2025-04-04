import React from 'react';
import styles from './LoadingSpinner.module.css'


// Courtesy of : https://codepen.io/cosmo9x/pen/RwGRxoy

const LoadingSpinner: React.FC = () => {
    return (
        <div className={styles.loader}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default LoadingSpinner;
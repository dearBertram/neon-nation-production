import styles from './LandscapeView.module.css'

const LandscapeView = () => {
    return (
        <div className={styles.rotateMessage}>
            <div className={styles.phone}>
                <div className={styles.message}>
                    Events on rotation
                </div>
            </div>
        </div>
    )
};

export default LandscapeView;
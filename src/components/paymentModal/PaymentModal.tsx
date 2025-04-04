import React from 'react'

import styles from './PaymentModal.module.css'
import StripePaymentButton from "../stripePaymentButton/StripePaymentButton.tsx";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles.title}>SUPPORT</h3>
                <h2 className={styles.name}>NEON<span className={styles.neonLine}>_</span>LINES</h2>
                <p className={styles.description}>
                    If you've made it this far, <span className={styles.boldText}>THANK YOU!</span>
                </p>
                <p className={styles.description}>
                    If you enjoyed your visit, please consider a small contribution to help with the running costs and ongoing development of <span className={styles.boldText}>NEON LINES.</span>
                </p>
                <p className={styles.description}>
                    Your support helps me keep making and sharing poetry and discovering even more voices with words worth sharing.
                </p>
                <p className={styles.description}>
                    Thanks again!
                </p>
                <p className={styles.description}>
                    Stuart : <span className={styles.neonPoet}>Neon Poet...</span>
                </p>
                <div className={styles.buttonContainer}>
                    <div>
                        <StripePaymentButton />
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
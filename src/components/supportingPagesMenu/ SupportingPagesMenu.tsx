import React from "react";
import { Link } from "react-router-dom";

import about from '/about.svg'
import terms from '/terms.svg'
import privacy from '/privacy.svg'

import styles from './ SupportingPagesMenu.module.css'

interface SupportingPagesMenuProps {
    onClose: () => void; // ✅ Function to close the menu
}

const SupportingPagesMenu: React.FC<SupportingPagesMenuProps> = ({ onClose }) => {
    return (
        <nav className={styles.menuContainer}>
            <button className={styles.closeButton} onClick={onClose}>&times;</button>
            <ul className={styles.menuList}>
                <li className={styles.menuItem}>
                    <Link to="/about" className={styles.menuLink}>
                        <img src={about} alt="About Us" className={styles.menuIcon} />
                        <span className={styles.menuText}>About Us</span>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link to="/terms" className={styles.menuLink}>
                        <img src={terms} alt="Terms & Conditions" className={styles.menuIcon} />
                        <span className={styles.menuText}>Terms & Conditions</span>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link to="/privacy" className={styles.menuLink}>
                        <img src={privacy} alt="Privacy Policy" className={styles.menuIcon} />
                        <span className={styles.menuText}>Privacy Policy</span>
                    </Link>
                </li>
            </ul>
            <div className={styles.copyright}>© {new Date().getFullYear()} neon nation limited</div>
        </nav>
    )
}

export default SupportingPagesMenu;
import React, { useState, useEffect, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';
import neonHome from '/nn_lines_white.svg';
import SupportingPagesMenu from '../supportingPagesMenu/ SupportingPagesMenu.tsx';

import styles from './TopNavWithHome.module.css';

interface TopNavProps {
    menuPath?: string; // Optional custom path for the menu link
    homePath?: string;
}

const TopNavWithHome: React.FC<TopNavProps> = ({ menuPath = '/menu', homePath= '/'}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    // Close menu when navigating to another route
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className={styles.topNav}>
            <Link to={homePath}>
                <img className={styles.neonHome} src={neonHome} alt="Neon Nation home"/>
            </Link>
            {!menuOpen && (
                <p className={styles.topNavMenu} onClick={toggleMenu}>...</p>
            )}
            {menuPath === "/menu" ? (
                menuOpen && (
                    <div ref={menuRef} className={styles.menuContainer}>
                        <SupportingPagesMenu onClose={() => setMenuOpen(false)} />
                    </div>
                )
            ) : (
                <Link to={menuPath} className={styles.menuLink}></Link>
            )}
        </nav>
    );
};

export default TopNavWithHome;
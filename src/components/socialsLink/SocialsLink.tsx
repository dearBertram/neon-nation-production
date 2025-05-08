import instagramIcon from '/socialIcons/InstagramWhite.png';
import tiktokIcon from '/socialIcons/tikTok.png';

import styles from './SocialsLink.module.css';

const SocialLinks = () => {
    return (
        <nav className={styles.socialLinks}>
            <ul>
                <li>
                    <a href='https://www.instagram.com/ne0n_lines/' target='_blank' rel='noopener noreferrer' aria-label='Instagram'>
                        <img src={instagramIcon} alt='Instagram' />
                    </a>
                </li>
                <li>
                    <a href='https://www.tiktok.com/@ne0n_lines' target='_blank' rel='noopener noreferrer' aria-label='TikTok'>
                        <img src={tiktokIcon} alt='TikTok' />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default SocialLinks;
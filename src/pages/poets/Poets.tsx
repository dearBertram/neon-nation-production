import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { fetchPoetDocument } from '../../dataConnections/poetDataLoader.ts'
import { PoetDocument } from '../../models/poets.ts';
import useWindowResizeThreshold from '../../hooks/useWindowResizeThreshold.ts';

import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner.tsx';
import DataLoadingError from '../supportPages/DataLoadingError.tsx';
import MobileOnly from '../supportPages/mobileOnly/MobileOnly.tsx';
import TopNavWithHome from '../../components/topNavWithHome/TopNavWithHome.tsx';

import glasses from '/glasses.svg'

import styles from './Poets.module.css'


const MAX_MOBILE_WIDTH = 768;

function Poets () {
    const [poet, setPoet] = useState<PoetDocument | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const isMobile = useWindowResizeThreshold(MAX_MOBILE_WIDTH);

    useEffect(() => {
        let isMounted = true;
        const loadPoet = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedPoet = await fetchPoetDocument();
                if (!isMounted) return;
                setPoet(fetchedPoet);
            } catch (err) {
                console.error('Error loading poet:', err);
                if (isMounted) {
                    setError('Failed to load poet data. Please try again later.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        (async () => {
            await loadPoet();
        })();
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <div><LoadingSpinner/></div>;
    }

    if (error) {
        return <div><DataLoadingError/></div>;
    }

    if (!poet || !poet.poet) {
        return <div><DataLoadingError/></div>;
    }

    if (!isMobile) {
        return <div><MobileOnly/></div>;
    }

    return (
        <div className={styles.poetsContainer}>
            <TopNavWithHome/>
            <Link to='/collections'>
                <div className={styles.content}>
                    <img src={glasses} alt={`neon poet`} className={styles.profileImage}/>
                </div>
                <div className={styles.profileText}>
                    <h2>{poet?.poet.name || 'Name not available'}</h2>
                    <p>{poet?.poet.bio || 'Bio not available'}</p>
                </div>
                <h1 className={styles.rotatedEllipse}>...</h1>
            </Link>
            <p className={styles.imprintDetail}>A relative epic — 0.8rem life</p>
        </div>
    );
}

export default Poets;
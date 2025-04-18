import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { fetchPoetDocument } from '../../dataConnections/poetDataLoader.ts'
import { PoetDocument, Collection } from "../../models/poets.ts";
import useWindowResizeThreshold from "../../hooks/useWindowResizeThreshold.ts";

import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner.tsx";
import DataLoadingError from "../supportPages/DataLoadingError.tsx";
import MobileOnly from "../supportPages/mobileOnly/MobileOnly.tsx";
import TopNavWithHome from "../../components/topNavWithHome/TopNavWithHome.tsx";
import StripePaymentButton from "../../components/stripePaymentButton/StripePaymentButton.tsx";

import neonBackground from '/neonBackgroundLandscape.svg'
import styles from './Collections.module.css'

const MAX_MOBILE_WIDTH = 768;

function Collections() {
    const [collections, setCollections] = useState<Collection[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const isMobile = useWindowResizeThreshold(MAX_MOBILE_WIDTH);

    useEffect(() => {
        let isMounted = true;

        const loadCollections = async () => {
            try {
                setLoading(true);
                const poetDocument: PoetDocument = await fetchPoetDocument();
                if (!isMounted) return; // Ensure we don't update state if unmounted
                setCollections(poetDocument.poet.collections || []);
            } catch (err) {
                console.error("Error fetching collections:", err);
                if (isMounted) {
                    setError("Failed to load collections. Please try again later.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        (async () => {
            await loadCollections();
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

    if (!collections || collections.length === 0) {
        return <div><DataLoadingError/></div>;
    }

    if (!isMobile) {
        return <div><MobileOnly/></div>;
    }

    const collection = collections[0];

    return (
        <div className={styles.container}>
            <TopNavWithHome />
            <Link to="/sections">
                <img src={neonBackground} alt="Neon Nation landscape" className={styles.overlay}/>
                <div className={styles.collectionDetails}>
                    <h1>{collection.name || "Unnamed collection"}</h1>
                    <p>{collection.description || "Description not available"}</p>
                </div>
                <p className={styles.imprintDetail}>Please persist...</p>
            </Link>
            <div className={styles.paymentButton}>
                <StripePaymentButton />
            </div>
        </div>
    );
}

export default Collections;

import { useEffect, useRef, useState } from "react";

const useWindowResizeThreshold = (threshold: number): boolean => {
    const [isMobileSize, setIsMobileSize] = useState<boolean>(
        typeof window !== "undefined" ? window.innerWidth <= threshold : true
    );
    const prevWidth = useRef<number>(
        typeof window !== "undefined" ? window.innerWidth : threshold
    );

    useEffect(() => {
        const handleResize = () => {
            const currWidth = window.innerWidth;

            if (currWidth <= threshold && prevWidth.current > threshold) {
                setIsMobileSize(true);
            } else if (currWidth > threshold && prevWidth.current <= threshold) {
                setIsMobileSize(false);
            }

            prevWidth.current = currWidth;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [threshold]);

    return isMobileSize;
};

export default useWindowResizeThreshold;
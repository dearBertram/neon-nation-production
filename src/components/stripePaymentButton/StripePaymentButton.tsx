import React, { useEffect, useRef } from 'react';

const StripePaymentButton = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only append the script if it hasn’t been already
        if (!document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/buy-button.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div ref={containerRef}>
            {React.createElement('stripe-buy-button', {
                'buy-button-id': 'buy_btn_1R6upUGXgVSEuP3jARQg2kRf',
                'publishable-key': 'pk_live_51R6rvTGXgVSEuP3jWUKLwV6wbyTw4NU6kFSCDxAabepPi4tAMsEV8Nqq3wdrt3NQCEzeoCbGZO1Xcyt1XpujJoS900ZVBWxViw',
            })}
        </div>
    );
};

export default StripePaymentButton;
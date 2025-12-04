import React, { useEffect, useState } from 'react';
import '../../Styles/StoreFooter.css'; // Import the CSS file for styling

const StoreFooter = () => {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const checkFooterPosition = () => {
            const contentHeight = document.body.scrollHeight;
            const viewportHeight = window.innerHeight;
            setIsFixed(contentHeight <= viewportHeight); // Fix footer if content height is less than or equal to viewport height
        };

        checkFooterPosition();
        window.addEventListener('resize', checkFooterPosition);

        return () => {
            window.removeEventListener('resize', checkFooterPosition);
        };
    }, []);

    return (
        <div className={`store-footer ${isFixed ? 'fixed' : ''}`}>
            <div>
                <p>&copy; 2025 E-commerce Buy and Sell Products Website. All rights reserved.</p>
            </div>
        </div>
    );
};

export default StoreFooter;

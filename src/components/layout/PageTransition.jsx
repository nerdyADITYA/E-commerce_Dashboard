import { useEffect, useRef } from 'react';
import * as animeJsModule from 'animejs';
const anime = animeJsModule.default || animeJsModule;
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
    const containerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (containerRef.current) {
            const animeFn = anime.default || anime;
            if (typeof animeFn === 'function') {
                animeFn({
                    targets: containerRef.current,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    easing: 'easeOutQuart'
                });
            }
        }
    }, [location.pathname]);

    return (
        <div ref={containerRef} className="w-full h-full">
            {children}
        </div>
    );
};

export default PageTransition;

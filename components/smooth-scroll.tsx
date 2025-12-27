"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with premium/heavy scroll settings
        const lenis = new Lenis({
            lerp: 0.1, // Lower = smoother/heavier feel
            duration: 1.5, // Animation duration
            smoothWheel: true, // Smooth mouse wheel scrolling
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Request Animation Frame loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}

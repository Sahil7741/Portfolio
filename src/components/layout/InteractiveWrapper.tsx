'use client';

import { useEffect, useRef, useState } from 'react';

export default function InteractiveWrapper({ children }: { children: React.ReactNode }) {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Custom cursor movement
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        // Check for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        // Scroll-triggered animations
        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        });

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el);
        });

        // Observe section elements for animations
        document.querySelectorAll('section').forEach((section) => {
            const cards = section.querySelectorAll('[class*="card"], [class*="Card"]');
            cards.forEach((card, index) => {
                (card as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
                card.classList.add('animate-on-scroll');
                observer.observe(card);
            });
        });

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        // Smooth parallax on scroll
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const orbs = document.querySelectorAll('[class*="orb"]');
            orbs.forEach((orb, i) => {
                const speed = 0.1 + i * 0.05;
                (orb as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="cursor-glow"
                style={{
                    opacity: isHovering ? 1 : 0.5,
                    transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
                }}
            />
            {children}
        </>
    );
}

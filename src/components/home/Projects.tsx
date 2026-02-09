'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './Projects.module.css';

const PROJECTS = [
    {
        title: "Google Summer of Code — Zephyr RTOS",
        summary: "Contributing to production-grade RTOS infrastructure with Greybus integration",
        tech: ["Zephyr RTOS", "C", "Greybus", "CI/CD"],
        highlights: [
            "Working on upstreaming system modules",
            "Improving test infrastructure & CI reliability",
            "Collaborating with maintainers through reviews"
        ],
        github: "https://github.com/zephyrproject-rtos/zephyr",
        color: "purple",
        icon: "🔧"
    },
    {
        title: "Autonomous Fire-Extinguishing Vehicle",
        summary: "Complete hardware and firmware design using STM32 microcontroller",
        tech: ["STM32", "C", "Sensors", "ADC"],
        highlights: [
            "Real-time control logic implementation",
            "Ultrasonic sensors and ADC integration",
            "Custom communication protocols"
        ],
        github: "https://github.com/sahil/fire-extinguisher",
        color: "blue",
        icon: "🔥"
    },
    {
        title: "Edge Computer Vision on Raspberry Pi",
        summary: "Image processing pipeline on resource-constrained edge hardware",
        tech: ["Raspberry Pi", "Python", "OpenCV", "Edge"],
        highlights: [
            "Motion blur handling on moving platform",
            "Lightweight CV techniques",
            "Performance-accuracy tradeoffs"
        ],
        github: "https://github.com/sahil/edge-cv",
        color: "cyan",
        icon: "📷"
    },
    {
        title: "Systems Programming Projects",
        summary: "Low-level infrastructure: memory allocators, thread pools, and event-driven servers",
        tech: ["C", "POSIX", "TCP/IP", "Concurrency"],
        highlights: [
            "Custom memory allocator implementation",
            "Thread-safe queues and thread pools",
            "Event-driven TCP server with epoll"
        ],
        github: "https://github.com/sahil/systems-projects",
        color: "pink",
        icon: "⚡"
    }
];

interface TiltState {
    rotateX: number;
    rotateY: number;
    scale: number;
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
    const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        setTilt({ rotateX, rotateY, scale: 1.02 });
    };

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
        setIsHovered(false);
    };

    return (
        <article 
            ref={cardRef}
            className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
            style={{ 
                '--delay': `${index * 0.15}s`,
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
            } as React.CSSProperties}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.cardGlow} data-color={project.color}></div>
            <div className={styles.cardShine} style={{ opacity: isHovered ? 1 : 0 }}></div>
            
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <span className={styles.projectIcon}>{project.icon}</span>
                    <Link href={project.github} target="_blank" className={styles.githubLink}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </Link>
                </div>

                <h3 className={styles.projectName}>{project.title}</h3>
                <p className={styles.projectSummary}>{project.summary}</p>

                <ul className={styles.highlights}>
                    {project.highlights.map((h, idx) => (
                        <li key={idx} style={{ transitionDelay: `${idx * 0.05}s` }}>
                            <span className={styles.checkIcon}>✓</span>
                            {h}
                        </li>
                    ))}
                </ul>

                <div className={styles.techStack}>
                    {project.tech.map((t, i) => (
                        <span 
                            key={t} 
                            className={styles.techTag}
                            style={{ transitionDelay: `${i * 0.05}s` }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default function Projects() {
    return (
        <section id="projects" className={`container ${styles.section}`}>
            <div className={styles.header}>
                <span className={styles.sectionTag}>Portfolio</span>
                <h2 className={styles.title}>
                    Featured <span className={styles.gradient}>Projects</span>
                </h2>
                <p className={styles.subtitle}>
                    Real-world infrastructure and automation solutions
                </p>
            </div>

            <div className={styles.grid}>
                {PROJECTS.map((project, i) => (
                    <ProjectCard key={i} project={project} index={i} />
                ))}
            </div>

            <div className={styles.viewMore}>
                <Link href="https://github.com/sahil" target="_blank" className={`${styles.viewMoreBtn} interactive`}>
                    View All Projects
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </Link>
            </div>
        </section>
    );
}

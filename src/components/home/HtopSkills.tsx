'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './HtopSkills.module.css';

const SKILLS = [
    { name: 'C/C++', level: 90, category: 'systems', icon: '⚡' },
    { name: 'Linux Internals', level: 88, category: 'os', icon: '🐧' },
    { name: 'Embedded Systems', level: 85, category: 'hardware', icon: '🔧' },
    { name: 'Zephyr RTOS', level: 82, category: 'rtos', icon: '⚙️' },
    { name: 'Concurrency', level: 85, category: 'systems', icon: '🔄' },
    { name: 'Networking', level: 80, category: 'infra', icon: '🌐' },
    { name: 'Python', level: 78, category: 'scripting', icon: '🐍' },
    { name: 'Git & CI/CD', level: 85, category: 'tools', icon: '📦' },
];

const METRICS = [
    { value: 1, suffix: '', label: 'GSoC Selection', icon: '🏆' },
    { value: 4, suffix: '+', label: 'Open Source PRs', icon: '🔀' },
    { value: 3, suffix: '+', label: 'System Projects', icon: '⚡' },
    { value: 24, suffix: '/7', label: 'Debug Ready', icon: '🔍' },
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(progress * value);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isVisible, value, duration]);

    return (
        <span ref={ref}>
            {value % 1 === 0 ? Math.floor(count) : count.toFixed(1)}{suffix}
        </span>
    );
}

export default function HtopSkills() {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={`container ${styles.section}`}>
            <div className={styles.header}>
                <span className={styles.sectionTag}>Expertise</span>
                <h2 className={styles.title}>
                    Skills & <span className={styles.gradient}>Experience</span>
                </h2>
            </div>

            <div className={styles.grid}>
                {/* Skills Progress */}
                <div className={styles.skillsCard}>
                    <div className={styles.cardGlow}></div>
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>Technical Proficiency</h3>
                        <div className={styles.skillsList}>
                            {SKILLS.map((skill, i) => (
                                <div 
                                    key={skill.name} 
                                    className={`${styles.skillItem} ${hoveredSkill === skill.name ? styles.skillItemActive : ''}`}
                                    onMouseEnter={() => setHoveredSkill(skill.name)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                >
                                    <div className={styles.skillHeader}>
                                        <span className={styles.skillIcon}>{skill.icon}</span>
                                        <span className={styles.skillName}>{skill.name}</span>
                                        <span className={styles.skillLevel}>{skill.level}%</span>
                                    </div>
                                    <div className={styles.skillBar}>
                                        <div 
                                            className={styles.skillFill}
                                            style={{ 
                                                width: isVisible ? `${skill.level}%` : '0%',
                                                transitionDelay: `${i * 0.1}s`
                                            }}
                                        ></div>
                                        {hoveredSkill === skill.name && (
                                            <div className={styles.skillTooltip}>
                                                {skill.category.toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Metrics */}
                <div className={styles.metricsGrid}>
                    {METRICS.map((metric, i) => (
                        <div 
                            key={metric.label} 
                            className={`${styles.metricCard} interactive`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className={styles.metricGlow}></div>
                            <span className={styles.metricIcon}>{metric.icon}</span>
                            <span className={styles.metricValue}>
                                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                            </span>
                            <span className={styles.metricLabel}>{metric.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

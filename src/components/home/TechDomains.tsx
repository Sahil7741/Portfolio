'use client';

import { useState } from 'react';
import styles from './TechDomains.module.css';

const DOMAINS = [
    {
        icon: "🐧",
        title: "Operating Systems & Linux",
        description: "Process management, system calls, virtual memory, scheduling, and kernel debugging with strace, gdb, perf.",
        tags: ["Linux Internals", "Syscalls", "Memory", "Perf"],
        color: "purple"
    },
    {
        icon: "⚙️",
        title: "Embedded Systems & RTOS",
        description: "Real-time scheduling, device drivers, hardware abstraction, and sensor interfacing on resource-constrained devices.",
        tags: ["Zephyr RTOS", "STM32", "ESP32", "RPi"],
        color: "blue"
    },
    {
        icon: "🔄",
        title: "Concurrency & Performance",
        description: "Multithreading, synchronization primitives, deadlock analysis, and latency/throughput benchmarking.",
        tags: ["Threads", "Mutexes", "Atomics", "Profiling"],
        color: "cyan"
    },
    {
        icon: "🌐",
        title: "Networking & Infrastructure",
        description: "TCP/IP fundamentals, socket programming, event-driven servers with epoll, and load testing.",
        tags: ["Sockets", "TCP/IP", "epoll", "HTTP"],
        color: "pink"
    },
    {
        icon: "📦",
        title: "Distributed Systems",
        description: "CAP theorem, replication concepts, failure handling, write-ahead logging, and consensus mechanisms.",
        tags: ["CAP", "Replication", "WAL", "Consensus"],
        color: "purple"
    },
    {
        icon: "🔧",
        title: "CI/CD & Reliability",
        description: "Git workflows, continuous integration, automated testing, regression detection, and stress testing.",
        tags: ["GitHub Actions", "Testing", "CI/CD", "Git"],
        color: "blue"
    }
];

export default function TechDomains() {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    return (
        <section id="skills" className={`container ${styles.section}`}>
            <div className={styles.header}>
                <span className={styles.sectionTag}>What I Do</span>
                <h2 className={styles.title}>
                    Core Technical <span className={styles.gradient}>Domains</span>
                </h2>
                <p className={styles.subtitle}>
                    Specializing in systems programming and low-level infrastructure
                </p>
            </div>

            <div className={styles.grid}>
                {DOMAINS.map((domain, i) => (
                    <div 
                        key={i} 
                        className={`${styles.card} ${activeCard === i ? styles.cardActive : ''} interactive`}
                        style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
                        onMouseEnter={() => setActiveCard(i)}
                        onMouseLeave={() => setActiveCard(null)}
                        onClick={() => setActiveCard(activeCard === i ? null : i)}
                    >
                        <div className={styles.cardGlow} data-color={domain.color}></div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <span className={`${styles.cardIcon} ${activeCard === i ? styles.cardIconActive : ''}`}>
                                    {domain.icon}
                                </span>
                                <span className={styles.cardNumber}>0{i + 1}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{domain.title}</h3>
                            <p className={styles.cardDesc}>{domain.description}</p>
                            <div className={styles.tags}>
                                {domain.tags.map((tag, tagIndex) => (
                                    <span 
                                        key={tag} 
                                        className={styles.tag}
                                        style={{ transitionDelay: `${tagIndex * 0.05}s` }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

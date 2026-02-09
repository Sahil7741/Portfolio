'use client';

import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={`container ${styles.section}`}>
            <div className={styles.header}>
                <span className={styles.sectionTag}>About Me</span>
                <h2 className={styles.title}>
                    Building systems where
                    <span className={styles.gradient}> correctness matters</span>
                </h2>
            </div>

            <div className={styles.bentoGrid}>
                {/* Main About Card */}
                <div className={`${styles.card} ${styles.cardLarge}`}>
                    <div className={styles.cardContent}>
                        <p className={styles.intro}>
                            I&apos;m a Systems & Infrastructure Engineer with a strong focus on 
                            {' '}<span className={styles.highlight}>operating systems</span>, 
                            {' '}<span className={styles.highlight}>embedded systems</span>, and 
                            {' '}<span className={styles.highlight}>low-level infrastructure software</span>.
                        </p>
                        <p className={styles.text}>
                            My work sits at the intersection of software, hardware, and performance-critical systems, 
                            where correctness, reliability, and resource constraints matter more than abstractions. 
                            I&apos;m currently pursuing BTech + MTech and contributing to production-grade open-source 
                            systems through Google Summer of Code.
                        </p>
                    </div>
                    <div className={styles.cardGlow}></div>
                </div>

                {/* Philosophy Card */}
                <div className={`${styles.card} ${styles.cardMedium}`}>
                    <div className={styles.cardIcon}>🧠</div>
                    <h3 className={styles.cardTitle}>Philosophy</h3>
                    <p className={styles.cardText}>
                        Depth over breadth. Constraints drive good design. 
                        Measure, don&apos;t assume. Build → debug → document.
                    </p>
                    <div className={styles.cardGlow}></div>
                </div>

                {/* Location Card */}
                <div className={`${styles.card} ${styles.cardSmall}`}>
                    <div className={styles.cardIcon}>📍</div>
                    <h3 className={styles.cardTitle}>Based in</h3>
                    <p className={styles.cardText}>India</p>
                    <div className={styles.timezone}>UTC +5:30</div>
                    <div className={styles.cardGlow}></div>
                </div>

                {/* Focus Card */}
                <div className={`${styles.card} ${styles.cardSmall}`}>
                    <div className={styles.cardIcon}>🎯</div>
                    <h3 className={styles.cardTitle}>Current Focus</h3>
                    <p className={styles.cardText}>GSoC @ Zephyr RTOS</p>
                    <div className={styles.cardGlow}></div>
                </div>

                {/* Tools Card */}
                <div className={`${styles.card} ${styles.cardMedium}`}>
                    <h3 className={styles.cardTitle}>Core Tools</h3>
                    <div className={styles.toolsGrid}>
                        {['C/C++', 'Linux', 'Zephyr', 'GDB', 'Git', 'Python'].map(tool => (
                            <span key={tool} className={styles.tool}>{tool}</span>
                        ))}
                    </div>
                    <div className={styles.cardGlow}></div>
                </div>
            </div>
        </section>
    );
}

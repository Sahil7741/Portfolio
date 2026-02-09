'use client';

import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.content}`}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>◈</span>
                        <span>Sahil</span>
                    </div>
                    <p className={styles.tagline}>
                        Building reliable infrastructure for the cloud-native era.
                    </p>
                </div>

                <div className={styles.links}>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Navigation</h4>
                        <a href="#about" className={styles.link}>About</a>
                        <a href="#skills" className={styles.link}>Skills</a>
                        <a href="#projects" className={styles.link}>Projects</a>
                        <a href="#contact" className={styles.link}>Contact</a>
                    </div>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Connect</h4>
                        <a href="https://github.com/sahil" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
                        <a href="https://linkedin.com/in/sahil" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
                        <a href="https://twitter.com/sahil" target="_blank" rel="noopener noreferrer" className={styles.link}>Twitter</a>
                    </div>
                </div>
            </div>

            <div className={`container ${styles.bottom}`}>
                <div className={styles.copyright}>
                    © {new Date().getFullYear()} Sahil. All rights reserved.
                </div>
                <div className={styles.tech}>
                    Built with <span className={styles.techHighlight}>Next.js</span> • Deployed on <span className={styles.techHighlight}>Vercel</span>
                </div>
            </div>
        </footer>
    );
}

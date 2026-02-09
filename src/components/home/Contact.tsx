import styles from './Contact.module.css';

const SOCIAL_LINKS = [
    { name: "GitHub", url: "https://github.com/sahil", icon: "📦" },
    { name: "LinkedIn", url: "https://linkedin.com/in/sahil", icon: "💼" },
];

export default function Contact() {
    return (
        <section id="contact" className={`container ${styles.section}`}>
            <div className={styles.wrapper}>
                <div className={styles.glowOrb}></div>
                
                <div className={styles.content}>
                    <span className={styles.sectionTag}>Contact</span>
                    <h2 className={styles.title}>
                        Let&apos;s Build Something <span className={styles.gradient}>Together</span>
                    </h2>
                    <p className={styles.text}>
                        Interested in systems software, infrastructure engineering, embedded/RTOS development, 
                        or performance-critical systems. Looking for environments where engineering rigor and 
                        deep technical understanding are valued.
                    </p>
                    
                    <a href="mailto:sahil@example.com" className={styles.emailButton}>
                        <span className={styles.emailIcon}>✉️</span>
                        Get In Touch
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>

                    <div className={styles.socials}>
                        {SOCIAL_LINKS.map(link => (
                            <a 
                                key={link.name}
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={styles.socialLink}
                            >
                                <span>{link.icon}</span>
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <p className={styles.availability}>
                        <span className={styles.statusDot}></span>
                        Open to opportunities
                    </p>
                </div>
            </div>
        </section>
    );
}

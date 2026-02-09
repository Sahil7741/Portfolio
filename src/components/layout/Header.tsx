import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.nav}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>◆</span>
                    <span className={styles.logoText}>sahil</span>
                </Link>

                <nav className={styles.navLinks}>
                    <Link href="#about" className={styles.link}>About</Link>
                    <Link href="#skills" className={styles.link}>Skills</Link>
                    <Link href="#projects" className={styles.link}>Projects</Link>
                    <Link href="#contact" className={styles.link}>Contact</Link>
                </nav>

                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.cta}>
                    <span>Resume</span>
                    <span className={styles.ctaIcon}>↗</span>
                </a>
            </div>
        </header>
    );
}

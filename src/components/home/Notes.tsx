import Link from 'next/link';
import styles from './Notes.module.css';

const NOTES = [
    {
        title: "Debugging Kernel Panics in Production",
        date: "2023-11-05",
        excerpt: "A deep dive into analysing vmcore dumps and realizing why that one spinlock was actually causing a deadlock under high IO wait.",
        slug: "#"
    },
    {
        title: "Why I Love Zig for Embedded Systems",
        date: "2023-09-12",
        excerpt: "Comparing Zig's comptime features against C++ templates for compile-time register mapping on an STM32.",
        slug: "#"
    },
    {
        title: "Understanding TCP Slow Start",
        date: "2023-07-20",
        excerpt: "Visualizing congestion windows and packet loss. Why your 10Gbps link isn't giving you 10Gbps throughput immediately.",
        slug: "#"
    }
];

export default function Notes() {
    return (
        <section id="notes" className={`container ${styles.section}`}>
            <h2 className={styles.title}>06. Engineering Notes</h2>
            <div className={styles.grid}>
                {NOTES.map((note, i) => (
                    <Link href={note.slug} key={i} className={styles.note}>
                        <span className={styles.date}>{note.date}</span>
                        <h3 className={styles.noteTitle}>{note.title}</h3>
                        <p className={styles.excerpt}>{note.excerpt}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

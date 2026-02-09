import styles from './Skills.module.css';

export default function Skills() {
    return (
        <section id="skills" className={`container ${styles.section}`}>
            <h2 className={styles.title}>05. Technical Arsenal</h2>

            <div className={styles.grid}>
                <div>
                    <h3 className={styles.categoryTitle}>Languages</h3>
                    <ul className={styles.list}>
                        <li className={styles.item}>C (C99/C11)</li>
                        <li className={styles.item}>C++ (Modern)</li>
                        <li className={styles.item}>Rust</li>
                        <li className={styles.item}>Python</li>
                        <li className={styles.item}>Assembly (ARM/x86)</li>
                        <li className={styles.item}>Go</li>
                    </ul>
                </div>

                <div>
                    <h3 className={styles.categoryTitle}>Systems & Infra</h3>
                    <ul className={styles.list}>
                        <li className={styles.item}>Linux Kernel Modules</li>
                        <li className={styles.item}>Zephyr / FreeRTOS</li>
                        <li className={styles.item}>Docker / Podman</li>
                        <li className={styles.item}>Kubernetes (Basics)</li>
                        <li className={styles.item}>Terraform</li>
                        <li className={styles.item}>GitHub Actions (CI)</li>
                    </ul>
                </div>

                <div>
                    <h3 className={styles.categoryTitle}>Tools & Concepts</h3>
                    <ul className={styles.list}>
                        <li className={styles.item}>GDB / LLDB</li>
                        <li className={styles.item}>Wireshark / tcpdump</li>
                        <li className={styles.item}>perf / Valgrind</li>
                        <li className={styles.item}>Concurrency / Locks</li>
                        <li className={styles.item}>Memory Management</li>
                        <li className={styles.item}>Distributed Consensus</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

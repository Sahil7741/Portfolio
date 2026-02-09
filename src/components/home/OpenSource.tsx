import styles from './OpenSource.module.css';

export default function OpenSource() {
    return (
        <section className={`container ${styles.section}`}>
            <h2 className={styles.title}>04. Open Source</h2>

            <div className={styles.container}>
                <div className={styles.gsoc}>
                    <h3 className={styles.heading}>Google Summer of Code 2024</h3>
                    <span className={styles.sub}>Contributor @ Zephyr RTOS</span>

                    <p className={styles.desc}>
                        I spent the summer improving the <span className="mono">Greybus</span> subsystem integration for IoT devices.
                        My work involved rewriting the transport layer to support UART framing and reducing memory overhead by 15%.
                        This required deep collaboration with maintainers and multiple rounds of patch reviews on the mailing list.
                    </p>
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>12+</span>
                        <span className={styles.statLabel}>Upstream Commits</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>3</span>
                        <span className={styles.statLabel}>RFCs Authored</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>~500</span>
                        <span className={styles.statLabel}>Lines of C</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

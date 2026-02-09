import styles from './DashboardPanel.module.css';

interface DashboardPanelProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    gridArea?: string;
}

export default function DashboardPanel({ title, children, className, gridArea }: DashboardPanelProps) {
    return (
        <div className={`${styles.panel} ${className || ''}`} style={{ gridArea }}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                <div className={styles.decor}>
                    <div className={styles.block} />
                    <div className={styles.block} />
                    <div className={styles.block} />
                </div>
            </div>
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.corner} />
        </div>
    );
}

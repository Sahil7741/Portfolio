import styles from './IdeLayout.module.css';
import { ReactNode } from 'react';

interface IdeLayoutProps {
    sidebar: ReactNode;
    editor: ReactNode;
    terminal: ReactNode;
    statusbar: ReactNode;
}

export default function IdeLayout({ sidebar, editor, terminal, statusbar }: IdeLayoutProps) {
    return (
        <div className={styles.layout}>
            {/* Activity Bar (Icon Strip) */}
            <div className={styles.activityBar}>
                <div className={`${styles.icon} ${styles.active}`} title="Explorer">📄</div>
                <div className={styles.icon} title="Search">🔍</div>
                <div className={styles.icon} title="Source Control">🌿</div>
                <div className={styles.icon} title="Debug">🐞</div>
                <div className={styles.icon} title="Extensions">🧩</div>
                <div style={{ marginTop: 'auto' }} className={styles.icon} title="Settings">⚙️</div>
            </div>

            {/* Sidebar (File Explorer) */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>EXPLORER</div>
                {sidebar}
            </div>

            {/* Main Content Area */}
            <div className={styles.main}>
                {/* Editor Area */}
                <div className={styles.editorContainer}>
                    {editor}
                </div>

                {/* Bottom Panel (Terminal) */}
                <div className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <span className={styles.panelTabActive}>TERMINAL</span>
                        <span className={styles.panelTab}>PROBLEMS</span>
                        <span className={styles.panelTab}>OUTPUT</span>
                        <span className={styles.panelTab}>DEBUG CONSOLE</span>
                    </div>
                    <div className={styles.panelContent}>
                        {terminal}
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className={styles.statusbar}>
                {statusbar}
            </div>
        </div>
    );
}

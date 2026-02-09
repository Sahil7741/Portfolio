'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

const COMMANDS: Record<string, string> = {
    'help': 'Available commands: whoami, skills, experience, projects, contact, clear, neofetch, philosophy',
    'whoami': 'Sahil - Systems & Infrastructure Engineer | OS, Embedded Systems, RTOS | GSoC Contributor',
    'skills': '► C/C++ ► Linux Internals ► Zephyr RTOS ► Embedded Systems ► Concurrency ► Networking',
    'experience': 'GSoC @ Zephyr RTOS | BTech + MTech | Systems Programming | Production-grade OSS',
    'projects': 'Type "projects" to scroll to my work, or visit github.com/sahil7741',
    'contact': 'Email: sahil@example.com | LinkedIn: /in/sahil | GitHub: @sahil',
    'philosophy': 'Depth over breadth | Constraints drive good design | Measure, don\'t assume | Build → debug → document',
    'clear': '__CLEAR__',
    'neofetch': `
┌──────────────────────────────────┐
│  ███████╗ █████╗ ██╗  ██╗██╗██╗  │
│  ██╔════╝██╔══██╗██║  ██║██║██║  │
│  ███████╗███████║███████║██║██║  │
│  ╚════██║██╔══██║██╔══██║██║██║  │
│  ███████║██║  ██║██║  ██║██║███████╗│
│  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝│
├──────────────────────────────────┤
│  OS: Linux / Zephyr RTOS         │
│  Host: Embedded Systems          │
│  Lang: C, C++, Python            │
│  Focus: Systems Programming      │
│  Status: GSoC Contributor        │
└──────────────────────────────────┘`,
    'ls': 'projects/  skills/  about.md  contact.txt  resume.pdf  gsoc/',
    'pwd': '/home/sahil/systems',
    'date': new Date().toLocaleString(),
    'echo': 'Usage: echo <message>',
    'cat': 'Usage: cat <filename> (try: cat about.md)',
    'cat about.md': 'Systems & Infrastructure Engineer specializing in OS internals, RTOS, and embedded systems.',
    'cat contact.txt': 'Email: sahil@example.com\nGitHub: github.com/sahil7741\nLinkedIn: linkedin.com/in/sahil',
    'sudo': '🚫 Nice try! But you need root access for that 😄',
    'rm -rf /': '🛑 SYSTEM PROTECTED - This kernel module is not loaded!',
    'vim': 'A true systems programmer\'s choice! 👨‍💻',
    'exit': 'Thanks for visiting! But you can\'t escape that easily 👋',
    'gdb': 'GNU Debugger ready. Set your breakpoints wisely.',
    'make': 'Building... Systems programming requires patience.',
};

interface TerminalLine {
    type: 'input' | 'output';
    content: string;
}

export default function Hero() {
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'output', content: 'Welcome to Sahil\'s portfolio terminal! Type "help" for commands.' }
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        
        if (!trimmedCmd) return;

        const newLines: TerminalLine[] = [
            ...lines,
            { type: 'input', content: `$ ${cmd}` }
        ];

        if (trimmedCmd === 'clear') {
            setLines([{ type: 'output', content: 'Terminal cleared. Type "help" for commands.' }]);
        } else if (trimmedCmd === 'projects') {
            setLines([...newLines, { type: 'output', content: 'Scrolling to projects...' }]);
            setTimeout(() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        } else if (trimmedCmd.startsWith('echo ')) {
            const message = cmd.slice(5);
            setLines([...newLines, { type: 'output', content: message || '(empty)' }]);
        } else if (COMMANDS[trimmedCmd]) {
            setLines([...newLines, { type: 'output', content: COMMANDS[trimmedCmd] }]);
        } else {
            setLines([...newLines, { type: 'output', content: `Command not found: ${cmd}. Type "help" for available commands.` }]);
        }

        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);
        setCurrentInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(currentInput);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            } else {
                setHistoryIndex(-1);
                setCurrentInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const matches = Object.keys(COMMANDS).filter(c => c.startsWith(currentInput.toLowerCase()));
            if (matches.length === 1) {
                setCurrentInput(matches[0]);
            }
        }
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    const focusInput = () => inputRef.current?.focus();

    return (
        <section className={styles.hero}>
            <div className={styles.bgOrbs}>
                <div className={styles.orb1}></div>
                <div className={styles.orb2}></div>
                <div className={styles.orb3}></div>
            </div>
            
            <div className={`container ${styles.heroGrid}`}>
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot}></span>
                        <span>Available for opportunities</span>
                    </div>

                    <h1 className={styles.title}>
                        <span className={styles.greeting}>Hi, I&apos;m</span>
                        <span className={styles.name}>Sahil</span>
                        <span className={styles.role}>
                            <span className={styles.roleText}>Systems Engineer</span>
                            <span className={styles.roleHighlight}></span>
                        </span>
                    </h1>

                    <p className={styles.description}>
                        I build <span className={styles.highlight}>low-level systems</span> and 
                        {' '}<span className={styles.highlight}>embedded software</span> where correctness, reliability, and performance matter.
                    </p>

                    <div className={styles.actions}>
                        <Link href="#projects" className={styles.primaryBtn}>
                            <span>View My Work</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                        <a href="https://github.com/sahil7741" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>

                {/* Hero Image */}
                <div className={styles.heroImageWrapper}>
                    <div className={styles.heroImageContainer}>
                        <div className={styles.heroImageGlow}></div>
                        <Image
                            src="https://avatars.githubusercontent.com/u/112881021?v=5"
                            alt="Sahil"
                            width={400}
                            height={400}
                            className={styles.heroImage}
                            priority
                        />
                        <div className={styles.heroImageBorder}></div>
                    </div>
                    
                    {/* Floating Tech Icons */}
                    <div className={`${styles.floatingIcon} ${styles.iconDocker}`}>
                        <span>🐧</span>
                    </div>
                    <div className={`${styles.floatingIcon} ${styles.iconK8s}`}>
                        <span>⚙️</span>
                    </div>
                    <div className={`${styles.floatingIcon} ${styles.iconAws}`}>
                        <span>🔧</span>
                    </div>
                    <div className={`${styles.floatingIcon} ${styles.iconLinux}`}>
                        <span>💻</span>
                    </div>
                </div>
            </div>

            {/* Interactive Terminal */}
            <div className={styles.terminalSection}>
                <div className={styles.terminalWrapper}>
                    <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
                        <div className={styles.terminalHeader}>
                            <div className={styles.terminalDots}>
                                <span className={styles.dotRed}></span>
                                <span className={styles.dotYellow}></span>
                                <span className={styles.dotGreen}></span>
                            </div>
                            <span className={styles.terminalTitle}>sahil@portfolio ~ zsh</span>
                            <div className={styles.terminalActions}></div>
                        </div>
                        <div className={styles.terminalBody} ref={terminalRef}>
                            {lines.map((line, i) => (
                                <div 
                                    key={i} 
                                    className={line.type === 'input' ? styles.terminalPrompt : styles.terminalOutput}
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    {line.content}
                                </div>
                            ))}
                            <div className={styles.terminalInputLine}>
                                <span className={styles.terminalPromptSymbol}>$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className={styles.terminalInput}
                                    spellCheck={false}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>
                    <p className={styles.terminalHint}>💡 Try typing: help, neofetch, skills, whoami</p>
                </div>
            </div>
        </section>
    );
}

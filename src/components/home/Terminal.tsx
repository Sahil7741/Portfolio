'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Terminal.module.css';

const FILESYSTEM = {
    '/': { type: 'dir', children: ['home', 'etc', 'var', 'usr'] },
    '/home': { type: 'dir', children: ['sahil'] },
    '/home/sahil': { type: 'dir', children: ['projects', 'scripts', '.bashrc', 'README.md'] },
    '/home/sahil/projects': { type: 'dir', children: ['k8s-cluster', 'ci-pipeline', 'terraform-aws', 'docker-compose'] },
    '/home/sahil/scripts': { type: 'dir', children: ['deploy.sh', 'monitor.py', 'backup.sh'] },
    '/home/sahil/.bashrc': { type: 'file', content: '# ~/.bashrc\nexport PATH="$HOME/.local/bin:$PATH"\nexport EDITOR=vim\nalias k="kubectl"\nalias d="docker"\nalias tf="terraform"' },
    '/home/sahil/README.md': { type: 'file', content: '# Sahil - DevOps Engineer\n\n🐧 Linux enthusiast\n☸️ Kubernetes certified\n🔧 Infrastructure as Code advocate\n\nI automate everything.' },
    '/etc': { type: 'dir', children: ['nginx', 'docker'] }
};

const BOOT_SEQUENCE = [
    { delay: 0, output: '\x1b[32m[  OK  ]\x1b[0m Started Docker Application Container Engine' },
    { delay: 400, output: '\x1b[32m[  OK  ]\x1b[0m Reached target Multi-User System' },
    { delay: 800, output: '\x1b[32m[  OK  ]\x1b[0m Started containerd container runtime' },
    { delay: 1200, output: '' },
    { delay: 1400, output: 'Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-generic x86_64)' },
    { delay: 1600, output: '' },
    { delay: 1800, output: ' * Documentation:  https://help.ubuntu.com' },
    { delay: 2000, output: ' * Management:     https://landscape.canonical.com' },
    { delay: 2200, output: '' },
    { delay: 2400, output: 'Last login: ' + new Date().toUTCString() + ' from 192.168.1.1' },
];

export default function Terminal() {
    const [history, setHistory] = useState<{ cmd: string; output: string; isSystem?: boolean }[]>([]);
    const [currentPath, setCurrentPath] = useState('/home/sahil');
    const [input, setInput] = useState('');
    const [booted, setBooted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Boot sequence
        BOOT_SEQUENCE.forEach(({ delay, output }) => {
            setTimeout(() => {
                if (output) {
                    setHistory(prev => [...prev, { cmd: '', output, isSystem: true }]);
                }
            }, delay);
        });

        setTimeout(() => setBooted(true), 2600);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmdStr: string) => {
        const parts = cmdStr.trim().split(' ');
        const cmd = parts[0];
        const arg = parts[1];

        let output = '';

        switch (cmd) {
            case 'help':
                output = 'Commands: ls, cd, cat, pwd, whoami, docker, kubectl, clear, neofetch';
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'whoami':
                output = 'sahil';
                break;
            case 'hostname':
                output = 'devops-workstation';
                break;
            case 'pwd':
                output = currentPath;
                break;
            case 'neofetch':
                output = `        .-/+oossssoo+/-.        sahil@devops-workstation
    \`:+ssssssssssssssssss+:\`     -------------------------
  -+ssssssssssssssssssyyssss+-   OS: Ubuntu 24.04 LTS x86_64
 .ossssssssssssssssss##sssss.    Kernel: 6.8.0-generic
/sssssssssss###ss####sssss/      Shell: bash 5.2.15
 :ssssssss########sssssss:       Terminal: portfolio-term
  -+sssss########sssss+-         CPU: AMD Ryzen 9 7950X
    .\`+ooss###ssssoo+\`           Memory: 4096MB / 32768MB
       \`:/+ooss+/:\``;
                break;
            case 'docker':
                if (arg === 'ps') {
                    output = `CONTAINER ID   IMAGE          STATUS         NAMES
a1b2c3d4e5f6   nginx:latest   Up 2 hours     web-proxy
b2c3d4e5f6a1   postgres:15    Up 2 hours     database
c3d4e5f6a1b2   redis:alpine   Up 2 hours     cache`;
                } else if (arg === 'images') {
                    output = `REPOSITORY   TAG       SIZE
nginx        latest    187MB
postgres     15        379MB
redis        alpine    32MB
node         20        1.1GB`;
                } else {
                    output = 'Usage: docker [ps|images]';
                }
                break;
            case 'kubectl':
            case 'k':
                if (arg === 'get' && parts[2] === 'pods') {
                    output = `NAME                      READY   STATUS    RESTARTS   AGE
api-server-7d4b8c9f-x2k   1/1     Running   0          3d
web-frontend-5c6d7e-m9n   1/1     Running   0          3d
worker-8f9a0b1c-p4q       1/1     Running   0          1d`;
                } else if (arg === 'get' && parts[2] === 'nodes') {
                    output = `NAME           STATUS   ROLES           AGE   VERSION
master-node    Ready    control-plane   30d   v1.29.0
worker-01      Ready    <none>          30d   v1.29.0
worker-02      Ready    <none>          30d   v1.29.0`;
                } else {
                    output = 'Usage: kubectl get [pods|nodes]';
                }
                break;
            case 'ls':
                if (arg === '-la' || arg === '-l') {
                    const dir = FILESYSTEM[currentPath as keyof typeof FILESYSTEM];
                    if (dir && 'children' in dir) {
                        output = `total ${dir.children.length * 4}\ndrwxr-xr-x  2 sahil sahil 4096 Feb  3 10:00 .\ndrwxr-xr-x  3 sahil sahil 4096 Feb  3 10:00 ..\n`;
                        output += dir.children.map(c => {
                            const isDir = c.includes('.') ? '-rw-r--r--' : 'drwxr-xr-x';
                            return `${isDir}  1 sahil sahil 4096 Feb  3 10:00 ${c}`;
                        }).join('\n');
                    }
                } else {
                    const dir = FILESYSTEM[currentPath as keyof typeof FILESYSTEM];
                    if (dir && 'children' in dir) {
                        output = dir.children.join('  ');
                    }
                }
                break;
            case 'cd':
                if (!arg || arg === '~') {
                    setCurrentPath('/home/sahil');
                } else if (arg === '..') {
                    const pathParts = currentPath.split('/');
                    pathParts.pop();
                    const newPath = pathParts.join('/') || '/';
                    setCurrentPath(newPath);
                } else {
                    const target = arg.startsWith('/') ? arg : `${currentPath === '/' ? '' : currentPath}/${arg}`;
                    if (FILESYSTEM[target as keyof typeof FILESYSTEM]?.type === 'dir') {
                        setCurrentPath(target);
                    } else {
                        output = `bash: cd: ${arg}: No such file or directory`;
                    }
                }
                break;
            case 'cat':
                if (!arg) {
                    output = 'usage: cat [file]';
                } else {
                    const target = arg.startsWith('/') ? arg : `${currentPath === '/' ? '' : currentPath}/${arg}`;
                    const file = FILESYSTEM[target as keyof typeof FILESYSTEM];
                    if (file && 'content' in file) {
                        output = file.content as string;
                    } else {
                        output = `cat: ${arg}: No such file or directory`;
                    }
                }
                break;
            case '':
                break;
            default:
                output = `bash: ${cmd}: command not found`;
        }

        setHistory(prev => [...prev, { cmd: cmdStr, output }]);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    const getPromptPath = () => {
        if (currentPath === '/home/sahil') return '~';
        if (currentPath.startsWith('/home/sahil/')) return '~' + currentPath.slice(11);
        return currentPath;
    };

    return (
        <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
            <div className={styles.header}>
                <div className={styles.controls}>
                    <span className={`${styles.dot} ${styles.close}`}></span>
                    <span className={`${styles.dot} ${styles.minimize}`}></span>
                    <span className={`${styles.dot} ${styles.maximize}`}></span>
                </div>
                <span className={styles.title}>sahil@devops: {getPromptPath()}</span>
                <div className={styles.tabs}>
                    <span className={styles.tabActive}>bash</span>
                </div>
            </div>
            <div className={styles.body}>
                {history.map((entry, i) => (
                    <div key={i}>
                        {!entry.isSystem && entry.cmd && (
                            <div className={styles.line}>
                                <span className={styles.user}>sahil</span>
                                <span className={styles.at}>@</span>
                                <span className={styles.host}>devops</span>
                                <span className={styles.colon}>:</span>
                                <span className={styles.path}>{getPromptPath()}</span>
                                <span className={styles.dollar}>$</span>
                                <span className={styles.command}>{entry.cmd}</span>
                            </div>
                        )}
                        {entry.output && (
                            <div className={entry.isSystem ? styles.systemOutput : styles.output}>
                                {entry.output}
                            </div>
                        )}
                    </div>
                ))}

                {booted && (
                    <div className={styles.line}>
                        <span className={styles.user}>sahil</span>
                        <span className={styles.at}>@</span>
                        <span className={styles.host}>devops</span>
                        <span className={styles.colon}>:</span>
                        <span className={styles.path}>{getPromptPath()}</span>
                        <span className={styles.dollar}>$</span>
                        <input
                            ref={inputRef}
                            className={styles.input}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}

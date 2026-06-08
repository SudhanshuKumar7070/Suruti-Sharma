// ============================================= //
// BLOG POST SPECIFIC INTERACTIVITY              //
// ============================================= //

document.addEventListener('DOMContentLoaded', () => {
    // Reading Progress Bar
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress-bar';
        
        // Inline styles for the progress bar
        Object.assign(progressBar.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            height: '4px',
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
            width: '0%',
            zIndex: '1001',
            transition: 'width 0.1s ease-out'
        });

        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }, { passive: true });
    };

    createProgressBar();
});

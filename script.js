// ============================================= //
// Suruti Sharma Portfolio - Interactive Scripts   //
// ============================================= //

document.addEventListener('DOMContentLoaded', () => {
    // ——————————————————————————————
    // 1. NAVBAR SCROLL EFFECT
    // ——————————————————————————————
    const navbar = document.getElementById('navbar');
    
    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ——————————————————————————————
    // 2. MOBILE MENU TOGGLE
    // ——————————————————————————————
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = mobileToggle.querySelector('.material-symbols-outlined');
        icon.textContent = navLinks.classList.contains('open') ? 'close' : 'menu';
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileToggle.querySelector('.material-symbols-outlined').textContent = 'menu';
        });
    });

    // ——————————————————————————————
    // 3. ACTIVE NAV LINK ON SCROLL
    // ——————————————————————————————
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-link');

    const activateNavLink = () => {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', activateNavLink, { passive: true });

    // ——————————————————————————————
    // 4. SCROLL REVEAL ANIMATIONS
    // ——————————————————————————————
    const animatedElements = document.querySelectorAll('[data-animate]');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    // Trigger once on load
    setTimeout(revealOnScroll, 100);

    // ——————————————————————————————
    // 5. PORTFOLIO FILTER
    // ——————————————————————————————
    const filterTabs = document.querySelectorAll('.filter-tab');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            portfolioCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ——————————————————————————————
    // 6. CONTACT FORM HANDLER
    // ——————————————————————————————
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Simulate sending
        submitBtn.innerHTML = '<span class="material-symbols-outlined" style="animation: spin 1s linear infinite;">sync</span> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Message Sent!';
            submitBtn.style.background = '#10B981';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2500);
        }, 1500);
    });

    // ——————————————————————————————
    // 7. SMOOTH SCROLL FOR ANCHORS
    // ——————————————————————————————
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ——————————————————————————————
    // 8. PARALLAX EFFECT FOR BLOBS
    // ——————————————————————————————
    const blobs = document.querySelectorAll('.blob');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 8;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    }, { passive: true });

    // ——————————————————————————————
    // 9. STAT COUNTER ANIMATION
    // ——————————————————————————————
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateCounters = () => {
        if (statsAnimated) return;

        const statsBar = document.querySelector('.stats-bar');
        if (!statsBar) return;

        const rect = statsBar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            statsAnimated = true;

            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const num = parseInt(text);
                const suffix = text.replace(num, '');
                let current = 0;
                const increment = num / 60;
                const duration = 1500;
                const stepTime = duration / 60;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        stat.textContent = num + suffix;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, stepTime);
            });
        }
    };

    window.addEventListener('scroll', animateCounters, { passive: true });
});

// Inject fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

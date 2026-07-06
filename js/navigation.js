window.addEventListener('scroll', function() {
    const nav = document.querySelector('header');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-xl');
        nav.classList.remove('bg-primary/95');
        nav.classList.add('bg-primary');
    } else {
        nav.classList.remove('shadow-xl');
        nav.classList.add('bg-primary/95');
        nav.classList.remove('bg-primary');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    const activeClasses = 'text-secondary border-b-2 border-secondary pb-1'.split(' ');
    const inactiveClasses = 'text-on-primary hover:text-secondary transition-colors'.split(' ');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (!link.querySelector('img') && !link.querySelector('span')) {
            link.classList.add('font-label-lg', 'text-label-lg', 'uppercase', 'tracking-wider');
            if (linkPath === currentPath) {
                link.classList.add(...activeClasses);
                link.classList.remove(...inactiveClasses);
            } else {
                link.classList.add(...inactiveClasses);
                link.classList.remove(...activeClasses);
            }
        }
    });

    document.addEventListener('click', (e) => {
        const card = e.target.closest('.expertise-card');
        if (card) {
            window.location.href = 'expertise.html';
        }
    });
});

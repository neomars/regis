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
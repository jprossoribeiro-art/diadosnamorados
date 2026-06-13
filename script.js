document.addEventListener('DOMContentLoaded', () => {
    // Reveal Hero elements immediately on load
    setTimeout(() => {
        document.querySelectorAll('.hero-content .fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    // Scroll reveal logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deixa visível de forma permanente
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach(el => {
        observer.observe(el);
    });

    // Animação de corações flutuantes
    function createHeart() {
        const bg = document.getElementById('bg-animation');
        if (!bg) return;

        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = '❤';
        
        // Posição horizontal aleatória
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Tamanho aleatório (entre 10px e 30px)
        const size = Math.random() * 20 + 10;
        heart.style.fontSize = size + 'px';
        
        // Duração da animação aleatória (entre 10s e 20s)
        const duration = Math.random() * 10 + 10;
        heart.style.animationDuration = duration + 's';
        
        bg.appendChild(heart);
        
        // Remove o coração após a animação terminar para não pesar o navegador
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Cria um novo coração a cada 800ms
    setInterval(createHeart, 800);
});

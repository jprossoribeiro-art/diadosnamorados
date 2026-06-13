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

    // ===== CARROSSEL =====
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    let currentIndex = 0;
    let autoplayInterval;

    // Criar dots
    if (slides.length > 0 && dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Ir para foto ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        if (!track || slides.length === 0) return;
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        // Atualizar dots
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        const next = (currentIndex + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    // Botões de navegação
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    // Autoplay - troca a cada 4 segundos
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    startAutoplay();

    // Pausar autoplay quando o mouse estiver sobre o carrossel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        carousel.addEventListener('mouseleave', () => startAutoplay());
    }

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoplay(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
    });
});

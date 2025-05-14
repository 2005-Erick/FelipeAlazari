document.addEventListener('DOMContentLoaded', function() {
    // Theme handling
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Lightbox elements
    const lightbox = document.getElementById('lightbox');
    const artCards = document.querySelectorAll('.art-card');
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    let currentIndex = 0;

    // Theme switcher
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
    });

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    function updateThemeIcon(theme) {
        const sunIcon = themeToggle.querySelector('.sun');
        const moonIcon = themeToggle.querySelector('.moon');
        
        if (theme === 'light') {
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        } else {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        }
    }

    function toggleScrollLock(lock) {
        document.body.style.overflow = lock ? 'hidden' : '';
    }

    function showLightbox(artCard, index) {
        const finalArt = artCard.querySelector('.final-art');
        const sketch = artCard.querySelector('.sketch-art');

        displayArt.src = finalArt.src;
        displayArt.alt = finalArt.alt;

        if (sketch) {
            displaySketch.src = sketch.src;
            displaySketch.alt = sketch.alt;
            displaySketch.style.display = 'block';
        } else {
            displaySketch.style.display = 'none';
        }

        currentIndex = index;
        
        // Armazena a posição do scroll antes de abrir o lightbox
        const scrollPosition = window.pageYOffset;
        document.body.dataset.scrollPosition = scrollPosition;
        
        lightbox.classList.add('active');
        // Não bloquear o scroll completamente
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
        
        updateNavigation();
    }

    function updateNavigation() {
        const prevBtn = lightbox.querySelector('.prev-btn');
        const nextBtn = lightbox.querySelector('.next-btn');
        
        prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentIndex < artCards.length - 1 ? 'block' : 'none';
    }

    function openLightbox() {
        const lightbox = document.querySelector('.lightbox');
        lightbox.classList.add('active');
        // Não bloqueia o scroll do body
        document.documentElement.style.scrollBehavior = 'auto';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        
        // Restaura a posição do scroll
        const scrollPosition = parseInt(document.body.dataset.scrollPosition);
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    }

    // Event Listeners
    artCards.forEach((card, index) => {
        card.addEventListener('click', () => showLightbox(card, index));
    });

    lightbox.addEventListener('click', function(e) {
        // Verifica se o click foi diretamente no lightbox (fundo)
        // e não em seus elementos filhos
        if (e.target === lightbox) {
            const scrollPosition = parseInt(document.body.dataset.scrollPosition || '0');
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-open');
            
            // Restaura a posição do scroll e remove os estilos inline
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);

            // Garante que a navegação permaneça visível
            const nav = document.querySelector('nav');
            if (nav) {
                nav.style.display = '';
            }
        }
    });

    lightbox.querySelector('.prev-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex > 0) showLightbox(artCards[currentIndex - 1], currentIndex - 1);
    });

    lightbox.querySelector('.next-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex < artCards.length - 1) showLightbox(artCards[currentIndex + 1], currentIndex + 1);
    });

    lightbox.querySelector('.close-btn').addEventListener('click', () => {
        lightbox.classList.remove('active');
        toggleScrollLock(false);
    });

    lightbox.querySelector('.lightbox-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                lightbox.classList.remove('active');
                toggleScrollLock(false);
                break;
            case 'ArrowLeft':
                if (currentIndex > 0) showLightbox(artCards[currentIndex - 1], currentIndex - 1);
                break;
            case 'ArrowRight':
                if (currentIndex < artCards.length - 1) showLightbox(artCards[currentIndex + 1], currentIndex + 1);
                break;
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    const heroSection = document.querySelector('#home');

    function updateHeader() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader);
    window.addEventListener('load', updateHeader);
});
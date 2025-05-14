document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLightbox();
    initializeHeader();
});

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const preferredTheme = localStorage.getItem('theme') || 'dark';
    
    setTheme(preferredTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.sun');
    const moonIcon = themeToggle.querySelector('.moon');
    
    sunIcon.style.opacity = theme === 'dark' ? '1' : '0';
    moonIcon.style.opacity = theme === 'light' ? '1' : '0';
}

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const artCards = document.querySelectorAll('.art-card');
    let currentIndex = 0;
    
    function showLightbox(card, index) {
        const content = lightbox.querySelector('.lightbox-content');
        content.innerHTML = '';
        
        const artworkContainer = document.createElement('div');
        artworkContainer.className = 'artwork-container';
        
        // Art info at the top
        const artInfo = card.querySelector('.art-info').cloneNode(true);
        artInfo.style.cssText = `
            position: relative;
            opacity: 1;
            transform: none;
            background: var(--card-bg);
            color: var(--text-color);
            width: 100%;
            padding: 1.5rem;
            border-radius: 15px;
            margin-bottom: 1rem;
        `;
        artworkContainer.appendChild(artInfo);
        
        // Main image
        const mainImg = card.querySelector('.final-art').cloneNode(true);
        artworkContainer.appendChild(mainImg);
        
        // Process images
        const details = card.querySelector('.art-details');
        if (details) {
            const processImages = details.querySelectorAll('img');
            processImages.forEach(img => {
                const processImage = img.cloneNode(true);
                processImage.style.marginTop = '1rem';
                artworkContainer.appendChild(processImage);
            });
        }
        
        content.appendChild(artworkContainer);
        currentIndex = index;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateNavigation();
    }
    
    function updateNavigation() {
        const prevBtn = lightbox.querySelector('.prev-btn');
        const nextBtn = lightbox.querySelector('.next-btn');
        
        prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentIndex < artCards.length - 1 ? 'block' : 'none';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event Listeners
    artCards.forEach((card, index) => {
        card.addEventListener('click', () => showLightbox(card, index));
    });
    
    lightbox.querySelector('.close-btn').addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Navigation
    lightbox.querySelector('.prev-btn').addEventListener('click', e => {
        e.stopPropagation();
        if (currentIndex > 0) showLightbox(artCards[currentIndex - 1], currentIndex - 1);
    });
    
    lightbox.querySelector('.next-btn').addEventListener('click', e => {
        e.stopPropagation();
        if (currentIndex < artCards.length - 1) showLightbox(artCards[currentIndex + 1], currentIndex + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape': closeLightbox(); break;
            case 'ArrowLeft':
                if (currentIndex > 0) showLightbox(artCards[currentIndex - 1], currentIndex - 1);
                break;
            case 'ArrowRight':
                if (currentIndex < artCards.length - 1) showLightbox(artCards[currentIndex + 1], currentIndex + 1);
                break;
        }
    });
}

function initializeHeader() {
    const header = document.querySelector('header');
    
    function updateHeader() {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader();
}

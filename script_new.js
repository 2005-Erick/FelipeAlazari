document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeHeader();
    initializeLightbox();
    initializeSidebar();
});

function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);

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

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const artCards = document.querySelectorAll('.art-card');
    let currentIndex = 0;

   function showLightbox(card, index) {
    const lightboxContainer = lightbox.querySelector('.lightbox-container');
    const mainImage = lightboxContainer.querySelector('.main-image');
    const title = lightboxContainer.querySelector('h2');
    const description = lightboxContainer.querySelector('.description');
    const processImages = lightboxContainer.querySelector('.process-images');

    const artInfo = card.querySelector('.art-info');
    const finalArt = card.querySelector('.final-art');
    
    title.textContent = artInfo.querySelector('h3').textContent;
    
    const projectType = artInfo.querySelector('h4');
    const projectDescription = artInfo.querySelector('p');
    
    description.innerHTML = '';
    
    if (projectType) {
        const typeElement = document.createElement('div');
        typeElement.className = 'project-type';
        typeElement.textContent = projectType.textContent;
        description.appendChild(typeElement);
    }
    
    if (projectDescription) {
        const descElement = document.createElement('div');
        descElement.className = 'project-description';
        descElement.textContent = projectDescription.textContent;
        description.appendChild(descElement);
    }
    
    mainImage.src = finalArt.src;
    mainImage.alt = finalArt.alt;

    processImages.innerHTML = '';
    const details = card.querySelector('.art-details');
    if (details) {
        const processImgs = details.querySelectorAll('img');
        processImgs.forEach(img => {
            const imgClone = img.cloneNode(true);
            processImages.appendChild(imgClone);
        });
    }

    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');

  
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
    currentIndex = index;
    updateNavigation();

    lightbox.focus();
}

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    }

    function updateNavigation() {
        const prevBtn = lightbox.querySelector('.prev-btn');
        const nextBtn = lightbox.querySelector('.next-btn');
        
        prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
        nextBtn.style.display = currentIndex < artCards.length - 1 ? 'flex' : 'none';
    }

  
    artCards.forEach((card, index) => {
        card.addEventListener('click', () => showLightbox(card, index));
    });

    lightbox.querySelector('.close-btn').addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });
 

    lightbox.querySelector('.prev-btn').addEventListener('click', e => {
        e.stopPropagation();
        if (currentIndex > 0) showLightbox(artCards[currentIndex - 1], currentIndex - 1);
    });

    lightbox.querySelector('.next-btn').addEventListener('click', e => {
        e.stopPropagation();
        if (currentIndex < artCards.length - 1) showLightbox(artCards[currentIndex + 1], currentIndex + 1);
    });

    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');

   
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

function initializeSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeButton = document.querySelector('.close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const sidebarLinks = sidebar.querySelectorAll('a');

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openSidebar);
    closeButton.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

  
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
}





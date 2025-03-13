// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navLinks.classList.remove('active');
    });
});

// Read More functionality
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        const fullDesc = card.querySelector('.full-description');
        const shortDesc = card.querySelector('.project-description');

        if (fullDesc.style.display === 'none' || !fullDesc.style.display) {
            fullDesc.style.display = 'block';
            shortDesc.style.display = 'none';
            e.target.textContent = 'Show Less';
        } else {
            fullDesc.style.display = 'none';
            shortDesc.style.display = '-webkit-box';
            e.target.textContent = 'Read More';
        }
    });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.project-card').forEach((card) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Add to script.js
// Fullscreen Preview with Slider
const fullscreenPreview = document.createElement('div');
fullscreenPreview.className = 'fullscreen-preview';
fullscreenPreview.innerHTML = `
    <button class="close-preview">×</button>
    <div class="fullscreen-slider">
        <button class="slider-nav prev">❮</button>
        <button class="slider-nav next">❯</button>
    </div>
`;
document.body.appendChild(fullscreenPreview);

document.querySelectorAll('.image-container img').forEach(img => {
    img.addEventListener('click', function() {
        const projectCard = this.closest('.project-card');
        const allImages = Array.from(projectCard.querySelectorAll('.image-container img'));
        const currentIndex = allImages.indexOf(this);
        
        // Create slider images
        const slider = fullscreenPreview.querySelector('.fullscreen-slider');
        slider.innerHTML = `
            ${allImages.map((img, index) => `
                <img src="${img.src}" alt="Fullscreen view" class="fullscreen-image ${index === currentIndex ? 'active' : ''}">
            `).join('')}
            <button class="slider-nav prev">❮</button>
            <button class="slider-nav next">❯</button>
        `;

        fullscreenPreview.classList.add('fullscreen-active');
        
        // Slider functionality
        let currentSlide = currentIndex;
        const slides = slider.querySelectorAll('.fullscreen-image');
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            currentSlide = index;
        }

        slider.querySelector('.next').addEventListener('click', () => {
            showSlide((currentSlide + 1) % slides.length);
        });

        slider.querySelector('.prev').addEventListener('click', () => {
            showSlide((currentSlide - 1 + slides.length) % slides.length);
        });
    });
});

// Close preview
fullscreenPreview.querySelector('.close-preview').addEventListener('click', () => {
    fullscreenPreview.classList.remove('fullscreen-active');
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fullscreenPreview.classList.remove('fullscreen-active');
    }
});
// Image Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-advance when hovering over slider
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Manual navigation
prevBtn.addEventListener('click', () => {
    prevSlide();
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.gallery-item, .about-content, .contact-info').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Parallax Effect
const parallaxBg = document.querySelector('.parallax-bg');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// EmailJS Contact Form Integration
// Replace 'YOUR_TEMPLATE_ID' and 'YOUR_PUBLIC_KEY' with your actual values from EmailJS
(function() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    if (!form) return;

    // Load EmailJS SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
    script.onload = function() {
        emailjs.init('lRcFoV0iNUwCV5AK3'); // <-- User's Public Key
    };
    document.body.appendChild(script);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formMessage.textContent = '';
        formMessage.style.color = '';
        emailjs.sendForm('service_aigf3ir', 'template_d35iyir', form)
            .then(function() {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.style.color = 'green';
                form.reset();
            }, function(error) {
                formMessage.textContent = 'Failed to send message. Please try again later.';
                formMessage.style.color = 'red';
            });
    });
})(); 
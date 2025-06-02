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

// Magical Sparkle Effect in Hero Section
(function() {
    const canvas = document.getElementById('magic-sparkles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    let sparkles = [];
    const NUM_SPARKLES = 24;

    function resize() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function randomColor() {
        return `rgba(255,255,255,${0.7 + Math.random() * 0.3})`;
    }

    function createSparkle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            r: 0.7 + Math.random() * 1.7,
            alpha: 0.5 + Math.random() * 0.5,
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2,
            color: randomColor(),
            twinkle: Math.random() * Math.PI * 2
        };
    }

    function drawSparkle(s) {
        ctx.save();
        ctx.globalAlpha = s.alpha * (0.7 + 0.3 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = s.color;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let s of sparkles) {
            s.x += s.dx;
            s.y += s.dy;
            s.twinkle += 0.05 + Math.random() * 0.03;
            if (s.x < 0 || s.x > width || s.y < 0 || s.y > height) {
                Object.assign(s, createSparkle());
            }
            drawSparkle(s);
        }
        requestAnimationFrame(animate);
    }

    function init() {
        resize();
        sparkles = Array.from({length: NUM_SPARKLES}, createSparkle);
        animate();
    }

    window.addEventListener('resize', resize);
    setTimeout(init, 100); // Wait for layout
})(); 
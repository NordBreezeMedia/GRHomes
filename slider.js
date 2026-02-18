// Simple JS slider for two images
const images = document.querySelectorAll('.slider-img');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let current = 0;

function showImage(idx) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === idx);
    });
}

prevBtn.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
});
nextBtn.addEventListener('click', () => {
    current = (current + 1) % images.length;
    showImage(current);
});

// Optional: auto-slide every 6 seconds
let autoSlide = setInterval(() => {
    current = (current + 1) % images.length;
    showImage(current);
}, 6000);

// Pause on hover
const sliderArea = document.querySelector('.hero-slider-area');
sliderArea.addEventListener('mouseenter', () => clearInterval(autoSlide));
sliderArea.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        current = (current + 1) % images.length;
        showImage(current);
    }, 6000);
});

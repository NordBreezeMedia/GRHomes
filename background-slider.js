
// background-slider.js
// This script will cycle through background images in the slider

const images = [
    'custombuild.jpg',
    'ba-woll.jpg',
    'New_Construction_Columbia.jpg'
];

let current = 0;
let intervalId = null;

function showImage(idx) {
    const slider = document.getElementById('background-slider');
    if (!slider) return;
    const imgs = slider.querySelectorAll('img');
    imgs.forEach((img, i) => {
        img.classList.toggle('active', i === idx);
    });
}

function nextImage() {
    if (images.length > 1) {
        current = (current + 1) % images.length;
        showImage(current);
    }
}

function startSlider() {
    const slider = document.getElementById('background-slider');
    if (!slider || images.length === 0) return;
    slider.innerHTML = '';
    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        if (i === 0) img.classList.add('active');
        slider.appendChild(img);
    });
    showImage(0);
    if (images.length > 1) {
        intervalId = setInterval(nextImage, 4000);
    }

    // Swipe support for mobile and desktop
    let startX = null;
    slider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    slider.addEventListener('touchend', function(e) {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX < startX - 50 && images.length > 1) {
            nextImage();
        }
        startX = null;
    });
    // Desktop swipe (mouse drag)
    let mouseDown = false;
    let mouseStartX = null;
    slider.addEventListener('mousedown', function(e) {
        mouseDown = true;
        mouseStartX = e.clientX;
    });
    slider.addEventListener('mouseup', function(e) {
        if (!mouseDown) return;
        let mouseEndX = e.clientX;
        if (mouseEndX < mouseStartX - 50 && images.length > 1) {
            nextImage();
        }
        mouseDown = false;
        mouseStartX = null;
    });
}

document.addEventListener('DOMContentLoaded', startSlider);

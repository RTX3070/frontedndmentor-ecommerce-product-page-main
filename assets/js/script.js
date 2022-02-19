import { createCheckout } from "./checkout.js";
import { lightBox } from "./lightbox.js";

// DOM Elements - Mobile Menu
const mobileMenuOverlay = document.querySelector('header .overlay');
const barsIcon = document.querySelector('header .desktop-menu .toggle-mobile-menu .toggle-menu .icon-menu');
const closeIcon = document.querySelector('header .mobile-menu .icon-close');
const mobileMenu = document.querySelector('header .mobile-menu');

// DOM Elements - Slider
const slidesContainer = document.querySelector('main .slider .slides');
const sliderImages = document.querySelectorAll('main .slider .slides .slide');
const sliderThumbnails = document.querySelectorAll('main .slider .thumbnails .thumbnail');
const prevArrow = document.querySelector('main .slider .prev-arrow');
const nextArrow = document.querySelector('main .slider .next-arrow');

// DOM Elements - Cart
const cartCounter = document.querySelector('header .user-cart .cart .cart-counter');
const cartIcon = document.querySelector('header .user-cart .cart .icon-cart');
const cartForm = document.querySelector('main .product .add-cart .cart-input');
const quantityInput = document.querySelector('main .product .add-cart .cart-input .quantity input[type="number"]');
const removeBtn = document.querySelector('main .product .add-cart .cart-input .quantity .remove-btn');
const addBtn = document.querySelector('main .product .add-cart .cart-input .quantity .add-btn');

// Show or hide menu on mobile devices
barsIcon.addEventListener('click', () => {
    document.body.classList.add('show');
    mobileMenuOverlay.classList.add('show');
    mobileMenu.classList.add('show');
});

mobileMenuOverlay.addEventListener('click', () => {
    document.body.classList.remove('show');
    mobileMenuOverlay.classList.remove('show');
    mobileMenu.classList.remove('show');
});

closeIcon.addEventListener('click', () => {
    document.body.classList.remove('show');
    mobileMenuOverlay.classList.remove('show');
    mobileMenu.classList.remove('show');
});

// Slider
// Keep track of index images
let counter = 0;

// Find images width, luckly all the provided images has the same width
let slideWidth = sliderImages[0].clientWidth;

// Avoid unwanted artifacts on window resizing
window.addEventListener('resize', () => {
    counter = counter;
    slideWidth = sliderImages[0].clientWidth;
    slidesContainer.style.transition = 'unset';
    slidesContainer.style.transform = `translateX(-${slideWidth * counter}px)`;
})

prevArrow.addEventListener('click', () => {
    if (counter <= 0) return;
    counter--;
    slidesContainer.style.transform = `translateX(-${slideWidth * counter}px)`;
    sliderThumbnails[counter].classList.add('light');
    if (sliderThumbnails[counter].nextElementSibling.classList.contains('light')) {
        sliderThumbnails[counter].nextElementSibling.classList.remove('light');
    }
});

nextArrow.addEventListener('click', () => {
    if (counter >= sliderImages.length-1) return;
    counter++;
    slidesContainer.style.transform = `translateX(-${slideWidth * counter}px)`;
    sliderThumbnails[counter].classList.add('light');
    if (sliderThumbnails[counter].previousElementSibling.classList.contains('light')) {
        sliderThumbnails[counter].previousElementSibling.classList.remove('light');
    }
});

// Slider thumbnails
// Select first thumbnail on page loading
sliderThumbnails[0].classList.add('light');

sliderThumbnails.forEach((thumbnail, i) => {
    thumbnail.addEventListener('click', () => {
        counter = i;
        sliderThumbnails.forEach((lightthumb, idx) => {
            if (idx !== i && lightthumb.classList.contains('light')) {
                lightthumb.classList.remove('light');
            }
        });
        thumbnail.classList.add('light');
        slidesContainer.style.transform = `translateX(-${slideWidth * counter}px)`;
    });
});

// Cart
cartIcon.addEventListener('click', createCheckout);

document.body.addEventListener('click', e => {
    if (e.target !== cartIcon && document.body.firstElementChild.children[3].firstElementChild.classList.contains('checkout')) {
        document.getElementsByClassName('checkout')[0].remove();
    }
});

removeBtn.addEventListener('click', e => {
    e.preventDefault();
    quantityInput.stepDown();
});

addBtn.addEventListener('click', e => {
    e.preventDefault();
    quantityInput.stepUp();
});

cartForm.addEventListener('submit', e => {
    e.preventDefault();
    cartCounter.classList.add('show');
    cartCounter.textContent = quantityInput.value;
});

// Initialize Lightbox
lightBox();
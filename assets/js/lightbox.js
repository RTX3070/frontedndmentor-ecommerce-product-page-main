// Clone slider element and add some extra features
const createLightbox = () => {
    const slider = document.querySelector('main .slider');
    const clonedSlider = slider.cloneNode(true);
    clonedSlider.removeAttribute('class');
    clonedSlider.id = 'slider';
    clonedSlider.children[2].innerHTML = `
        <svg width="12" height="18">
            <path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/>
        </svg>
    `;
    clonedSlider.children[3].innerHTML = `
        <svg width="13" height="18">
            <path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/>
        </svg>
    `;

    const closeLbx = document.createElement('span');
    closeLbx.classList.add('close-lbx');
    closeLbx.innerHTML = `
        <svg width="42" height="45" viewBox="0 0 30 10">
            <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/>
        </svg>
    `;

    clonedSlider.appendChild(closeLbx);

    const lightBox = document.createElement('div');
    lightBox.id = 'lightbox';
    document.body.append(lightBox, clonedSlider);
};

const lightBoxAnimation = () => {
    const lightbox = document.querySelector('body #lightbox');
    const slider = document.querySelector('body #slider');
    const closeLbx = document.querySelector('body #slider .close-lbx');
    const slidesContainer = document.querySelector('body #slider .slides');
    const sliderImages = document.querySelectorAll('body #slider .slides .slide');
    const sliderThumbnails = document.querySelectorAll('body #slider .thumbnails .thumbnail');
    const prevArrow = document.querySelector('body #slider .prev-arrow');
    const nextArrow = document.querySelector('body #slider .next-arrow');

    let counter = 0;
    let slideWidth = sliderImages[0].clientWidth;

    closeLbx.addEventListener('click', () => {
        lightbox.remove();
        slider.remove();
    });

    lightbox.addEventListener('click', () => {
        lightbox.remove();
        slider.remove();
    });

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
};

export const lightBox = () => {
    const sliderImages = document.querySelectorAll('body .slider .slides .slide');

    sliderImages.forEach(slide => {
        slide.addEventListener('click', () => {
            if (window.innerWidth < 1440) {
                return;
            }
            document.body.classList.add('show');
            createLightbox();
            lightBoxAnimation();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth < 1440) {
            document.body.classList.remove('show');
            document.getElementById('lightbox').remove();
            document.getElementById('slider').remove();
            return;
        }
    })

}
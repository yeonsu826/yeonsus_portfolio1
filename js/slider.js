// Select elements
const slides = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0; // Current slide index
const totalSlides = slides.children.length; // Total number of slides

// Update slide position
function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Go to the next slide
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides; // Loop back to the first slide
    updateSlidePosition();
});

// Go to the previous slide
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loop back to the last slide
    updateSlidePosition();
});

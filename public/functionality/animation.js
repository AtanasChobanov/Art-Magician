document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const svg = document.querySelector('svg');

    form.addEventListener('submit', () => {
        svg.classList.remove('hidden'); // Removes class 'hidden' to show SVG
        svg.classList.add('infinity-move'); // Adding class for the animation
    });
});
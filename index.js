const inputLocation = document.querySelector('.input-location');
const detectLocation = document.querySelector('.detect-location');
inputLocation.addEventListener('click', (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
    const arrowDown = inputLocation.querySelector('.arrow-down');
    const currIcon = arrowDown.querySelector('i');

    if (currIcon.className === 'fa-solid fa-caret-down') {
        currIcon.className = 'fa-solid fa-caret-up';
        arrowDown.style.transform = 'translateY(3px)';
    } else {
        currIcon.className = 'fa-solid fa-caret-down';
        arrowDown.style.transform = 'translateY(0)';
    }
    detectLocation.style.display = 'block';
});
document.addEventListener('click', (e) => {
    if (!detectLocation.contains(e.target) && e.target !== inputLocation) {
        detectLocation.style.display = 'none';
    }
});
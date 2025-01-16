// HEADER
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

//HIGHLIGHT-CARDS

const highlightCards = [
    {
        id: 1,
        image: "https://b.zmtcdn.com/webFrontend/e5b8785c257af2a7f354f1addaf37e4e1647364814.jpeg?output-format=webp",
        title: "Order Online",
        description: "Stay home and order to your doorstep",
    },
    {
        id: 2,
        image: "https://b.zmtcdn.com/webFrontend/d026b357feb0d63c997549f6398da8cc1647364915.jpeg?output-format=webp",
        title: "Dining",
        description: "View the city's favourite dining venues",
    },
    {
        id: 3,
        image: "https://b.zmtcdn.com/data/o2_assets/371de657644f1b5818fcb5d83387c8c91722851940.png?output-format=webp",
        title: "Life Event",
        description: "Explore the city's top nightlife outlets",
    },
];

function renderHighlightCards(highlightCards) {
    const highlightCardContainer = document.querySelector('.highlight-cards');
    highlightCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('highlight-card');

        cardElement.innerHTML = `
            <div class="img">
                <img src="${card.image}" alt="${card.title}" />
            </div>
            <div class="content">
                <h4>${card.title}</h4>
                <p>${card.description}</p>
            </div>
        `;
        highlightCardContainer.appendChild(cardElement);
    });
}

renderHighlightCards(highlightCards);

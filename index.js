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
document.addEventListener('click', () => {
    detectLocation.style.display = 'none';

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

//SEE MORE SEE LESS
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector(".center");
    const hiddenItems = document.querySelectorAll(".hidden");

    toggleButton.addEventListener("click", () => {
        const isHidden = hiddenItems[0].classList.contains("hidden");
        console.log("Toggle clicked, isHidden:", isHidden);

        hiddenItems.forEach(item => {
            if (isHidden) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });


        toggleButton.innerHTML = isHidden ?
            `See less <i class="fa-solid fa-chevron-up"></i>` :
            `See more <i class="fa-solid fa-chevron-down"></i>`;
    });
});

//EMAIL PHONE
const emailButton = document.querySelector("#email");
const phoneButton = document.querySelector("#phone");
const emailInput = document.querySelector(".email-input");


phoneButton.addEventListener("click", function () {
    emailInput.innerHTML = ``;
    emailInput.innerHTML = `
        <div class="phone-input">
            <div class="phone-code">
                <input type="text" placeholder="+91" readonly>
                <div class="arrow-down">
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
            </div>
            <div class="country-list hidden">
                    <div class="country-item">+84</div>
                    <div class="country-item">+1</div>
                    <div class="country-item">+32</div>
                    <div class="country-item">+91</div>
                    <div class="country-item">+60</div>
                    <div class="country-item">+63</div>
                    <div class="country-item">+94</div>
                    <div class="country-item">+50</div>
                    <div class="country-item">+50</div>
                    <div class="country-item">+50</div>
                    <div class="country-item">+50</div>
                    <div class="country-item">+50</div>
                    <div class="country-item">+50</div>
                    <div class="country-item">+50</div>
                    <div class="country-item">+50</div>
                    <div class="country-item">+50</div>
                    </div>
            <div class="type-container">
                <input type="text" placeholder="type here...">
            </div>
        </div>
        <button>Share App Link</button>
    `;
    const phoneCode = emailInput.querySelector(".phone-code");
    const countryList = emailInput.querySelector(".country-list");
    const phoneInput = phoneCode.querySelector("input");

    phoneCode.addEventListener("click", function () {
        countryList.classList.toggle("hidden");
    });

    // Handle country selection
    countryList.addEventListener("click", function (e) {
        if (e.target.classList.contains("country-item")) {
            phoneInput.value = e.target.textContent;
            countryList.classList.add("hidden");
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
        if (!phoneCode.contains(e.target)) {
            countryList.classList.add("hidden");
        }
    });
})

emailButton.addEventListener("click", function () {
    emailInput.innerHTML = '';
    emailInput.innerHTML = `
        <input type = "email" placeholder = "Email" id = "email" >
        <button>Share App Link</button>
    `;
})

//EXPLORE OPTION NEAR ME
const accordion_containers = document.querySelectorAll(".accordion-container");
accordion_containers.forEach((accordion_container) => {
    accordion_container.addEventListener("click", function () {
        const data = this.nextElementSibling; // get data
        data.classList.toggle("show");
        const icon = this.querySelector("i");
        icon.classList.toggle("animate");
    });
});

// FOOTER
const firstLanguageSelect = document.querySelector("#firstLanguage");
const secondLanguageSelect = document.querySelector("#secondLanguage");

firstLanguageSelect.addEventListener("click", function () {
    const nationList = document.querySelector(".nation-list");
    nationList.style.display = "flex";
})

secondLanguageSelect.addEventListener("click", function () {
    const languageList = document.querySelector(".language-list");
    languageList.style.display = "block";
})

const nationItems = document.querySelectorAll(".nation-item");
const selectedNation = document.querySelector("#firstLanguage p");
const selectedNationFlag = document.querySelector("#firstLanguage .nation-flag img");

nationItems.forEach(item => {
    item.addEventListener("click", function () {
        const nationText = this.querySelector("p").textContent;
        selectedNation.textContent = nationText;
        const newFlagSrc = this.querySelector(".nation-flag img").src;
        selectedNationFlag.src = newFlagSrc;
        const nationList = document.querySelector(".nation-list");
        nationList.style.display = "none";
    });
});

const languageItems = document.querySelectorAll(".language-item");
const selectedLanguage = document.querySelector("#secondLanguage p");
languageItems.forEach(item => {
    item.addEventListener("click", function () {
        selectedLanguage.textContent = this.textContent;
        const languageList = document.querySelector(".language-list");
        languageList.style.display = "none";
    });
});

document.addEventListener("click", function (e) {
    const languageList = document.querySelector(".language-list");
    const secondLanguageSelect = document.querySelector("#secondLanguage");
    const nationList = document.querySelector(".nation-list");
    const firstLanguageSelect = document.querySelector("#firstLanguage");

    if (!languageList.contains(e.target) && !secondLanguageSelect.contains(e.target)) {
        languageList.style.display = "none";
    }

    if (!nationList.contains(e.target) && !firstLanguageSelect.contains(e.target)) {
        nationList.style.display = "none";
    }
});
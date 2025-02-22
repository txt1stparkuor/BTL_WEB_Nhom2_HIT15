
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


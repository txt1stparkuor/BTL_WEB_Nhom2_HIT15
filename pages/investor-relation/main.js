const menu = document.querySelector('header');
const char = document.querySelectorAll('.menu>ul>a');
const investor = document.querySelector('.investor');
const img = document.querySelector('.logo>img');
document.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        menu.classList.add("scrolled");
        for (let i = 0; i < char.length; i++) {
            char[i].classList.add("scrolled");
        }
        investor.classList.add("scrolled");
        img.src = "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png";
    } else {
        menu.classList.remove("scrolled");
        for (let i = 0; i < char.length; i++) {
            char[i].classList.remove("scrolled");
        }
        investor.classList.remove("scrolled");
        img.src = "https://b.zmtcdn.com/data/o2_assets/d1c6eed080cb5705f0a6112566312bc21684137946.png";
    }
})
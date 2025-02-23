// script.js
document.querySelector('.cta-btn').addEventListener('click', () => {
    alert('Chuyển hướng đến trang đăng ký!');
});
//phần header
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");

    if (window.scrollY > 50) {
        if (!header.classList.contains("scrolled")) {
            header.classList.add("scrolled");
        }
    } else {
        if (header.classList.contains("scrolled")) {
            header.classList.remove("scrolled");
        }
    }
});

// Phần Restaurant
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".restaurant-track");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    
    let index = 0;
    let cardWidth = document.querySelector(".card").offsetWidth + 20; // 20px margin

    function updateSlider() {
        track.style.transform = `translateX(${-index * cardWidth}px)`;
    }

    nextBtn.addEventListener("click", function () {
        if (index < track.children.length - 1) {
            index++;
        } else {
            index = 0;
        }
        updateSlider();
    });

    prevBtn.addEventListener("click", function () {
        if (index > 0) {
            index--;
        } else {
            index = track.children.length - 1;
        }
        updateSlider();
    });

    // Update width on resize
    window.addEventListener("resize", function () {
        cardWidth = document.querySelector(".card").offsetWidth + 20;
        updateSlider();
    });
});
/* <!-- Phần "Frequently....." --> */
document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".fre-question");

    questions.forEach((question) => {
        question.addEventListener("click", function () {
            const item = this.parentElement;

            // Đóng tất cả các item khác khi mở một item
            document.querySelectorAll(".fre-item").forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });

            // Bật/tắt trạng thái active
            item.classList.toggle("active");
        });
    });
});



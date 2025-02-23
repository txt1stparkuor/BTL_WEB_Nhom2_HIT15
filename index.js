//LOAD COMPONENTS
document.addEventListener('DOMContentLoaded', function () {
    fetch('./components/explore-options-near-me/index.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('explore-container').innerHTML = data;
            const exploreScript = document.createElement('script');
            exploreScript.src = './components/explore-options-near-me/script.js';
            document.body.appendChild(exploreScript);
        });
    fetch('./components/footer/index.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            const footerScript = document.createElement('script');
            footerScript.src = './components/footer/script.js';
            document.body.appendChild(footerScript);
        });
})

// HEADER
const inputLocation = document.querySelector('.input-location');
const detectLocation = document.querySelector('.detect-location');
inputLocation.addEventListener('click', (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
    const arrowDown = inputLocation.querySelector('.arrow-down');
    const currIcon = arrowDown.querySelector('i');

    if (currIcon.className === 'fa-solid fa-caret-down') {
        currIcon.className = 'fa-solid fa-caret-up';
        arrowDown.style.transform = 'translateY(-10px)';
    } else {
        currIcon.className = 'fa-solid fa-caret-down';
        arrowDown.style.transform = 'translateY(-10px)';
    }
    detectLocation.style.display = detectLocation.style.display === 'flex'
        ? 'none'
        : 'flex';

});
document.addEventListener('click', () => {
    detectLocation.style.display = 'none';
});



//SEE MORE SEE LESS
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector(".center");
    const hiddenItems = document.querySelectorAll(".hidden");

    toggleButton.addEventListener("click", () => {
        const isHidden = hiddenItems[0].classList.contains("hidden");
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

    countryList.addEventListener("click", function (e) {
        if (e.target.classList.contains("country-item")) {
            phoneInput.value = e.target.textContent;
            countryList.classList.add("hidden");
        }
    });

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

//Change share button
function updateBtnText() {
    let button = document.getElementById('shareBtn');
    if (window.matchMedia("( max-width: 880px)").matches) {
        button.textContent = "Share";
    } else {
        button.textContent = "Share App Link";
    }
}

updateBtnText();
window.matchMedia("(max-width: 880px)").addEventListener("change", updateBtnText);

function overflowText() {
    let text = document.getElementsByClassName('locality-title');
    if (window.matchMedia("(max-width: 1024px)").matches) {

    }
}


//LOGIN-SIGNUP OVERLAY
const loginBtn = document.querySelector('#login-btn');
const signupBtn = document.querySelector('#signup-btn');

const loginOverlay = document.createElement('div');
const signupOverlay = document.createElement('div');
loginOverlay.className = 'login-overlay hidden';
signupOverlay.className = 'signup-overlay hidden';

loginOverlay.innerHTML = `
    <div class="login-container">
        <div class="close-button">
            <i class="fa-solid fa-times"></i>
        </div>
        <h1>Login</h1>
        <div class="phone-input">
            <div class="phone-code">
                <input type="text" placeholder="+91" readonly>
                <div class="arrow-down">
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
            </div>
            <div class="country-list hidden">
            <div class="country-item">
                <img src="https://b.zmtcdn.com/images/flags_z10/in.png" width="30" height="20">+84
            </div>
            <div class="country-item">
                <img src="https://b.zmtcdn.com/images/flags_z10/af.png" width="30" height="20">+86
            </div>
            <div class="country-item">
                <img src="https://b.zmtcdn.com/images/flags_z10/al.png" width="30" height="20">+32
            </div>
            <div class="country-item">
                <img src="https://b.zmtcdn.com/images/flags_z10/dz.png" width="30" height="20">+91
            </div>
            <div class="country-item">
                <img src="https://b.zmtcdn.com/images/flags_z10/as.png" width="30" height="20">+60
            </div>
            <div class="country-item">
                <img src="https://b.zmtcdn.com/images/flags_z10/ad.png" width="30" height="20">+63
            </div>
            <div class="country-item">
                <img src="https://b.zmtcdn.com/images/flags_z10/at.png" width="30" height="20">+94
            </div>
            <div class="country-item">
                <img src="https://b.zmtcdn.com/images/flags_z10/it.png" width="30" height="20">+50
            </div>
        </div>
            <div class="type-container">
                <input type="text" placeholder="Phone">
            </div>
        </div>
        <button class="otp-button">Send One Time Password</button>
        <div class="or">
            <hr>
            <span id="content-or">or</span>
            <hr>
        </div>
        <button id="email-button">
            <i class="fa-regular fa-envelope"></i>
            Continue with Email
        </button>
        <button id="google-button">
            <i class="fa-brands fa-google"></i>
            Continue with Google
        </button>
        <hr class="footer-line">
        <p class="footer-content">
            New to Zomato? <a href="#" id="create-account">Create account</a>
        </p>
    </div>
`;

signupOverlay.innerHTML = `
    <div class="signup-container">
        <div class="close-button">
            <i class="fa-solid fa-times"></i>
        </div>
        <h1>Sign up</h1>
        <div class="sign-input">
            <div class="input-name">
                <input type="text" width="100%" id="nameInput" placeholder=" " required>
                <label for="nameInput">Full Name</label>
            </div>
            <div class="input-email">
                <input type="email" width="100%" id="emailInput" placeholder=" " required>
                <label for="emailInput">Email</label>
            </div>
            <div class="check-box">

                <span>
                    <input type="checkbox">
                    "I agree to Zomato's "
                    <a href="./conditions" class="">Term of Service</a> ", "
                    <a href="./privacy" class="">Chính sách bảo mật</a> "and "
                    <a href="./policies" class="">Content Policies</a>
                </span>
            </div>
        </div>
        <button class="otp-button">Send One Time Password</button>
        <div class="or">
            <hr>
            <span id="content-or">or</span>
            <hr>
        </div>
        <button id="google-button">
            <i class="fa-brands fa-google"></i>
            Continue with Google
        </button>
        <hr class="footer-line">
        <p class="footer-content">
            Already have an account? <a href="#" id="create-account">Log in</a>
        </p>
    </div>
`;

loginBtn.addEventListener("click", function () {
    loginOverlay.classList.toggle('hidden');
    document.body.appendChild(loginOverlay);

    const backdrop = document.createElement('div');
    backdrop.className = 'overlay hidden';
    backdrop.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 998;';
    document.body.appendChild(backdrop);
    backdrop.classList.toggle('hidden');

    backdrop.addEventListener('click', function () {
        loginOverlay.classList.add('hidden');
        backdrop.remove();
    });

    const closeLogin = () => {
        loginOverlay.classList.add('hidden');
        backdrop.remove();
    };

    const closeButton = loginOverlay.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeLogin);
    }
})

signupBtn.addEventListener("click", function () {
    signupOverlay.classList.toggle('hidden');
    document.body.appendChild(signupOverlay);

    const backdrop = document.createElement('div');
    backdrop.className = 'overlay hidden';
    backdrop.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 998;';
    document.body.appendChild(backdrop);
    backdrop.classList.toggle('hidden');

    backdrop.addEventListener('click', function () {
        signupOverlay.classList.add('hidden');
        backdrop.remove();
    });
    const closeSignup = () => {
        signupOverlay.classList.add('hidden');
        backdrop.remove();
    };
    const closeButton = signupOverlay.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeSignup);
    }
})

const initPhoneCodeSelection = () => {
    const phoneCode = loginOverlay.querySelector(".phone-code");
    const countryList = loginOverlay.querySelector(".country-list");
    const phoneInput = phoneCode.querySelector("input");
    const countryItems = loginOverlay.querySelectorAll(".country-item");
    const phoneNumberInput = loginOverlay.querySelector(".type-container input");

    phoneCode.addEventListener("click", (e) => {
        e.stopPropagation();
        countryList.classList.toggle("hidden");
    });

    countryItems.forEach(item => {
        item.addEventListener("click", () => {
            const code = item.textContent.trim();
            phoneInput.value = code;

            countryList.classList.add("hidden");
        });
    });

    document.addEventListener("click", () => {
        countryList.classList.add("hidden");
    });

    phoneNumberInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');

        if (e.target.value.length > 15) {
            e.target.value = e.target.value.slice(0, 15);
        }
    });
};
const phoneCodeHandler = initPhoneCodeSelection();
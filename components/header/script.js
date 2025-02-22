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


// HEADER
const inputLocation = document.querySelector('.input-location');
const detectLocation = document.querySelector('.detect-location');

inputLocation.addEventListener('click', (e) => {
    e.stopPropagation();
    const arrowDown = inputLocation.querySelector('.arrow-down');
    const currIcon = arrowDown.querySelector('i');

    if (currIcon.className === 'fa-solid fa-caret-down') {
        currIcon.className = 'fa-solid fa-caret-up';
        arrowDown.style.transform = 'translateY(-10px)';
        detectLocation.style.display = 'flex';
    } else {
        currIcon.className = 'fa-solid fa-caret-down';
        arrowDown.style.transform = 'translateY(-12px)';
    }
});

detectLocation.addEventListener('click', (e) => {
    e.stopPropagation();
});

document.addEventListener('click', (e) => {
    if (!inputLocation.contains(e.target) && !detectLocation.contains(e.target)) {
        detectLocation.style.display = 'none';
        const arrowDown = inputLocation.querySelector('.arrow-down');
        const currIcon = arrowDown.querySelector('i');
        currIcon.className = 'fa-solid fa-caret-down';
        arrowDown.style.transform = 'translateY(-13px)';
    }
});

// 
const menuIcon = document.querySelector('.menu-icon');
const menuOverlay = document.createElement('div');
menuOverlay.className = 'menu-overlay hidden';

menuOverlay.innerHTML = `
    <div class="menu-container">
        <ul>
            <li class="menu-item" id="menu-login"><a>Log in</a></li>
        </ul>
        <ul>
            <li class="menu-item" id="menu-signup"><a>Sign up</a></li>
        </ul>
    </div>
`;

menuIcon.addEventListener('click', function () {
    menuOverlay.classList.toggle('hidden');
    document.body.appendChild(menuOverlay);

    const menuLogin = menuOverlay.querySelector('#menu-login');
    const menuSignup = menuOverlay.querySelector('#menu-signup');

    menuLogin.addEventListener('click', function () {
        menuOverlay.classList.add('hidden');
        loginBtn.click();
    });

    menuSignup.addEventListener('click', function () {
        menuOverlay.classList.add('hidden');
        signupBtn.click();
    });
});

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

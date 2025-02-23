let originalRestaurantData = [];
let restaurantsContainer;

let activeFilters = {
  highlyRated: false,
  sortByRatingHighToLow: false,
  lowToHighCost: false,
  highToLowCost: false,
  sortByDistance: false,
};

function applyFiltersAndSorting() {
  let filteredData = [...originalRestaurantData];

  if (activeFilters.highlyRated) {
    filteredData = filteredData.filter(
      (restaurant) =>
        typeof restaurant.rating === "number" && restaurant.rating >= 4.5
    );
  }

  if (activeFilters.sortByRatingHighToLow) {
    filteredData = filteredData.sort((a, b) => { 
      const ratingA =
        typeof a.rating === "number" ? a.rating : a.rating === "New" ? 0 : -1;
      const ratingB =
        typeof b.rating === "number" ? b.rating : b.rating === "New" ? 0 : -1;
      return ratingB - ratingA;
    });
  }

  if (activeFilters.lowToHighCost) {
    filteredData = filteredData.sort((a, b) => {
      return a.priceForTwo - b.priceForTwo;
    });
  }

  if (activeFilters.highToLowCost) {
    filteredData = filteredData.sort((a, b) => {
      return b.priceForTwo - a.priceForTwo;
    });
  }

  if (activeFilters.sortByDistance) {
    filteredData = filteredData.sort((a, b) => {
      const distanceA = convertDistanceToMeters(a.distance);
      const distanceB = convertDistanceToMeters(b.distance);
      return distanceA - distanceB;
    });
  }

  displayRestaurants(filteredData);
}

function convertDistanceToMeters(distanceString) {
  const value = parseFloat(distanceString.replace(/[^\d.]/g, ""));
  if (distanceString.includes("km")) return value * 1000;
  if (distanceString.includes("m")) return value;
}

function toggleFilter(filterName, categoryElement) {
  activeFilters[filterName] = !activeFilters[filterName];

  if (activeFilters[filterName]) {
    categoryElement.classList.add("active-filter-category");
    categoryElement.innerHTML = `${categoryElement.textContent} <i class="fa-solid fa-xmark"></i>`;
  } else {
    categoryElement.classList.remove("active-filter-category");
    categoryElement.innerHTML = categoryElement.textContent.replace(
      ' <i class="fa-solid fa-xmark"></i>',
      ""
    );
  }
  applyFiltersAndSorting();
}

function displayRestaurants(restaurantList) {
  restaurantsContainer.innerHTML = "";
  restaurantList.forEach((restaurant) => {
    const {
      discount,
      isPromoted,
      rating,
      image,
      name,
      cuisine,
      priceForTwo,
      location,
      distance,
    } = restaurant;

    let discountHTML = "";
    if (discount !== undefined && discount !== null) {
      discountHTML = `
            <div class="discount">
              <img src="https://b.zmtcdn.com/data/o2_assets/c0e0fe766225fb9cdb3245a9915571201716296953.png" alt="Zomato Walkin">
              <p>Flat ${discount}% OFF</p>
            </div>
          `;
    }

    let promotedHTML = "";
    if (isPromoted === true) {
      promotedHTML = `
            <div class="promoted">
              <p>Promoted</p>
            </div>
          `;
    }

    let ratingClass = "";
    if (rating === null) ratingClass = "unrated";
    if (rating === "New") ratingClass = "new-restaurant";
    if (rating >= 4.5) ratingClass = "highly-rated";
    const restaurantHTML = `
          <div class="img-wrap stacked">
            <img src="${image}" alt="${name}">
            ${discountHTML}
            ${promotedHTML}
          </div>
          <div class="name-and-rating info-container">
            <p class="text-overflow-util">${name}</p>
            <p class="${ratingClass}">${
      rating === null ? "-" : rating
    } <i class="fa-solid fa-star"></i></p>
          </div>
          <div class="cusine-and-price info-container">
            <p class="text-overflow-util">${cuisine}</p>
            <p class="text-overflow-util">₹${priceForTwo} for two</p>
          </div>
          <div class="location-and-distance info-container">
            <p class="text-overflow-util">${location}</p>
            <p class="text-overflow-util">${distance}</p>
          </div>
      `;
    let restaurantContainer = document.createElement("a");
    restaurantContainer.innerHTML = restaurantHTML;
    restaurantContainer.classList.add("restaurant");
    restaurantsContainer.appendChild(restaurantContainer);
  });
}

function initializeSwiper() {
  const swiperEl = document.querySelector(".swiper");
  if (swiperEl) {
    const swiper = new Swiper(swiperEl, {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          spaceBetween: 10,
          slidesPerView: "auto",
        },
        768: {
          spaceBetween: 10,
          slidesPerView: 4,
        },
        991: {
          simulateTouch: false,
          spaceBetween: 20,
          slidesPerView: 4,
        },
      },
    });
  }
}

async function loadMainTemplate() {
  try {
    const response = await fetch(
      "../../components/dining-night-life-delivery/main-template.html"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    document.getElementById('main-content').innerHTML = html; // Insert into main-content div
    restaurantsContainer = document.querySelector(".restaurants");
    return true;
  } catch (error) {
    console.error("Error loading main template:", error);
    return false;
  }
}

async function loadHeader() {
    try {
        const response = await fetch('../../components/header/index.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        document.getElementById('header').innerHTML = data;
        const headerScript = document.createElement('script');
        headerScript.src = '../../components/header/script.js';
        document.body.appendChild(headerScript);
        return true;
    } catch (error) {
        console.error("Error loading header:", error);
        return false;
    }
}

async function loadFooter() {
    try {
        const response = await fetch('../../components/footer/index.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        document.getElementById('footer').innerHTML = data;
        const footerScript = document.createElement('script');
        footerScript.src = '../../components/footer/script.js';
        document.body.appendChild(footerScript);
        return true;
    } catch (error) {
        console.error("Error loading footer:", error);
        return false;
    }
}


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [headerLoaded, mainTemplateLoaded, footerLoaded] = await Promise.all([
      loadHeader(),
      loadMainTemplate(),
      loadFooter(),
    ]);

    if (mainTemplateLoaded) {
      initializeSwiper();
      fetch("cards.json")
        .then((response) => response.json())
        .then((data) => {
          originalRestaurantData = [...data];
          displayRestaurants(originalRestaurantData);

          const filterCategories = document.querySelectorAll(
            ".filter .filter__category"
          );

          const filterNames = [
            "highlyRated",
            "sortByRatingHighToLow",
            "lowToHighCost",
            "highToLowCost",
            "sortByDistance",
          ];

          filterCategories.forEach((category, index) => {
            category.addEventListener("click", () => {
              toggleFilter(filterNames[index], category);
            });
          });
        })
        .catch((error) =>
          console.error("Error loading restaurant data:", error)
        );
    } else {
      console.error("Failed to load main template. Restaurant data and Swiper initialization skipped.");
    }

    if (!headerLoaded) {
      console.error("Failed to load header.");
    }
    if (!footerLoaded) {
      console.error("Failed to load footer.");
    }

  } catch (error) {
    console.error("Error during initial page load:", error);
  }
});
//init swiperJS
const swiper = new Swiper(".swiper", {
  spaceBetween: 20,
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
      slidesPerView: 1,
    },
    620: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

let originalRestaurantData = [];
const restaurantsContainer = document.querySelector(".restaurants");

let activeFilters = {
  highlyRated: false,
  sortByRating: false,
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

  if (activeFilters.sortByRating) {
    filteredData = filteredData.sort((a, b) => {
      if (a.rating === "New") return 1;
      if (b.rating === "New") return -1;
      return b.rating - a.rating;
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

function toggleFilter(filterName) {
  activeFilters[filterName] = !activeFilters[filterName];
  applyFiltersAndSorting();
}

function displayRestaurants(restaurantList) {
  restaurantsContainer.innerHTML = "";
  restaurantList.forEach((restaurant) => {
    let discountHTML = "";
    if (restaurant.discount !== undefined && restaurant.discount !== null) {
      discountHTML = `
            <div class="discount">
              <img src="https://b.zmtcdn.com/data/o2_assets/c0e0fe766225fb9cdb3245a9915571201716296953.png" alt="Zomato Walkin">
              <p>Flat ${restaurant.discount}% OFF</p>
            </div>
          `;
    }
    let ratingClass = "";
    if (restaurant.rating === "New") ratingClass = "new-restaurant";
    if (typeof restaurant.rating === "number" && restaurant.rating >= 4.5)
      ratingClass = "highly-rated";

    const restaurantHTML = `
        <div class="restaurant">
          <div class="img-wrap stacked">
            <img src="${restaurant.image}" alt="${restaurant.name}">
            ${discountHTML}
          </div>
          <div class="name-and-rating info-container">
            <p class="text-overflow">${restaurant.name}</p>
            <p class="${ratingClass}">${restaurant.rating}  <i class="fa-solid fa-star"></i></p>
          </div>
          <div class="cusine-and-price info-container">
            <p class="text-overflow">${restaurant.cuisine}</p>
            <p class="text-overflow">₹${restaurant.priceForTwo} for two</p>
          </div>
          <div class="location-and-distance info-container">
            <p class="text-overflow">${restaurant.location}</p>
            <p class="text-overflow">${restaurant.distance}</p>
          </div>
        </div>
      `;
    let restaurantDiv = document.createElement("div");
    restaurantDiv.innerHTML = restaurantHTML;
    restaurantsContainer.appendChild(restaurantDiv);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("cards.json")
    .then((response) => response.json())
    .then((data) => {
      originalRestaurantData = [...data];
      displayRestaurants(originalRestaurantData);

      const ratingFilterButton = document.querySelector(
        ".filter__category:nth-child(2)"
      );
      ratingFilterButton.addEventListener("click", () => {
        ratingFilterButton.classList.toggle("active-filter-category");
        toggleFilter("highlyRated");
      });

      const sortByRatingButton = document.querySelector(
        ".filter__category:nth-child(3)"
      );
      sortByRatingButton.addEventListener("click", () => {
        sortByRatingButton.classList.toggle("active-filter-category");
        toggleFilter("sortByRating");
      });
      const lowToHighCostButton = document.querySelector(
        ".filter__category:nth-child(4)"
      );
      lowToHighCostButton.addEventListener("click", () => {
        lowToHighCostButton.classList.toggle("active-filter-category");
        toggleFilter("lowToHighCost");
      });

      const highToLowCostButton = document.querySelector(
        ".filter__category:nth-child(5)"
      );
      highToLowCostButton.addEventListener("click", () => {
        highToLowCostButton.classList.toggle("active-filter-category");
        toggleFilter("highToLowCost");
      });

      const sortByDistanceButton = document.querySelector(
        ".filter__category:nth-child(6)"
      );
      sortByDistanceButton.addEventListener("click", () => {
        sortByDistanceButton.classList.toggle("active-filter-category");
        toggleFilter("sortByDistance");
      });
    })
    .catch((error) => console.error("Error loading restaurant data:", error));
});

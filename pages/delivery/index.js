// initialize swiperJS
const foodSwiper = new Swiper(".food-swiper", {
  navigation: {
    nextEl: ".food-swiper-button-next",
    prevEl: ".food-swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: "auto",
      spaceBetween: 10,
    },
    576: {
      slidesPerView: "auto",
      spaceBetween: 10,
    },
    769: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 40,
      simulateTouch: false,
    },
  },
});

const brandSwiper = new Swiper(".brand-swiper", {
  slidesPerView: 6,
  spaceBetween: 40,
  navigation: {
    nextEl: ".brand-swiper-button-next",
    prevEl: ".brand-swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: "auto",
      spaceBetween: 10,
    },
    576: {
      slidesPerView: "auto",
      spaceBetween: 10,
    },
    769: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 40,
      simulateTouch: false,
    },
  },
});

let originalFoodData = [];

let activeFilters = {
  sortByRatingHighToLow: false,
  lowToHighCost: false,
  highToLowCost: false,
  sortByDeliveryTime: false,
};

function getPrice(priceString) {
  return parseFloat(priceString.replace(/[^\d.]/g, ""));
}

function getDeliveryTime(deliveryTimeString) {
  const timeValue = parseInt(deliveryTimeString.replace(/[^\d.]/g, ""));
  if (deliveryTimeString.includes("hr")) {
    return timeValue * 60;
  } else if (deliveryTimeString.includes("min")) {
    return timeValue;
  }
  return 0;
}

function displayFoodItems(foodItemList) {
  const foodListContainer = document.querySelector(".food-list");
  foodListContainer.innerHTML = "";
  foodItemList.forEach((foodItem) => {
    const {
      discount,
      isPromoted,
      rating,
      imageSrc,
      name,
      cuisine,
      price,
      deliveryTime,
    } = foodItem;

    let discountHTML = "";
    if (discount !== undefined && discount !== null) {
      discountHTML = `
            <div class="discount">
              <p class="text-overflow-util">${discount}</p>
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
    if (rating === "New") ratingClass = "new-foodItem";
    if (rating >= 4.5) ratingClass = "highly-rated";

    const foodItemHTML = `
        <div class="img-wrap stacked">
            <img src="${imageSrc}"
                alt="${name}">
            ${discountHTML}
            ${promotedHTML}
        </div>
        <div class="name-and-rating info-container">
            <p class="text-overflow-util">${name}</p>
            <p class="${ratingClass}">${rating === null ? "-" : rating}
            <i class="fa-solid fa-star"></i></p>
        </div>
        <div class="cusine-and-price info-container">
            <p class="text-overflow-util">${cuisine}</p>
            <p class="text-overflow-util">${price}</p>
        </div>
        <div class="delivery-time info-container">
            <p>${deliveryTime}</p>
        </div>`;

    let foodItemContainer = document.createElement("a");
    foodItemContainer.classList.add("food-item");
    foodItemContainer.innerHTML = foodItemHTML;
    foodListContainer.appendChild(foodItemContainer);
  });
}

function applyFiltersAndSorting() {
  let filteredData = [...originalFoodData];

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
      const priceValueA = getPrice(a.price);
      const priceValueB = getPrice(b.price);
      return priceValueA - priceValueB;
    });
  }

  if (activeFilters.highToLowCost) {
    filteredData = filteredData.sort((a, b) => {
      const priceValueA = getPrice(a.price);
      const priceValueB = getPrice(b.price);
      return priceValueB - priceValueA;
    });
  }

  if (activeFilters.sortByDeliveryTime) {
    filteredData = filteredData.sort((a, b) => {
      const deliveryTimeA = getDeliveryTime(a.deliveryTime);
      const deliveryTimeB = getDeliveryTime(b.deliveryTime);
      return deliveryTimeA - deliveryTimeB;
    });
  }

  displayFoodItems(filteredData);
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

function filterByCuisine(searchTerm) {
  const lowerSearchTerm = searchTerm.toLowerCase();
  const filteredCuisineData = originalFoodData.filter((foodItem) => {
    const cuisinesArray = foodItem.cuisine.split(", ");
    return cuisinesArray.some((cuisine) => {
      const lowerCuisine = cuisine.toLowerCase().trim();
      const regex = new RegExp("\\b" + lowerSearchTerm + "\\b", "i");
      return regex.test(lowerCuisine);
    });
  });
  displayFoodItems(filteredCuisineData);
}

function setupCuisineSearch() {
  const cuisineSearchWrap = document.querySelector(".cuisine-search-wrap");
  const cuisineInput = document.querySelector(".cuisine-input");
  const exitSearchIcon = document.querySelector(".exit-search");
  const clearAllButton = document.querySelector(".button__clear-all");
  const applyButton = document.querySelector(".button__apply");
  const cuisineSearchCategoryButton = document.querySelector(
    ".filter__category.cuisine-search"
  );

  cuisineSearchWrap.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      filterByCuisine(cuisineInput.value);
    }
  });

  exitSearchIcon.addEventListener("click", () => {
    cuisineInput.value = "";
  });

  clearAllButton.addEventListener("click", () => {
    cuisineInput.value = "";
    displayFoodItems(originalFoodData);
    cuisineSearchWrap.style.display = "none";
  });

  applyButton.addEventListener("click", () => {
    filterByCuisine(cuisineInput.value.trim());
  });

  cuisineSearchCategoryButton.addEventListener("click", () => {
    cuisineSearchWrap.style.display =
      cuisineSearchWrap.style.display === "block" ? "none" : "block";
    if (cuisineSearchWrap.style.display === "block") cuisineInput.focus();
  });

  document.addEventListener("click", (event) => {
    if (cuisineSearchWrap.style.display === "block") {
      const isClickInside =
        cuisineSearchWrap.contains(event.target) ||
        cuisineSearchCategoryButton.contains(event.target);
      if (!isClickInside) cuisineSearchWrap.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("cards.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    originalFoodData = [...data];
    displayFoodItems(originalFoodData);

    const filterCategories = document.querySelectorAll(
      ".filter .filter__category:not(.cuisine-search)"
    );

    const filterNames = [
      "sortByRatingHighToLow",
      "lowToHighCost",
      "highToLowCost",
      "sortByDeliveryTime",
    ];

    filterCategories.forEach((category, index) => {
      category.addEventListener("click", () => {
        toggleFilter(filterNames[index], category);
      });
    });

    setupCuisineSearch();
  } catch (error) {
    console.error("Error loading food data:", error);
  }
});

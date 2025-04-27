// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/api/products')
//       .then(response => response.json())
//       .then(products => {
//         displayProducts(products);
//         setupSearchAndFilter(products);
//       });
//   });
  
//   function displayProducts(products) {
//     const productContainer = document.getElementById('featured-products');
//     productContainer.innerHTML = '';
//     products.forEach(product => {
//       const productCard = document.createElement('div');
//       productCard.className = 'product-card';
//       productCard.innerHTML = `
//         <img src="${product.image}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <p>$${product.price}</p>
//         <button onclick="addToCart('${product._id}')">Add to Cart</button>
//       `;
//       productContainer.appendChild(productCard);
//     });
//   }
  
//   function setupSearchAndFilter(products) {
//     const searchInput = document.getElementById('search');
//     const categoryFilter = document.getElementById('category-filter');
  
//     searchInput.addEventListener('input', (e) => {
//       const searchTerm = e.target.value.toLowerCase();
//       const filteredProducts = products.filter(product =>
//         product.name.toLowerCase().includes(searchTerm)
//       );
//       displayProducts(filteredProducts);
//     });
  
//     categoryFilter.addEventListener('change', (e) => {
//       const category = e.target.value;
//       const filteredProducts = category === 'all'
//         ? products
//         : products.filter(product => product.category === category);
//       displayProducts(filteredProducts);
//     });
//   }
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) slideIndex = 0;
    if (index < 0) slideIndex = totalSlides - 1;

    document.querySelector(".slides").style.transform = `translateX(${-slideIndex * 100}%)`;
    updateDots();
}

function moveSlide(n) {
    slideIndex += n;
    showSlide(slideIndex);
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlide(slideIndex);
}

function updateDots() {
    let dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndex].classList.add("active");
}

// Auto-slide function
function autoSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

// Start auto-slide every 3 seconds
let slideInterval = setInterval(autoSlide, 3000);

// Pause auto-slide on hover
document.querySelector(".carousel").addEventListener("mouseover", () => {
    clearInterval(slideInterval);
});

// Resume auto-slide when mouse leaves
document.querySelector(".carousel").addEventListener("mouseleave", () => {
    slideInterval = setInterval(autoSlide, 3000);
});
console.log("Slide changed to:", slideIndex);
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const products = document.querySelectorAll(".product-card");

  tabs.forEach(tab => {
      tab.addEventListener("click", function () {
          let category = this.getAttribute("data-category");

          // Remove active class from all tabs
          tabs.forEach(tab => tab.classList.remove("active"));
          this.classList.add("active");

          // Show/Hide Products based on category
          products.forEach(product => {
              if (category === "all" || product.getAttribute("data-category") === category) {
                  product.style.display = "block";
              } else {
                  product.style.display = "none";
              }
          });
      });
  });
});
const container = document.querySelector(".ad-section");

setInterval(() => {
    container.scrollBy({
        left: 250,
        behavior: "smooth"
    });
}, 2000);
const slider = document.querySelector('.product-slider');

setInterval(() => {
    slider.scrollBy({
        left: 250,
        behavior: "smooth"
    });
}, 2000);








document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".product-slider");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    const scrollAmount = 200; // Pixels to scroll per click

    nextButton.addEventListener("click", function () {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevButton.addEventListener("click", function () {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
});
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Store and load language/country selection
document.addEventListener("DOMContentLoaded", function() {
    let langSelect = document.getElementById("language-select");
    let countrySelect = document.getElementById("country-select");

    // Load stored preferences
    langSelect.value = localStorage.getItem("language") || "en";
    countrySelect.value = localStorage.getItem("country") || "IN";

    // Save on change
    langSelect.addEventListener("change", function() {
        localStorage.setItem("language", this.value);
    });

    countrySelect.addEventListener("change", function() {
        localStorage.setItem("country", this.value);
    });
});


const countries = [
    "All", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
    "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Botswana","india",
];

function toggleDropdown() {
    const dropdown = document.getElementById("dropdownContent");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function filterCountries() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let countryList = document.getElementById("countryList");
    countryList.innerHTML = "";

    countries.forEach(country => {
        if (country.toLowerCase().includes(input)) {
            let li = document.createElement("li");
            li.textContent = country;
            li.onclick = () => selectCountry(country);
            countryList.appendChild(li);
        }
    });
}

function selectCountry(country) {
    document.getElementById("selected-location").innerText = country;
    document.getElementById("dropdownContent").style.display = "none";
}

// Initialize country list on load
document.addEventListener("DOMContentLoaded", filterCountries);

//add card



document.addEventListener('DOMContentLoaded', function() {
    const profileBtn = document.querySelector('.profile-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
  
    profileBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent the click from immediately being handled by document
      dropdownMenu.classList.toggle('show');
    });
  
    // Close the dropdown when clicking outside
    document.addEventListener('click', function() {
      dropdownMenu.classList.remove('show');
    });
  
    // Prevent dropdown from closing when clicking inside it
    dropdownMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });









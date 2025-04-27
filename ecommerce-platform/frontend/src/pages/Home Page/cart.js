document.addEventListener("DOMContentLoaded", function () {
    // Function to update the cart count display
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        document.querySelector(".cart-count").innerText = cart.length;
    }

    // Function to add item to cart
    function addToCart(title, price, imageURL) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Check if the item already exists
        let existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity += 1;  // Increment quantity if item exists
        } else {
            cart.push({ title, price, imageURL, quantity: 1 });
        }

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${title} added to cart!`);
    }

    // Attach event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".product-card");
            let title = productCard.querySelector("h3").innerText;
            let price = productCard.querySelector(".new-price").innerText.replace("₹", "").trim();
            let imageURL = productCard.querySelector("img").src;

            addToCart(title, parseFloat(price), imageURL);
        });
    });

    // Initialize cart count on page load
    updateCartCount();
});

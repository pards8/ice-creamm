document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartButton = document.getElementById("cartButton");
    const cartCount = document.getElementById("cartCount");
    const orderNotification = document.getElementById("orderNotification");

    // Create a cart modal dynamically
    const cartModal = document.createElement("div");
    cartModal.id = "cartModal";
    cartModal.className = "cart-modal";
    cartModal.innerHTML = `
        <div class="cart-header">
            <h4>Your Cart</h4>
            <button class="btn-close-cart">&times;</button>
        </div>
        <div class="cart-body"></div>
        <div class="cart-footer">
            <button class="btn btn-secondary clear-cart">Clear Cart</button>
            <button class="btn btn-primary checkout">Checkout</button>
        </div>
    `;
    document.body.appendChild(cartModal);

    const cartBody = cartModal.querySelector(".cart-body");
    const clearCartButton = cartModal.querySelector(".clear-cart");
    const checkoutButton = cartModal.querySelector(".checkout");
    const closeCartButton = cartModal.querySelector(".btn-close-cart");

    // Update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Add item to cart
    function addToCart(name, price) {
        cart.push({ name, price });
        updateCartCount();
        orderNotification.textContent = `${name} added to your cart!`;
        orderNotification.classList.add("visible");

        setTimeout(() => {
            orderNotification.classList.remove("visible");
        }, 2000);
    }

    // Render cart items
    function renderCart() {
        cartBody.innerHTML = cart.length
            ? cart.map((item, index) => `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>$${item.price}</span>
                    <button class="btn btn-sm btn-danger remove-item" data-index="${index}">Remove</button>
                </div>
            `).join("")
            : "<p>Your cart is empty.</p>";
    }

    // Clear cart
    clearCartButton.addEventListener("click", () => {
        cart.length = 0;
        updateCartCount();
        renderCart();
    });

    // Checkout (reset cart)
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) return alert("Your cart is empty!");
        alert("Checkout successful!");
        cart.length = 0;
        updateCartCount();
        renderCart();
    });

    // Open/close cart modal
    cartButton.addEventListener("click", () => {
        renderCart();
        cartModal.classList.toggle("open");
    });

    closeCartButton.addEventListener("click", () => {
        cartModal.classList.remove("open");
    });

    // Remove single item
    cartBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCartCount();
            renderCart();
        }
    });

    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.dataset.productName;
            const price = button.dataset.price;
            addToCart(name, price);
        });
    });
});

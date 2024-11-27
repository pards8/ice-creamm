let cart = [];

function updateCart() {
    const cartItemsElement = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");

    cartItemsElement.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("li");
        cartItem.className = "list-group-item d-flex justify-content-between align-items-center";

        cartItem.innerHTML = `
            <div>
                ${item.name} (${item.serveType} - ${item.size})
            </div>
            <div class="d-flex align-items-center">
                $<span>${item.price.toFixed(2)}</span> x 
                <input type="number" class="form-control quantity-input ms-2" 
                       value="${item.quantity}" min="1" style="width: 60px;"
                       data-index="${index}">
                <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${index})">&times;</button>
            </div>
        `;

        cartItemsElement.appendChild(cartItem);
    });

    cartTotalElement.textContent = total.toFixed(2);

    document.getElementById("cartCount").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Function to handle manual quantity changes
document.getElementById("cartItems").addEventListener("input", function (event) {
    if (event.target.classList.contains("quantity-input")) {
        const index = parseInt(event.target.dataset.index);
        const newQuantity = parseInt(event.target.value);

        if (newQuantity <= 0) {
            cart.splice(index, 1); // Remove the item if quantity is 0 or less
        } else {
            cart[index].quantity = newQuantity; // Update the quantity
        }

        updateCart();
    }
});

// Add to cart function
function addToCart(productName, price, serveTypeId, sizeId) {
    const serveType = document.getElementById(serveTypeId).value;
    const size = document.getElementById(sizeId).value;

    const existingItemIndex = cart.findIndex(
        (item) => item.name === productName && item.serveType === serveType && item.size === size
    );

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: parseFloat(price),
            serveType: serveType,
            size: size,
            quantity: 1,
        });
    }

    updateCart();
}

function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Add event listeners for adding to cart
document.querySelectorAll(".add-to-cart-confirm").forEach((button) => {
    button.addEventListener("click", (event) => {
        const productName = event.target.getAttribute("data-product-name");
        const price = event.target.getAttribute("data-price");
        const serveTypeId = event.target.getAttribute("data-serve-id");
        const sizeId = event.target.getAttribute("data-size-id");

        addToCart(productName, price, serveTypeId, sizeId);

        const modal = bootstrap.Modal.getInstance(event.target.closest(".modal"));
        modal.hide();
    });
});

// Checkout event
document.getElementById("checkoutButton").addEventListener("click", () => {
    alert("Thank you for Ordering!!");
});

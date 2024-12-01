let cart = [];

function updateCart() {
    const cartItemsElement = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");
    const cartCountElement = document.getElementById("cartCount");

    cartItemsElement.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

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
    cartCountElement.textContent = totalItems;
}

document.getElementById("cartItems").addEventListener("input", function (event) {
    if (event.target.classList.contains("quantity-input")) {
        const index = parseInt(event.target.dataset.index);
        const newQuantity = parseInt(event.target.value);

        if (!isNaN(newQuantity) && newQuantity > 0) {
            cart[index].quantity = newQuantity;
        } else {
            cart[index].quantity = 1;
        }

        updateCart();
    }
});

function addToCart(productName, price, serveTypeId, sizeId) {
    const serveTypeElement = document.getElementById(serveTypeId);
    const sizeElement = document.getElementById(sizeId);

    if (!serveTypeElement || !sizeElement) return;

    const serveType = serveTypeElement.value;
    const size = sizeElement.value;

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

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCart();
    }
}

document.querySelectorAll(".add-to-cart-confirm").forEach((button) => {
    button.addEventListener("click", (event) => {
        const productName = event.target.getAttribute("data-product-name");
        const price = event.target.getAttribute("data-price");
        const serveTypeId = event.target.getAttribute("data-serve-id");
        const sizeId = event.target.getAttribute("data-size-id");

        addToCart(productName, price, serveTypeId, sizeId);

        const modalElement = event.target.closest(".modal");
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
        }
    });
});

document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length > 0) {
        alert("Thank you for ordering!");
        cart = [];
        updateCart();
    } else {
        alert("Your cart is empty!");
    }
});

 
const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    icon: "https://via.placeholder.com/100",
};


document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.getElementById("userName");
    const userEmailElement = document.getElementById("userEmail");
    const userIconElement = document.getElementById("userIcon");

    userNameElement.textContent = mockUser.name;
    userEmailElement.textContent = mockUser.email;
    userIconElement.src = mockUser.icon;
});

document.getElementById("logoutButton").addEventListener("click", function () {
    console.log("User has been logged out");


    cart = [];
    updateCart();

    window.location.href = "/login.html"; 
});

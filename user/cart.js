<script>
    const cart = [];
    const cartButton = document.getElementById('cartButton');
    const cartItemsList = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Add event listener for cart button
    cartButton.addEventListener('click', () => {
        cartItemsList.innerHTML = ''; // Clear existing items
        let total = 0;

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                ${item.name} - $${item.price}
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsList.appendChild(listItem);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                cartButton.click(); // Refresh the modal
            });
        });

        // Show the modal
        new bootstrap.Modal(document.getElementById('cartModal')).show();
    });

    // Add to cart function
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.dataset.productName;
            const price = parseFloat(button.dataset.price);
            cart.push({ name: productName, price });
            const cartCount = document.getElementById('cartCount');
            cartCount.textContent = cart.length;
        });
    });
</script>
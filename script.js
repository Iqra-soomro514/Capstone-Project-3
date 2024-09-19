document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    let cart = [];

    // Function to render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            cart.forEach((item, index) => {
                const cartItemHTML = `
                    <div class="cart-item d-flex align-items-center justify-content-between mb-3">
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid" width="50">
                            <div class="ms-3">
                                <h6 class="mb-0">${item.name}</h6>
                                <p class="mb-0">$${item.price}</p>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">Remove</button>
                    </div>
                `;
                cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
            });

            // Attach remove button event listeners after items are rendered
            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    removeFromCart(index);
                });
            });
        }
    }

    // Function to add items to cart
    function addToCart(product) {
        cart.push(product);
        renderCartItems();
        var myOffcanvas = new bootstrap.Offcanvas(document.getElementById('shoppingCart'));
        myOffcanvas.show();
    }

    // Function to remove items from cart
    function removeFromCart(index) {
        cart.splice(index, 1); // Remove item at index
        renderCartItems(); // Re-render cart
    }

    // Event listener for Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const product = {
                name: productCard.querySelector('.card-title').innerText,
                price: productCard.querySelector('.price').innerText.replace('$', ''),
                image: productCard.querySelector('.default-img').src
            };
            addToCart(product);
        });
    });
});

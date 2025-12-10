// ----------------------------
//   VARIABLES DEL CARRITO
// ----------------------------
let cart = [];

// Cargar carrito
function loadCartFromLocalStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar carrito
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Agregar producto
function addToCart(id, name, price, emoji) {
    let existing = cart.find(p => p.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1,
            emoji
        });
    }

    saveCartToLocalStorage();
    updateCartUI();
}

// Quitar producto
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartToLocalStorage();
    updateCartUI();
}

// ----------------------------
//   ACTUALIZAR UI DEL CARRITO
// ----------------------------
function updateCartUI() {
    const cartCount = document.getElementById("cartCount") || document.getElementById("cartNumber");
    const cartItemsContainer = document.getElementById("cartItems");
    const cartSubtotal = document.getElementById("cartSubtotal");

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = `(${totalItems})`;

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-12">
                <div class="text-6xl mb-6" style="color: #9ca3af;">×</div>
                <p class="text-base" style="color: #64748b;">Tu carrito está vacío</p>
            </div>
        `;
        if (cartSubtotal) cartSubtotal.textContent = "$0.00";
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="https://guyamode.com/collection_producto_${item.id}.png"
                 class="cart-item-image">

            <div class="flex-1">
                <h4 class="font-semibold text-sm">${item.name}</h4>
                <p class="text-xs">Cantidad: ${item.quantity}</p>
                <p class="font-bold">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <button class="remove-from-cart"
                    data-product-id="${item.id}">×</button>
        `;

        cartItemsContainer.appendChild(div);
    });

    // Botones eliminar
    document.querySelectorAll(".remove-from-cart").forEach(btn => {
        btn.onclick = () => {
            removeFromCart(parseInt(btn.dataset.productId));
        };
    });

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
}

// ----------------------------
//   OPEN / CLOSE SIDEBAR
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.getElementById("cartBtn");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    if (cartBtn) cartBtn.onclick = () => {
        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");
    };

    if (closeCart) closeCart.onclick = closeCartSidebar;
    if (cartOverlay) cartOverlay.onclick = closeCartSidebar;

    function closeCartSidebar() {
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
    }

    // Inicializar
    loadCartFromLocalStorage();
    updateCartUI();
});

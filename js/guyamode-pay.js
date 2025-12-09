// CLAVE PÚBLICA CULQI
document.addEventListener("DOMContentLoaded", () => {
    if (window.Culqi) {
        Culqi.publicKey = "pk_test_e94078b9f457a719";
    }
});

// Obtener total del carrito desde tu localStorage
function getCartTotal() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Cuando se hace clic en “Proceder al Pago”
document.addEventListener("click", (e) => {
    if (e.target.id === "checkoutBtn") {
        let total = getCartTotal();

        Culqi.settings({
            title: "GuyaMode",
            currency: "PEN",
            amount: total * 100,
        });

        Culqi.open();
    }
});

// Callback de Culqi
function culqi() {
    if (Culqi.token) {
        const token = Culqi.token.id;
        alert("Token recibido: " + token);

        // Después se conecta al backend
    }
}

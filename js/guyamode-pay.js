// CLAVE PÚBLICA CULQI
document.addEventListener("DOMContentLoaded", () => {
    if (window.Culqi) {
        Culqi.publicKey = "pk_test_e94078b9f457a719";
    }
});

// Obtener total del carrito desde localStorage REAL
function getCartTotal() {
    let cart = JSON.parse(localStorage.getItem('guyamode_home_cart') || '[]');
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Evento del botón “Proceder al Pago”
document.addEventListener("click", (e) => {
    if (e.target.id === "checkoutBtn") {

        let total = getCartTotal(); // Total en S/

        if (total <= 0) {
            alert("El carrito está vacío");
            return;
        }

        Culqi.settings({
            title: "GuyaMode",
            currency: "PEN",
            amount: Math.round(total * 100),  // centavos
        });

        Culqi.open();
    }
});

// Callback de Culqi
function culqi() {
    if (Culqi.token) {
        const token = Culqi.token.id;
        alert("Token recibido: " + token);

        // AQUI se envía al backend (modo producción)
    }
}

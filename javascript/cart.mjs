// Funksjon for å oppdatere antallet produkter i handlekurven
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = itemCount;
}

// Funksjon for å legge til et produkt i handlekurven
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((item) => item.id === product.id);

  if (productIndex !== -1) {
    cart[productIndex].quantity += 1; // Øker antallet hvis produktet allerede er i kurven
  } else {
    product.quantity = 1;
    cart.push(product); // Legger til et nytt produkt i handlekurven
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // Oppdaterer handlekurvens antall
}

// Eksporter funksjonene hvis du bruker moduler
export { addToCart, updateCartCount };

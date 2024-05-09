/* Legge til en funksjon med rediger handlevogn, totalsum, riktig størrelse */


document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
});

function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) {
    console.error("The cart container element is missing in the HTML.");
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Loaded cart items:", cartItems);

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0; // Initialiserer totalen som 0
  const itemsHtml = cartItems.map(item => {
    total += item.price * item.quantity; // Legger til produktets totalpris til totalen
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" style="width:100px; height:auto;">
        <h4>${item.title}</h4>
        <p>Description: ${item.description}</p>
        <p>Color: ${item.baseColor}</p>
        <p>Size: ${item.sizes.join(', ')}</p>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
    `;
  }).join("");

  const checkoutHtml = `
    <div class="info-payment-container">
      <div class="info-section">
        <h3>Contact Information</h3>
        <input type="text" id="first-name" placeholder="First Name" required autocomplete="given-name">
        <input type="text" id="last-name" placeholder="Last Name" required autocomplete="family-name">
        <input type="email" id="email" placeholder="Email" required autocomplete="email">
        <input type="tel" id="phone" placeholder="Phone Number" required autocomplete="tel">
      </div>
      <div class="address-section">
        <h3>Delivery Address</h3>
        <input type="text" id="country" placeholder="Country" required autocomplete="country-name">
        <input type="text" id="address" placeholder="Street Address" required autocomplete="address-line1">
        <input type="text" id="zip" placeholder="Postal Code" required autocomplete="postal-code">
        <input type="text" id="city" placeholder="City" required autocomplete="address-level2">
      </div>
    </div>
    <div class="payment-section">
      <h3>Payment Details</h3>
      <input type="text" id="card-number" placeholder="Card Number" required autocomplete="cc-number">
      <input type="text" id="exp-date" placeholder="Expiration Date (MM/YY)" required autocomplete="cc-exp">
      <input type="text" id="cvv" placeholder="Security Code" required autocomplete="cc-csc">
      <input type="text" id="card-name" placeholder="Name on Card" required autocomplete="cc-name">
    </div>
    <div class="total-section">
      <h3>Total Amount: $${total.toFixed(2)}</h3>
    </div>
    <button type="submit">Place Order</button>
  `;

  cartContainer.innerHTML = `<div>${itemsHtml}</div><form id="checkout-form" class="checkout-form">${checkoutHtml}</form>`;
}


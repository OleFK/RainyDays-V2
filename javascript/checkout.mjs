import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";

document.addEventListener("DOMContentLoaded", () => {
  showLoadingIndicator();

  try {
    displayCartItems();
    attachFormHandler();

    setTimeout(() => {
      hideLoadingIndicator();
    }, 100);
  } catch (error) {
    console.error("Error displaying cart items:", error);
    hideLoadingIndicator();
  }
});

function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) {
    console.error("The cart container element is missing in the HTML.");
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  const itemsHtml = cartItems
    .map((item) => {
      total += item.price * item.quantity;
      return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" style="width:100px; height:auto;">
        <h4>${item.title}</h4>
        <p>Description: ${item.description}</p>
        <p>Color: ${item.baseColor}</p>
        <p>Size: ${item.size}</p>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
    `;
    })
    .join("");

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
    <button type="submit" id="place-order">Place Order</button>
  `;

  cartContainer.innerHTML = `<div>${itemsHtml}</div><form id="checkout-form" class="checkout-form">${checkoutHtml}</form>`;
}

function attachFormHandler() {
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      saveOrderDetails();
    });
  }
}

function saveOrderDetails() {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const country = document.getElementById("country").value;
  const address = document.getElementById("address").value;
  const zip = document.getElementById("zip").value;
  const city = document.getElementById("city").value;
  const cardNumber = document.getElementById("card-number").value;
  const expDate = document.getElementById("exp-date").value;
  const cvv = document.getElementById("cvv").value;
  const cardName = document.getElementById("card-name").value;
  const totalAmount = document
    .querySelector(".total-section h3")
    .textContent.split(": ")[1];

  const orderNumber = "ORD202400123";
  const estimatedDelivery = "2024-06-30";

  const orderDetails = {
    firstName,
    lastName,
    email,
    phone,
    country,
    address,
    zip,
    city,
    cardNumber,
    expDate,
    cvv,
    cardName,
    totalAmount,
    orderNumber,
    estimatedDelivery,
    date: new Date().toLocaleDateString("no-NO"),
  };
  localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  window.location.href = "confirmation/index.html";
}

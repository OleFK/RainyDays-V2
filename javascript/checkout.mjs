import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";

// Listen for when the DOM is fully loaded to execute the contained functions.
document.addEventListener("DOMContentLoaded", () => {
  // Show the loading indicator upon start.
  showLoadingIndicator();

  try {
    // Display cart items and attach the form handler for submissions.
    displayCartItems();
    attachFormHandler();

    // Schedule the hiding of the loading indicator after a one-second delay.
    setTimeout(() => {
      hideLoadingIndicator();
    }, 1000);
  } catch (error) {
    // Hide the loading indicator if an error occurs during the operations.
    hideLoadingIndicator();
  }
});

// Function to display cart items from local storage.
function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) {
    return; // Exit function if the cart container is not found.
  }

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  const itemsHtml = cartItems.map((item) => {
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
  }).join("");

  // HTML for the checkout form including contact, delivery, and payment sections.
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

// Attach an event handler to the checkout form to handle the submit event.
function attachFormHandler() {
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevents default form submission.
      saveOrderDetails();
    });
  }
}

// Function to collect form data and save order details to local storage.
function saveOrderDetails() {
  const orderDetails = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    country: document.getElementById("country").value,
    address: document.getElementById("address").value,
    zip: document.getElementById("zip").value,
    city: document.getElementById("city").value,
    cardNumber: document.getElementById("card-number").value,
    expDate: document.getElementById("exp-date").value,
    cvv: document.getElementById("cvv").value,
    cardName: document.getElementById("card-name").value,
    totalAmount: document.querySelector(".total-section h3").textContent.split(": $")[1],
    orderDate: new Date().toLocaleDateString("no-NO")
  };

  // Save the order details in local storage.
  localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

  // Redirect to the order confirmation page.
  window.location.href = "confirmation/index.html";
}
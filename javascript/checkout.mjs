
/*
document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
});

function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    console.log("Your cart is empty.");
    return;
  }

  const itemsHtml = cartItems.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" style="width:100px; height:auto;">
      <h4>${item.title}</h4>
      <p>Description: ${item.description}</p>
      <p>Color: ${item.baseColor}</p>
      <p>Size: ${item.sizes}</p>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <button class="remove-button" data-id="${item.id}">Remove</button>
    </div>
  `).join("");

  cartContainer.innerHTML = `<div>${itemsHtml}</div>`;

  // After the elements are loaded into the DOM, add the "Place Order" button if needed
  if (cartItems.length > 0) {
    const orderButton = document.createElement("button");
    orderButton.onclick = submitOrder; // Ensure submitOrder function is defined
    orderButton.textContent = "Place Order";
    cartContainer.appendChild(orderButton);
  }

  console.log("Cart items displayed:", cartItems);

  setupRemoveButtons();
}

function setupRemoveButtons() {
  document.querySelectorAll(".remove-button").forEach(button => {
    button.addEventListener("click", function() {
      console.log("Removing item with ID:", this.getAttribute("data-id"));
      removeItem(this.getAttribute("data-id"));
    });
  });
}

function removeItem(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems = cartItems.filter(item => item.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCartItems();
  console.log("Item removed from cart. New cart:", cartItems);
}

function submitOrder() {
  // Dummy function for placeholder
  console.log("Order placed");
}
*/

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
  console.log("Loaded cart items:", cartItems); // Sjekk hva som er lastet

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const itemsHtml = cartItems.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" style="width:100px; height:auto;">
      <h4>${item.title}</h4>
      <p>Description: ${item.description}</p>
      <p>Color: ${item.baseColor}</p>
      <p>Size: ${item.sizes.join(', ')}</p> <!-- Antatt at sizes er en array -->
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <button class="remove-button" data-id="${item.id}">Remove</button>
    </div>
  `).join("");

  const paymentAndDeliveryHtml = `
    <form id="checkout-form">
      <h3>Checkout Information</h3>
      <div>
        <label for="address">Delivery Address:</label>
        <input type="text" id="address" name="address" required>
      </div>
      <div>
        <label for="payment-method">Payment Method:</label>
        <select id="payment-method" name="payment-method" required>
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>
      <button type="submit">Place Order</button>
    </form>
  `;

  // Legger til både varene og skjemaet til HTML
  cartContainer.innerHTML = `<div>${itemsHtml}</div>${paymentAndDeliveryHtml}`;

  setupRemoveButtons();
  setupFormEvents();
}

function setupRemoveButtons() {
  document.querySelectorAll(".remove-button").forEach(button => {
    button.addEventListener("click", function() {
      removeItem(this.getAttribute("data-id"));
    });
  });
}

function removeItem(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems = cartItems.filter(item => item.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCartItems();
}

function setupFormEvents() {
  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    submitOrder();
  });
}

function submitOrder() {
  const address = document.getElementById("address").value;
  const paymentMethod = document.getElementById("payment-method").value;
  console.log("Order placed with address:", address, "and payment method:", paymentMethod);
  // Implementer ytterligere funksjonalitet for bestilling her
}

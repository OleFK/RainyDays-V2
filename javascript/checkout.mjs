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

  const itemsHtml = cartItems
    .map(
      (item) => `
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
            `
    )
    .join("");

  cartContainer.innerHTML = `<div>${itemsHtml}</div>`;
  console.log("Cart items displayed:", cartItems);

  // After the elements are loaded into the DOM, we call setupRemoveButtons
  setupRemoveButtons();
}

function setupRemoveButtons() {
  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Removing item with ID:", this.getAttribute("data-id"));
      removeItem(this.getAttribute("data-id"));
    });
  });
}

function removeItem(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems = cartItems.filter((item) => item.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCartItems();
  console.log("Item removed from cart. New cart:", cartItems);
}

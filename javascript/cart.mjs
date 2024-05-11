

import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";

document.addEventListener("DOMContentLoaded", function () {
  showLoadingIndicator();

  setTimeout(() => {
    const cartIcon = document.querySelector(".shopping-cart-icon");
    if (cartIcon) {
      cartIcon.addEventListener("click", function (event) {
        event.preventDefault();
        openCartModal();
      });
    } else {
      console.error("Shopping cart icon not found in the DOM");
    }

    const closeModalButton = document.getElementById("closeModalButton");
    if (closeModalButton) {
      closeModalButton.addEventListener("click", closeCartModal);
    } else {
      console.error("Modal close button not found in the DOM");
    }

    document
      .getElementById("cartItems")
      .addEventListener("click", function (event) {
        const index = parseInt(event.target.getAttribute("data-index"), 10);
        if (event.target.classList.contains("remove-item-btn")) {
          removeItemFromCart(index);
        } else if (event.target.classList.contains("increase-item-btn")) {
          adjustItemQuantity(index, 1);
        } else if (event.target.classList.contains("decrease-item-btn")) {
          adjustItemQuantity(index, -1);
        } else if (event.target.id === "checkoutButton") {
          window.location.href = "RainyDays-v2/checkout/index.html";
        }
      });

    hideLoadingIndicator();
  }, 500); 
});

function openCartModal() {
  if (!window.location.pathname.includes("checkout") && !window.location.pathname.includes("confirmation")) {
    document.getElementById("cartModal").style.display = "flex";
    updateCartCount();
    displayCartItems();
  }
}

function closeCartModal() {
  document.getElementById("cartModal").style.display = "none";
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = itemCount;
  displayCartItems();
}

function addToCart(product, size) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === size
  );

  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
  } else {
    product.quantity = 1;
    product.size = size;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.id = "item-" + index;
    itemElement.className = "item";
    itemElement.innerHTML = `
      <button class="remove-item-btn" data-index="${index}">X</button>
      <img src="${item.image}" alt="${item.name}">
      <h4>${item.title}</h4>
      <p>Quantity: <button class="decrease-item-btn" data-index="${index}">-</button>${item.quantity}<button class="increase-item-btn" data-index="${index}">+</button></p>
      <p>Price: $${item.price}</p>
      <p>Size: ${item.size}</p>
    `;
    cartItemsContainer.appendChild(itemElement);
  });
  const checkoutButton = document.createElement("button");
  checkoutButton.textContent = "Checkout";
  checkoutButton.id = "checkoutButton";
  cartItemsContainer.appendChild(checkoutButton);
}

function adjustItemQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (index >= 0 && index < cart.length) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
}

function removeItemFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

export {
  addToCart,
  updateCartCount,
  openCartModal,
  closeCartModal,
  removeItemFromCart,
  adjustItemQuantity,
};

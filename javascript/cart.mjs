/*

// When the document is loaded, set up event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Event listener to open the cart modal
  const cartIcon = document.querySelector(".shopping-cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", function (event) {
      event.preventDefault();
      openCartModal();
    });
  } else {
    console.error("Shopping cart icon not found in the DOM");
  }

  // Event listener for the close button in the modal
  const closeBtn = document.getElementById("closeCartButton");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeCartModal);
  } else {
    console.error("Close button not found in the DOM");
  }

  // Event listener for the X button in the modal
  const closeModalButton = document.getElementById("closeModalButton");
  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeCartModal);
  } else {
    console.error("Modal close button not found in the DOM");
  }

  // Add event listener for remove buttons in the cart
  document
    .getElementById("cartItems")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-item-btn")) {
        const index = parseInt(event.target.getAttribute("data-index"), 10);
        removeItemFromCart(index);
      }
    });
});

// Function to open the cart modal
function openCartModal() {
  document.getElementById("cartModal").style.display = "flex";
}

// Function to close the cart modal
function closeCartModal() {
  document.getElementById("cartModal").style.display = "none";
}

// Function to update the count of products in the cart
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = itemCount;
  displayCartItems();
}

// Function to add a product to the cart with a specific size
function addToCart(product, size) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === size
  );

  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
  } else {
    product.quantity = 1;
    product.size = size; // Store the specific size with the product
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Function to display the contents of the cart in the modal
function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}"">
                <p>${item.title}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ${item.price}</p>
                <p>Size: ${item.sizes}</p>
                <button class="remove-item-btn" data-index="${index}">Remove</button>
            `;
    cartItemsContainer.appendChild(itemElement);
  });
}

// Function to remove a product from the cart
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
};
*/

/*
// When the document is loaded, set up event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Event listener to open the cart modal
  const cartIcon = document.querySelector(".shopping-cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", function (event) {
      event.preventDefault();
      openCartModal();
    });
  } else {
    console.error("Shopping cart icon not found in the DOM");
  }

  // Event listener for the close button in the modal
  const closeBtn = document.getElementById("closeCartButton");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeCartModal);
  } else {
    console.error("Close button not found in the DOM");
  }

  // Event listener for the X button in the modal
  const closeModalButton = document.getElementById("closeModalButton");
  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeCartModal);
  } else {
    console.error("Modal close button not found in the DOM");
  }

  // Add event listener for button clicks in the cart
  document
    .getElementById("cartItems")
    .addEventListener("click", function (event) {
      const index = parseInt(event.target.getAttribute("data-index"), 10);
      if (event.target.classList.contains("remove-item-btn")) {
        removeItemFromCart(index);
      } else if (event.target.classList.contains("increase-item-btn")) {
        adjustItemQuantity(index, 1); // Increase quantity
      } else if (event.target.classList.contains("decrease-item-btn")) {
        adjustItemQuantity(index, -1); // Decrease quantity
      }
    });
});

// Function to open the cart modal
function openCartModal() {
  document.getElementById("cartModal").style.display = "flex";
  updateCartCount();
}

// Function to close the cart modal
function closeCartModal() {
  document.getElementById("cartModal").style.display = "none";
}

// Function to update the count of products in the cart
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = itemCount;
  displayCartItems();
}

// Function to add a product to the cart with a specific size
function addToCart(product, size) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === size
  );

  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
  } else {
    product.quantity = 1;
    product.size = size; // Store the specific size with the product
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Function to display the contents of the cart in the modal
function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
                  <img src="${item.image}" alt="${item.name}">
                  <p>${item.title}</p>
                  <p>Quantity: <button class="decrease-item-btn" data-index="${index}">-</button>${item.quantity}<button class="increase-item-btn" data-index="${index}">+</button></p>
                  <p>Price: $${item.price}</p>
                  <p>Size: ${item.sizes}</p>
                  <button class="remove-item-btn" data-index="${index}">Remove</button>
              `;
    cartItemsContainer.appendChild(itemElement);
  });
}

// Function to adjust the quantity of a product in the cart
function adjustItemQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (index >= 0 && index < cart.length) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
      cart.splice(index, 1); // Remove item if quantity goes below 1
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
}

// Function to remove a product from the cart
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
*/

// When the document is loaded, set up event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Event listener to open the cart modal
  const cartIcon = document.querySelector(".shopping-cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", function (event) {
      event.preventDefault();
      openCartModal();
    });
  } else {
    console.error("Shopping cart icon not found in the DOM");
  }

  // Event listener for the close button in the modal
  const closeBtn = document.getElementById("closeCartButton");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeCartModal);
  } else {
    console.error("Close button not found in the DOM");
  }

  // Event listener for the X button in the modal
  const closeModalButton = document.getElementById("closeModalButton");
  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeCartModal);
  } else {
    console.error("Modal close button not found in the DOM");
  }

  // Add event listener for button clicks in the cart
  document
    .getElementById("cartItems")
    .addEventListener("click", function (event) {
      const index = parseInt(event.target.getAttribute("data-index"), 10);
      if (event.target.classList.contains("remove-item-btn")) {
        removeItemFromCart(index);
      } else if (event.target.classList.contains("increase-item-btn")) {
        adjustItemQuantity(index, 1); // Increase quantity
      } else if (event.target.classList.contains("decrease-item-btn")) {
        adjustItemQuantity(index, -1); // Decrease quantity
      } else if (event.target.id === "checkoutButton") {
        window.location.href = "/checkout/index.html"; // Ensure this URL is correct for your site
      }
    });
});

// Function to open the cart modal
function openCartModal() {
  // Prevent modal from opening on the checkout page
  if (!window.location.pathname.includes("checkout")) {
    document.getElementById("cartModal").style.display = "flex";
    updateCartCount();
  }
}

// Function to close the cart modal
function closeCartModal() {
  document.getElementById("cartModal").style.display = "none";
}

// Function to update the count of products in the cart
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = itemCount;
  displayCartItems();
}

// Function to add a product to the cart with a specific size
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

// Function to display the contents of the cart in the modal
function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
                      <img src="${item.image}" alt="${item.name}">
                      <p>${item.title}</p>
                      <p>Quantity: <button class="decrease-item-btn" data-index="${index}">-</button>${item.quantity}<button class="increase-item-btn" data-index="${index}">+</button></p>
                      <p>Price: $${item.price}</p>
                      <p>Size: ${item.size}</p>
                      <button class="remove-item-btn" data-index="${index}">Remove</button>
                  `;
    cartItemsContainer.appendChild(itemElement);
  });
  const checkoutButton = document.createElement("button");
  checkoutButton.textContent = "Checkout";
  checkoutButton.id = "checkoutButton";
  cartItemsContainer.appendChild(checkoutButton);
}

// Function to adjust the quantity of a product in the cart
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

// Function to remove a product from the cart
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

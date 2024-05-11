import { addToCart, updateCartCount } from "./cart.mjs";
import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";

// Function to display a toast message
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message"; // Set the CSS class for styling
  toast.textContent = message; // Set the text content of the toast
  document.body.appendChild(toast); // Add the toast to the body

  // Make the toast visible shortly after creation to allow for CSS transition
  setTimeout(() => {
    toast.classList.add("toast-visible");
  }, 10); 

  // Remove the toast after showing it for 3 seconds
  setTimeout(() => {
    toast.classList.remove("toast-visible");
    setTimeout(() => {
      document.body.removeChild(toast); // Remove toast from DOM after it fades out
    }, 500); 
  }, 3000);
}

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Display loading indicator and update cart count
    showLoadingIndicator();
    updateCartCount();

    // Retrieve the selected product from local storage
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (product) {
      // Check for a container element or create one if not present
      let container = document.querySelector(".product-detail-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "product-detail-container";
        document.body.appendChild(container);
      }

      // Create and append elements to display product details
      const imgElement = document.createElement("img");
      imgElement.id = "productImage";
      imgElement.src = product.image || "path/to/default-image.jpg";
      imgElement.alt = `${product.title} image`;
      container.appendChild(imgElement);

      const nameElement = document.createElement("h4");
      nameElement.id = "productName";
      nameElement.textContent = product.title;
      container.appendChild(nameElement);

      const descriptionElement = document.createElement("p");
      descriptionElement.id = "productDescription";
      descriptionElement.textContent = product.description;
      container.appendChild(descriptionElement);

      const priceElement = document.createElement("p");
      priceElement.id = "productPrice";
      priceElement.textContent = `Price: ${product.price} $`;
      container.appendChild(priceElement);

      const colorDisplay = document.createElement("p");
      colorDisplay.id = "productColor";
      colorDisplay.textContent = product.baseColor ? `Color: ${product.baseColor}` : "Color not specified";
      container.appendChild(colorDisplay);

      const sizeLabel = document.createElement("label");
      sizeLabel.htmlFor = "sizeSelect";
      sizeLabel.textContent = "Select size:";
      container.appendChild(sizeLabel);

      const sizeSelect = document.createElement("select");
      sizeSelect.id = "sizeSelect";
      product.sizes.forEach((size) => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
      });
      container.appendChild(sizeSelect);

      // Button for adding product to cart
      const addToCartButton = document.createElement("button");
      addToCartButton.id = "addButton";
      addToCartButton.textContent = "Add to Cart";
      addToCartButton.onclick = () => {
        const selectedSize = sizeSelect.value;
        if (!selectedSize) {
          alert("Please select a size before adding to cart.");
          return;
        }
        product.size = selectedSize;
        addToCart(product, selectedSize);
        updateCartCount();
        showToast("Product added to cart!");
        hideLoadingIndicator();
      };
      container.appendChild(addToCartButton);

      // Hide the loading indicator after a delay
      setTimeout(() => {
        hideLoadingIndicator();
      }, 1000);
    } else {
      // Handle case where product information is not available
      document.querySelector(".product-detail-container").innerHTML = "<p>Product information is not available.</p>";
      hideLoadingIndicator();
    }
  } catch (error) {
    // Handle any other errors in loading product information
    document.querySelector(".product-detail-container").innerHTML = "<p>Error loading product information.</p>";
    hideLoadingIndicator();
  }
});

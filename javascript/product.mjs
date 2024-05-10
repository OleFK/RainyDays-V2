
import { addToCart, updateCartCount } from "./cart.mjs";
import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";


function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message"; 
  toast.textContent = message;
  document.body.appendChild(toast);

  
  setTimeout(() => {
    toast.classList.add("toast-visible");
  }, 10); 

  
  setTimeout(() => {
    toast.classList.remove("toast-visible");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500); 
  }, 3000);
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    console.log("showLoadingIndicator called");
    showLoadingIndicator();
    updateCartCount();

    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (product) {
      console.log("Product loaded:", product);

      let container = document.querySelector(".product-detail-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "product-detail-container";
        document.body.appendChild(container);
      }

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
        setTimeout(() => {
          console.log("hideLoadingIndicator called");
          hideLoadingIndicator();
        }, 2000);
      };
      container.appendChild(addToCartButton);

      setTimeout(() => {
        console.log("hideLoadingIndicator called");
        hideLoadingIndicator();
      }, 1000);
    } else {
      console.error("Product information is not available.");
      document.querySelector(".product-detail-container").innerHTML = "<p>Product information is not available.</p>";
      hideLoadingIndicator();
    }
  } catch (error) {
    console.error("Error displaying product:", error);
    document.querySelector(".product-detail-container").innerHTML = "<p>Error loading product information.</p>";
    hideLoadingIndicator();
  }
});

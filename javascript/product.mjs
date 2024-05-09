import { addToCart, updateCartCount } from "./cart.mjs";
import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";

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
      console.log("Image URL:", imgElement.src);

      const nameElement = document.createElement("h4");
      nameElement.id = "productName";
      nameElement.textContent = product.title;
      container.appendChild(nameElement);
      console.log("Product name set to:", product.title);

      const descriptionElement = document.createElement("p");
      descriptionElement.id = "productDescription";
      descriptionElement.textContent = product.description;
      container.appendChild(descriptionElement);
      console.log("Product description set to:", product.description);

      const priceElement = document.createElement("p");
      priceElement.id = "productPrice";
      priceElement.textContent = `Price: ${product.price} $`;
      container.appendChild(priceElement);
      console.log("Product price set to:", product.price);

      const colorDisplay = document.createElement("p");
      colorDisplay.id = "productColor";
      colorDisplay.textContent = product.baseColor
        ? `Color: ${product.baseColor}`
        : "Color not specified";
      container.appendChild(colorDisplay);
      console.log("Color information set to:", colorDisplay.textContent);

      const sizeLabel = document.createElement("label");
      sizeLabel.htmlFor = "sizeSelect";
      sizeLabel.textContent = "Select size:";
      container.appendChild(sizeLabel);
      console.log("Size label created.");

      const sizeSelect = document.createElement("select");
      sizeSelect.id = "sizeSelect";
      product.sizes.forEach((size) => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
        console.log("Size option added:", size);
      });
      container.appendChild(sizeSelect);
      console.log("Size selector added to container.");

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
        console.log("Button to add product to cart added.");
        setTimeout(() => {
          console.log("hideLoadingIndicator called");
          hideLoadingIndicator();
        }, 2000);
      };
      container.appendChild(addToCartButton);

      setTimeout(() => {
        console.log("hideLoadingIndicator called");
        hideLoadingIndicator();
      }, 100);
    } else {
      console.error("Product information is not available.");
      document.querySelector(".product-detail-container").innerHTML =
        "<p>Product information is not available.</p>";
      hideLoadingIndicator();
    }
  } catch (error) {
    console.error("Error displaying product:", error);
    document.querySelector(".product-detail-container").innerHTML =
      "<p>Error loading product information.</p>";
    hideLoadingIndicator();
  }
});

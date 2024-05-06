import { addToCart, updateCartCount } from "./cart.mjs"; // Assume these functions are defined and exported correctly

document.addEventListener("DOMContentLoaded", function () {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (product) {
    console.log("Product loaded:", product);

    const imgElement = document.getElementById("productImage");
    imgElement.src = product.image || "path/to/default-image.jpg";
    imgElement.alt = `${product.title} image`;
    console.log("Image URL:", imgElement.src);

    document.getElementById("productName").textContent = product.title;
    console.log("Product name set to:", product.title);
    document.getElementById("productDescription").textContent =
      product.description;
    console.log("Product description set to:", product.description);
    document.getElementById(
      "productPrice"
    ).textContent = `Price: ${product.price} $`;
    console.log("Product price set to:", product.price);

    const colorDisplay = document.getElementById("productColor");
    const colorText = product.baseColor
      ? `Color: ${product.baseColor}`
      : "Color not specified";
    colorDisplay.textContent = colorText;
    console.log("Color information set to:", colorText);

    const sizeLabel = document.createElement("label");
    sizeLabel.htmlFor = "sizeSelect";
    sizeLabel.textContent = "Select size:";
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

    const container = document.querySelector(".product-detail-container");
    container.appendChild(sizeLabel);
    container.appendChild(sizeSelect);
    console.log("Size selector added to container.");

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.onclick = () => {
      addToCart(product);
      updateCartCount(); // Update the cart count after adding a product to the cart
    };
    container.appendChild(addToCartButton);
    console.log("Button to add product to cart added.");

    // Update the cart count when the page is loaded
    updateCartCount();
  } else {
    console.error("Product information is not available.");
    document.querySelector(".product-detail-container").innerHTML =
      "<p>Product information is not available.</p>";
  }
});

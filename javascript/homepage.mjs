import { fetchProductsFromAPI } from "./apiFunction.mjs";
import { updateCartCount } from "./cart.mjs";
import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";

// Array to store all products fetched from the API
let allProducts = [];

// Function to display products with optional filtering by gender
async function displayProducts(filter = "") {
  try {
    // Display loading indicator while processing
    showLoadingIndicator();

    // Fetch products from API if the array is empty
    if (allProducts.length === 0) {
      allProducts = await fetchProductsFromAPI();
    }

    // Filter products based on gender if a filter is applied
    const filteredProducts = filter
      ? allProducts.filter((product) => product.gender === filter)
      : allProducts;

    // Reference to the products section in the HTML
    const productsSection = document.getElementById("products");
    productsSection.innerHTML = ""; // Clear the section before adding new content

    // Create and append product elements to the DOM
    filteredProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product";

      const imageUrl = product.image
        ? product.image
        : "path/to/default-image.jpg"; // Default image if none is provided

      // Set inner HTML of the product element
      productElement.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}">
        <h3>${product.title}</h3>
      `;
      productsSection.appendChild(productElement);

      // Add click event to each product to handle selection
      productElement.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product/index.html"; 
      });
    });

    // Update cart count after displaying products
    updateCartCount();

    // Hide loading indicator after processing is complete
    hideLoadingIndicator(); 
  } catch (error) {
    // Handle errors in displaying products
    productsSection.innerHTML = "<p>Error loading products.</p>";
    hideLoadingIndicator(); 
  }
}

// Event listeners for filter buttons
document
  .getElementById("all")
  .addEventListener("click", () => displayProducts());
document
  .getElementById("men")
  .addEventListener("click", () => displayProducts("Male"));
document
  .getElementById("women")
  .addEventListener("click", () => displayProducts("Female"));

// Display products when the window loads
window.addEventListener("load", function () {
  displayProducts();
});

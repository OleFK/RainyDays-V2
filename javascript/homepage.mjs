/*import { fetchDataFromAPI } from "./apiFunction.mjs";
async function fetchData() {
  const data = await fetchDataFromAPI();
  console.log(data);
}

// Function to fetch products from the API
export async function fetchProductsFromAPI() {
  try {
    const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}*/

// Import the function to fetch products from the API module
import { fetchProductsFromAPI } from "./apiFunction.mjs";

// Function to display the products on the webpage
async function displayProducts() {
  try {
    console.log("Attempting to fetch products...");
    const products = await fetchProductsFromAPI();
    console.log("Products fetched:", products);

    // Ensure the DOM is fully loaded before attempting to access DOM elements
    document.addEventListener("DOMContentLoaded", () => {
      const productsContainer = document.getElementById("products");
      if (!productsContainer) {
        console.error('No element with ID "products" found.');
        return;
      }

      // Iterate over each product and create HTML elements to display them
      products.forEach((product, index) => {
        console.log(`Displaying product ${index}:`, product);
        const productElement = document.createElement("div");
        productElement.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.img}" alt="Image of ${product.name}">
          <p>ID: ${product.id}</p>
          <p>Price: $${product.price}</p>
          <p>${product.description}</p>
        `;
        productsContainer.appendChild(productElement);
      });
    });
  } catch (error) {
    console.error("Failed to display products:", error);
  }
}

// Call the function to display the products
displayProducts();

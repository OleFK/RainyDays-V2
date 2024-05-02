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

document.addEventListener("DOMContentLoaded", function () {
  async function fetchProductsFromAPI() {
    try {
      const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("API Data:", data); // Log the full data for inspection
      displayProducts(data); // Call displayProducts to handle the data on the page
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return {};
    }
  }

  // Function to display products on the website
  function displayProducts(products) {
    const section = document.getElementById("products");
    section.innerHTML = ""; // Clear existing content
    console.log("Products section found:", section); // Check if the section is correctly identified

    // Loop through each product and create HTML for it
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      const productName = document.createElement("h2");
      const productDescription = document.createElement("p");

      productName.textContent = product.name; // Set the product name
      productDescription.textContent = product.description; // Set the product description

      productDiv.appendChild(productName); // Append the name to the div
      productDiv.appendChild(productDescription); // Append the description to the div

      section.appendChild(productDiv); // Append the div to the section
    });
  }

  // Call the fetchProductsFromAPI function
  fetchProductsFromAPI()
    .then((data) => {
      console.log("Final Data Loaded:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

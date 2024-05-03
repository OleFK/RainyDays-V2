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
}
*/

// homepage.mjs

// homepage.mjs

import { fetchProductsFromAPI } from "./apiFunction.mjs";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // ES6 destrukturering for å bytte elementer
  }
}

async function displayProducts() {
  try {
    const products = await fetchProductsFromAPI();
    console.log(products); // Logger produktdataene til konsollen

    shuffleArray(products); // Blander produktene tilfeldig

    const productsSection = document.getElementById("products");
    productsSection.innerHTML = ""; // Tømmer eksisterende innhold for å unngå duplikater

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product"; // Gir en klasse for styling

      const imageUrl = product.image
        ? product.image
        : "path/to/default-image.jpg"; // Angi riktig sti til standardbilde

      productElement.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" style="width:100%; height:auto;"> <!-- Produktbilde -->
        <h3>${product.title}</h3> <!-- Viser produktnavn -->
        
      `;
      productsSection.appendChild(productElement); // Legger til hvert nytt produkt i 'products'-seksjonen
    });
  } catch (error) {
    console.error("Error displaying products:", error);
    productsSection.innerHTML = "<p>Error loading products.</p>"; // Viser en feilmelding hvis produkter ikke kan lastes
  }
}

displayProducts(); // Kaller funksjonen for å vise produktene på siden

window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none"; // Skjuler loaderen når siden er lastet
  }
});

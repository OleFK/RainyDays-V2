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

import { fetchProductsFromAPI } from "./apiFunction.mjs";

async function displayProducts() {
  try {
    const products = await fetchProductsFromAPI();
    console.log(products); // Logger produktdataene til konsollen

    // Henter 'products' section-elementet fra din HTML-side

    const productsSection = document.getElementById("products");
    productsSection.innerHTML = ""; // Tømmer eksisterende innhold for å unngå duplikater

    products.forEach((product) => {
      // Lager HTML-elementer for hvert produkt

      const productElement = document.createElement("div");
      productElement.className = "product"; // Gir en klasse for styling

      // Sjekker om produktet har en bilde-URL, og setter en standardbilde-URL hvis ikke

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

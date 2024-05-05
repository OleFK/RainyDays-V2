/*document.addEventListener("DOMContentLoaded", function () {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (product) {
    console.log("Produkt lastet:", product);

    // Oppdaterer bilde, navn, beskrivelse og pris
    const imgElement = document.getElementById("productImage");
    imgElement.src = product.image || "path/to/default-image.jpg";
    imgElement.alt = `${product.title} image`;
    console.log("Bilde-URL:", imgElement.src);

    document.getElementById("productName").textContent = product.title;
    console.log("Produktnavn satt til:", product.title);

    document.getElementById("productDescription").textContent =
      product.description;
    console.log("Produktbeskrivelse satt til:", product.description);

    document.getElementById(
      "productPrice"
    ).textContent = `Pris: ${product.price} kr`;
    console.log("Produktpris satt til:", product.price);

    // Oppdaterer farge hvis tilgjengelig
    const colorDisplay = document.getElementById("productColor");
    const colorText = product.baseColor
      ? `Farge: ${product.baseColor}`
      : "Farge ikke spesifisert";
    colorDisplay.textContent = colorText;
    console.log("Fargeinformasjon satt til:", colorText);

    // Opprette og fylle størrelsesvelgeren
    const sizeLabel = document.createElement("label");
    sizeLabel.htmlFor = "sizeSelect";
    sizeLabel.textContent = "Velg størrelse:";
    console.log("Størrelsesetikett opprettet.");

    const sizeSelect = document.createElement("select");
    sizeSelect.id = "sizeSelect";
    product.sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
      console.log("Størrelsesalternativ lagt til:", size);
    });

    // Legger til størrelsesvelgeren i container
    const container = document.querySelector(".product-detail-container");
    container.appendChild(sizeLabel);
    container.appendChild(sizeSelect);
    console.log("Størrelsesvelger lagt til i container.");

    // Legger til knapp for å legge produkt i handlekurv
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Legg i handlekurv";
    addToCartButton.onclick = () => addToCart(product);
    container.appendChild(addToCartButton);
    console.log("Knapp for å legge produkt i handlekurven lagt til.");
  } else {
    console.error("Produktinformasjon er ikke tilgjengelig.");
    document.querySelector(".product-detail-container").innerHTML =
      "<p>Produktinformasjon er ikke tilgjengelig.</p>";
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Gjeldende handlekurv før tillegg:", cart);

    const selectedSize = document.getElementById("sizeSelect").value;
    console.log("Valgt størrelse:", selectedSize);

    const cartItem = { ...product, selectedSize, quantity: 1 };
    cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Produkt lagt til i handlekurven:", cartItem);

    alert("Produktet er lagt til i handlekurven!");
  }
});
*/

import { addToCart, updateCartCount } from "./cart.mjs"; // Anta at disse funksjonene er definert og eksportert riktig

document.addEventListener("DOMContentLoaded", function () {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (product) {
    console.log("Produkt lastet:", product);

    const imgElement = document.getElementById("productImage");
    imgElement.src = product.image || "path/to/default-image.jpg";
    imgElement.alt = `${product.title} image`;
    console.log("Bilde-URL:", imgElement.src);

    document.getElementById("productName").textContent = product.title;
    console.log("Produktnavn satt til:", product.title);
    document.getElementById("productDescription").textContent =
      product.description;
    console.log("Produktbeskrivelse satt til:", product.description);
    document.getElementById(
      "productPrice"
    ).textContent = `Pris: ${product.price} kr`;
    console.log("Produktpris satt til:", product.price);

    const colorDisplay = document.getElementById("productColor");
    const colorText = product.baseColor
      ? `Farge: ${product.baseColor}`
      : "Farge ikke spesifisert";
    colorDisplay.textContent = colorText;
    console.log("Fargeinformasjon satt til:", colorText);

    const sizeLabel = document.createElement("label");
    sizeLabel.htmlFor = "sizeSelect";
    sizeLabel.textContent = "Velg størrelse:";
    console.log("Størrelsesetikett opprettet.");

    const sizeSelect = document.createElement("select");
    sizeSelect.id = "sizeSelect";
    product.sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
      console.log("Størrelsesalternativ lagt til:", size);
    });

    const container = document.querySelector(".product-detail-container");
    container.appendChild(sizeLabel);
    container.appendChild(sizeSelect);
    console.log("Størrelsesvelger lagt til i container.");

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Legg i handlekurv";
    addToCartButton.onclick = () => {
      addToCart(product);
      updateCartCount(); // Oppdaterer antall i handlekurven etter å ha lagt til et produkt
    };
    container.appendChild(addToCartButton);
    console.log("Knapp for å legge produkt i handlekurven lagt til.");
  } else {
    console.error("Produktinformasjon er ikke tilgjengelig.");
    document.querySelector(".product-detail-container").innerHTML =
      "<p>Produktinformasjon er ikke tilgjengelig.</p>";
  }
});

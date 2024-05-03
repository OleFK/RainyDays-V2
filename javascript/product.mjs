document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (product) {
    console.log("Produkt lastet:", product);

    document.getElementById("productImage").src =
      product.image || "path/to/default-image.jpg";
    document.getElementById("productImage").alt = product.title;
    document.getElementById("productName").textContent = product.title;
    document.getElementById("productDescription").textContent =
      product.description;

    const sizeLabel = document.createElement("label");
    sizeLabel.htmlFor = "sizeSelect";
    sizeLabel.textContent = "Velg størrelse:";

    const sizeSelect = document.createElement("select");
    sizeSelect.id = "sizeSelect";
    product.sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
    });

    const container = document.querySelector(".product-detail-container");
    container.appendChild(sizeLabel);
    container.appendChild(sizeSelect);

    document.getElementById(
      "productPrice"
    ).textContent = `Pris: ${product.price} kr`;

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Legg i handlekurv";
    addToCartButton.onclick = () => addToCart(product);
    container.appendChild(addToCartButton);
  } else {
    console.error("Produktinformasjon er ikke tilgjengelig.");
    document.querySelector(".product-detail-container").innerHTML =
      "<p>Produktinformasjon er ikke tilgjengelig.</p>";
  }
});

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

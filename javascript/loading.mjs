export function showLoadingIndicator() {
  // Retrieve the existing loading indicator from the DOM
  let loadingIndicator = document.getElementById("loadingIndicator");

  // If it does not exist, create it and add it to the DOM
  if (!loadingIndicator) {
    loadingIndicator = document.createElement("div");
    loadingIndicator.id = "loadingIndicator";
    loadingIndicator.style.display = "none"; // Start hidden to avoid flash of unstyled content
    document.body.appendChild(loadingIndicator);
  }

  // Make the loading indicator visible
  loadingIndicator.style.display = "block";
}

export function hideLoadingIndicator() {
  // Retrieve the existing loading indicator from the DOM
  const loadingIndicator = document.getElementById("loadingIndicator");

  // If it exists, set it to be hidden
  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  }
}

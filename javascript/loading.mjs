export function showLoadingIndicator() {
  let loadingIndicator = document.getElementById("loadingIndicator");
  if (!loadingIndicator) {
    loadingIndicator = document.createElement("div");
    loadingIndicator.id = "loadingIndicator";
    loadingIndicator.style.display = "none";
    document.body.appendChild(loadingIndicator);
    console.log("loadingIndicator added to DOM", loadingIndicator);
  }

  loadingIndicator.style.display = "block";
  console.log("loadingIndicator should now be visible", loadingIndicator);
}

export function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  if (loadingIndicator) {
    console.log("Loading indicator is being hidden");
    loadingIndicator.style.display = "none";
  }
}

// Function that fetches product data from an API asynchronously.
async function fetchProductsFromAPI() {
  try {
    // Attempts to fetch data from the API.
    const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");

    // Checks if the API response was not successful and throws an error.
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    // Parses the JSON response into JavaScript objects.
    const data = await response.json();

    // Returns the fetched data.
    return data;
  } catch (error) {
    // Logs any error that occurred during the fetch operation.
    return {};
  }
}

// Calls the fetchProductsFromAPI function and handles the data.
fetchProductsFromAPI()
  .then((data) => {
    // Processes the data received from the API.
  })
  .catch((error) => {
    // Handles any errors that occur during the API call.
  });

// Exports the fetchProductsFromAPI function for use in other parts of the application.
export { fetchProductsFromAPI };

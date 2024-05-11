import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";
import { openCartModal, closeCartModal } from "./cart.mjs";

// This event listener is triggered once the DOM content has fully loaded.
document.addEventListener("DOMContentLoaded", () => {
  // Displays the loading indicator.
  showLoadingIndicator();

  // Retrieves the HTML container element for displaying the order confirmation.
  const confirmationContainer = document.getElementById("confirmation");

  // Retrieves the cart icon element which triggers the cart modal.
  const cartIcon = document.getElementById("cart-icon");

  // Retrieves order details from local storage and parses them.
  const orderInfo = JSON.parse(localStorage.getItem("orderDetails"));

  // Sets a default order status.
  const orderStatus = "Processing";

  // Checks if order details exist in local storage.
  if (orderInfo) {
    // Formats the current date in a localized format.
    const currentDate = new Date().toLocaleDateString("no-NO", {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    // Constructs HTML content for the confirmation page.
    const confirmationHTML = `
        <div class="container">
          <div class="header">
            <h1>Thank you for your purchase!</h1>
            <p>Hello ${orderInfo.firstName}! We greatly appreciate your business with us.</p>
          </div>
          <div class="order-details">
            <h2>Order Details:</h2>
            <p><strong>Order Number:</strong> NOR12345</p>
            <p><strong>Date:</strong> ${orderInfo.date || currentDate}</p>
            <p><strong>Status:</strong> ${orderStatus}</p>
            <p><strong>Total Amount:</strong> $${orderInfo.totalAmount}</p>
          </div>
          <div class="delivery-info">
            <h2>Delivery Information:</h2>
            <p><strong>Address:</strong> ${orderInfo.address}, ${orderInfo.zip} ${orderInfo.city}, ${orderInfo.country}</p>
            <p><strong>Estimated Delivery Time:</strong> 22.06.2024</p>
          </div>
          <div class="customer-service">
            <h2>Need Help?</h2>
            <p>If you have any questions or need further assistance, please do not hesitate to contact us at info@rainydays.no.</p>
          </div>
        </div>
      `;
    // Inserts the confirmation HTML into the container element.
    confirmationContainer.innerHTML = confirmationHTML;

    // Removes the cart contents from local storage.
    localStorage.removeItem("cart");
  } else {
    // Handles the case where no order details are found.
    confirmationContainer.innerHTML = "<p>An error occurred while retrieving your order information. Please try again or contact customer service.</p>";
  }

  // Adds an event listener to the cart icon for opening the cart modal.
  if (cartIcon) {
    cartIcon.addEventListener('click', function() {
      openCartModal(); 
    });
  }

  // Sets a timer to hide the loading indicator shortly after everything is rendered.
  setTimeout(() => hideLoadingIndicator(), 100);
});


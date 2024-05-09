import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";

document.addEventListener("DOMContentLoaded", () => {
  showLoadingIndicator();

  const confirmationContainer = document.getElementById("confirmation");
  const orderInfo = JSON.parse(localStorage.getItem("orderDetails"));

  if (orderInfo) {
    const confirmationHTML = `
        <div class="container">
          <div class="header">
            <h1>Thank you for your purchase!</h1>
            <p>Hello ${orderInfo.firstName}! We greatly appreciate your business with us.</p>
          </div>
          <div class="order-details">
            <h2>Order Details:</h2>
            <p><strong>Order Number:</strong> ${orderInfo.orderNumber}</p>
            <p><strong>Date:</strong> ${orderInfo.date}</p>
            <p><strong>Total Amount:</strong> ${orderInfo.totalAmount}</p>
          </div>
          <div class="delivery-info">
            <h2>Delivery Information:</h2>
            <p><strong>Address:</strong> ${orderInfo.address}, ${orderInfo.zip} ${orderInfo.city}, ${orderInfo.country}</p>
            <p><strong>Estimated Delivery Time:</strong> ${orderInfo.estimatedDelivery}</p>
          </div>
          <div class="customer-service">
            <h2>Need Help?</h2>
            <p>If you have any questions or need further assistance, please do not hesitate to contact us at info@rainydays.no.</p>
          </div>
        </div>
      `;
    confirmationContainer.innerHTML = confirmationHTML;
    setTimeout(() => hideLoadingIndicator(), 100);
  } else {
    confirmationContainer.innerHTML =
      "<p>An error occurred while retrieving your order information. Please try again or contact customer service.</p>";
    setTimeout(() => hideLoadingIndicator(), 100);
  }
});

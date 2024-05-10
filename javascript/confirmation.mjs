
import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";
import { openCartModal, closeCartModal } from "./cart.mjs";

document.addEventListener("DOMContentLoaded", () => {
  showLoadingIndicator();

  const confirmationContainer = document.getElementById("confirmation");
  const cartIcon = document.getElementById("cart-icon"); 
  const orderInfo = JSON.parse(localStorage.getItem("orderDetails"));
  
  
  const orderStatus = "Processing";

  if (orderInfo) {
    const currentDate = new Date().toLocaleDateString("no-NO", {
      year: 'numeric', month: 'long', day: 'numeric'
    });

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
    confirmationContainer.innerHTML = confirmationHTML;
    localStorage.removeItem("cart");
  } else {
    confirmationContainer.innerHTML = "<p>An error occurred while retrieving your order information. Please try again or contact customer service.</p>";
  }

  
  if (cartIcon) {
    cartIcon.addEventListener('click', function() {
      openCartModal(); 
    });
  }

  setTimeout(() => hideLoadingIndicator(), 100);
});

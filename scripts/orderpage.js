import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-instance.js";
export function renderOrders() {
  const orderGrid = document.querySelector(".js-order-grid");
  let HTML = "";
  orders.forEach((order) => {
    const orderDate = new Date(order.orderTime).toDateString();
    HTML += `<div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">`;
    order.products.forEach((p) => {
      const product = getProduct(p.productId);
      const deliveryDate = new Date(p.estimatedDeliveryTime);
      HTML += `<div class="product-image-container">
              <img src="${product.image}" />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${deliveryDate}</div>
              <div class="product-quantity">Quantity: ${p.quantity}</div>
              <button class="buy-again-button button-primary js-buy-again" data-product-id="${p.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${p.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
    });
    HTML += `</div></div>`; //1st one for order-details-grid and 2nd one for container
  });
  orderGrid.innerHTML = HTML;
}
function setupOrderInteractions() {
  document.querySelectorAll(".js-buy-again").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      cart.addToCart(productId);
      window.location.href = "checkout.html";
    });
  });
}
loadProductsFetch().then(() => {
  renderOrders();
  setupOrderInteractions();
});

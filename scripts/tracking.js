import { orders } from "../data/orders.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
// assume loadProducts returns a Promise that fills the products array

function renderTrackingPage() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = orders.find((o) => String(o.id) === String(orderId));
  if (!order) {
    document.querySelector(".js-order-tracking").innerHTML = "Order not found.";
    return;
  }

  const productEntry = order.products.find(
    (p) => String(p.productId) === String(productId),
  );
  if (!productEntry) {
    document.querySelector(".js-order-tracking").innerHTML =
      "Product not found in order.";
    return;
  }

  const product = getProduct(productId);

  if (!product) {
    document.querySelector(".js-order-tracking").innerHTML =
      "Product not found in catalog.";
    return;
  }

  const deliveryDate = new Date(
    productEntry.estimatedDeliveryTime,
  ).toDateString();

  document.querySelector(".js-order-tracking").innerHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">Arriving on ${deliveryDate}</div>

    <div class="product-info">${product.name}</div>
    <div class="product-info">Quantity: ${productEntry.quantity}</div>

    <img class="product-image" src="${product.image}" />

    <div class="progress-labels-container">
      <div class="progress-label">Preparing</div>
      <div class="progress-label current-status">Shipped</div>
      <div class="progress-label">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;
}

// Wait for products to load before rendering
loadProductsFetch().then(() => {
  renderTrackingPage();
});

import { cart } from "../../data/cart-instance.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.cartItems.forEach((cartitem) => {
    const product = getProduct(cartitem.productId);
    productPriceCents += product.priceCents * cartitem.quantity;
    const deliveryOption = getDeliveryOption(cartitem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  // console.log(shippingPriceCents);
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  const paymentSummaryHtml = `
  <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$
            ${formatCurrency(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$
            ${formatCurrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$
            ${formatCurrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHtml;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-type": "application/json", //we are sending content in json type
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        const order = await response.json(); //this gives a  data attach to response from backend and it is promise so use await
        addOrder(order);
      } catch (error) {
        console.log("unexpected error.Try again later");
      }
      window.location.href = "orders.html";
    });
}

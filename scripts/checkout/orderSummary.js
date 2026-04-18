import { cart } from "../../data/cart-instance.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { updateCartQuantity } from "../amazon.js";

export function renderOrderSummary() {
  let cartSummaryHtml = "";
  cart.cartItems.forEach((Cartitem) => {
    const productId = Cartitem.productId;
    let matchingProduct = getProduct(productId);

    const deliveryOptionId = Cartitem.deliveryOptionId;
    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    cartSummaryHtml += `
  <div class="cart-item-container 
  js-cart-item-container
  js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name}
                </div>
                <div class="product-price">${matchingProduct.getPrice()}</div>
                <div class="product-quantity
                js-product-quantity-${matchingProduct.id}
                ">
                  <span> Quantity: 
                  <span class="quantity-label js-quantity-label-${matchingProduct.id}">${Cartitem.quantity}
                  </span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id} ">
                  <span class="save-quantity-link link-primary js-save-link"
                  data-product-id="${matchingProduct.id}" >
                  Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliveryOptionsHTML(matchingProduct, Cartitem)}
              </div>
            </div>
          </div>
  `;
  });
  function deliveryOptionsHTML(matchingProduct, Cartitem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$ ${formatCurrency(deliveryOption.priceCents)}`;
      const ischecked = deliveryOption.id === Cartitem.deliveryOptionId;

      html += ` <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
     data-delivery-option-id="${deliveryOption.id}"
    >
                  <input
                    type="radio"
                    ${ischecked ? "checked" : ""}
                    
                    class="delivery-option-input"
                    name="${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">
                    ${dateString}</div>
                    <div class="delivery-option-price">
                    ${priceString}- Shipping</div>
                  </div>
                </div>
      
      `;
    });
    return html;
  }
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      cart.removeFromCart(productId);
      //to remove from html we find container
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container.remove(); //container div removed
      renderPaymentSummary();
    });
  });
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      //console.log(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container.classList.add("is-editing-quantity");
    });
  });
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container.classList.remove("is-editing-quantity");
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`,
      );
      const newQuantity = Number(quantityInput.value);
      cart.updateQuantity(productId, newQuantity);
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`,
      );
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
      renderOrderSummary(); // ✅ refresh order summary
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/cart-class.js";
import { loadProducts } from "../data/products.js";
//import '../data/backend-practice.js';
loadProducts(() => {//this will also envok fun in product.js see
  /*this is anonymos function function without name or we can do function randercheckout(){renderOrderSummary();
renderPaymentSummary();} and send to loadproducts(randercheckout) like amazon see */
  renderOrderSummary();
  renderPaymentSummary();
});

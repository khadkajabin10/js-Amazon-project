import { cart } from "../data/cart-instance.js";
import { products, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
/*this is by promise simple 
loadProductsFetch().then(() => {
  renderProductsGrid();
});*/
//this is by  async and awit with promise simple

async function loadAmazon() {
  await loadProductsFetch();
  renderProductsGrid();
}
loadAmazon();

//this is by callback
//loadProducts(renderProductsGrid); //if not done this products loop runs in empty array bec
function renderProductsGrid() {
  //products={[],[]} this will come from data package
  // loadProducts(); starts request (async)

  //renderProductsGrid();  runs immediately ❗
  let productHtml = "";
  //lets loop through this array
  products.forEach((product) => {
    //take each object and put it in procuct
    //accumalating result
    productHtml =
      productHtml +
      ` <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button 
          button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart</button>
        </div> `;
  });
  document.querySelector(".js-products-grid").innerHTML = productHtml;

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.cartItems.forEach((Cartitem) => {
      cartQuantity += Cartitem.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      //cart.addToCart(productId); we call it in below see
      updateCartQuantity();
      const productContainer = button.closest(".product-container"); //this find the spacific container we click since button now
      // Get the selected quantity from the <select>
      const quantitySelect = productContainer.querySelector(
        ".product-quantity-container select",
      ); //this .select means find the select element
      const selectedQuantity = parseInt(quantitySelect.value, 10);

      // Add to cart with the selected quantity
      cart.addToCart(productId, selectedQuantity);

      // Update cart quantity in header
      updateCartQuantity();

      const addedMessage = productContainer.querySelector(".added-to-cart"); //that container ko  added to cart

      // Step 1: Add the "visible" class → opacity goes from 0 → 1
      addedMessage.classList.add("visible");

      // Step 2: After 2 seconds, remove the "visible" class → opacity goes back to 0
      setTimeout(() => {
        addedMessage.classList.remove("visible");
      }, 2000);
    });
  });
}

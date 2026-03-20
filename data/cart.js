import { products } from "./products.js";
export let cart;

LoadFromStorage();
export function LoadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    //this is illusion , empty array also work
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "3",
      },
    ];
  }
}

function savetoStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((Cartitem) => {
    if (productId === Cartitem.productId) {
      matchingItem = Cartitem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  savetoStorage();
}
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((Cartitem) => {
    if (Cartitem.productId !== productId) {
      //save all except same productid
      newCart.push(Cartitem);
    }
  });
  cart = newCart;
  savetoStorage();
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((Cartitem) => {
    if (productId === Cartitem.productId) {
      matchingItem = Cartitem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  savetoStorage(); //bez we update the cart so
}

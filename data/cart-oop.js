import { LoadFromStorage } from "./cart.js";
import { products } from "./products.js";

function Cart(localStoragekey) {
  const cart = {
    cartItems: undefined,
    LoadFromStorage() {
      //or only loadFromStorage()
      this.cartItems = JSON.parse(localStorage.getItem(localStoragekey));
      if (!this.cartItems) {
        //this is illusion , empty array also work
        this.cartItems = [
          //this pointing const cart, if wwe change name of const cart then also it will run
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
    },

    savetoStorage() {
      localStorage.setItem(localStoragekey, JSON.stringify(this.cartItems));
    },
    addToCart(productId) {
      let matchingItem;
      this.cartItems.forEach((Cartitem) => {
        if (productId === Cartitem.productId) {
          matchingItem = Cartitem;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      this.savetoStorage();
    },
    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((Cartitem) => {
        if (Cartitem.productId !== productId) {
          //save all except same productid
          newCart.push(Cartitem);
        }
      });
      this.cartItems = newCart;
      this.savetoStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      this.cartItems.forEach((Cartitem) => {
        if (productId === Cartitem.productId) {
          matchingItem = Cartitem;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.savetoStorage(); //bez we update the cart so
    },
  };
  return cart;
}
const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.LoadFromStorage();
businessCart.LoadFromStorage();
console.log(cart);
console.log(businessCart);

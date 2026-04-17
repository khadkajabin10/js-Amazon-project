export class Cart {
  cartItems;
  #localStoragekey;
  constructor(localStoragekey) {
    this.#localStoragekey = localStoragekey;

    this.#LoadFromStorage();
  }
  #LoadFromStorage() {
    //or only loadFromStorage()
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStoragekey));
    if (!this.cartItems) {
      //this is illusion , empty array also work
      this.cartItems = [
        //this pointing const cart, if wwe change name of const cart then also it will run
        /*
        this was just for praticing we use empty cart not default cart 
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "3",
        },*/
      ];
    }
  }

  savetoStorage() {
    localStorage.setItem(this.#localStoragekey, JSON.stringify(this.cartItems));
  }

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
  }

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
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((Cartitem) => {
      if (productId === Cartitem.productId) {
        matchingItem = Cartitem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.savetoStorage(); //bez we update the cart so
  }
}

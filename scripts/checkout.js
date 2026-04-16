import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/cart-class.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
/*
new Promise((resolve) => {
  console.log("start ");
  loadProducts(() => {
    //asyn code and wait to finish
    console.log("finish loading");
    resolve(); //then we call resolve to go to next step so resolve function say shift position of next instruction
  });
}).then(() => {
  console.log("next step");
}); //.then for next step or instruction
/*

//import '../data/backend-practice.js';
//using callbacks
loadProducts(() => {
  //this will also envok fun in product.js see
  /*this is anonymos function function without name or we can do function randercheckout(){renderOrderSummary();
renderPaymentSummary();} and send to loadproducts(randercheckout) like amazon see// 
  renderOrderSummary();
  renderPaymentSummary();
});*/
//now using promises
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});*/
/*
loadProducts(() => {
  //loadproducts and wait
  loadCart(() => {
    //loadcart and wait
    renderOrderSummary(); //then only this
    renderPaymentSummary();
  });
}); //code inside code multiple callbacks cause a lot of nesting cause hard to work
*/
/*
async function loadPage() {
  //async return promise so it make return new promise(()=>{}) like this

  await loadProductsFetch();
  await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
  renderOrderSummary();
  renderPaymentSummary(); //we already wait so we can write here , no need to write in then , if it was not for async we had to write it in then .

  return "value2"; //this is equavalaint to resolve('value2) variable
}
loadPage();*/

/*.then((value) => {
  console.log("next steps");
  console.log(value);
});*/
//using promise
/*
Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve("value2");
    });
  }),
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});*/

//using async and await with promiseall

async function loadpageusingPromiseAll() {
  const value = await Promise.all([
    loadProductsFetch(),

    new Promise((resolve) => {
      loadCart(() => {
        console.log("callback called");
        resolve("using promise all");
      });
    }),
  ]);
  console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
}
loadpageusingPromiseAll();

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  });
})
  .then((value) => {
    console.log(value);
    //what ever we give in resolve=value1 is  store in value so resolver also act as variable
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    }); //note then is not use here but in main promise .then(()=>{

    //loadCart() note we need resolve to move to next so inside then we can create new return promise i.e
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
*/

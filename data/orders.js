export const orders = JSON.parse(localStorage.getItem("orders")) || [];
export function addOrder(order) {
  orders.unshift(order); //this will add order in front of array rather then back , because 1st order should be in front
  savetoStorage(); //after modify the array
}
function savetoStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubtotal();
  }

  calculateItemSubtotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    const cartIemTotals = this.list.map((i) => i.FinalPrice * i.quantity);
    this.itemTotal = cartIemTotals.reduce((acc, curr) => acc + curr, 0);
    const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
    subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
  }
  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    tax.innerText = `$${this.tax.toFixed(2)}`;
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
  }
}

import ExternalServices from "./ExternalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

const services = new ExternalServices();

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.subTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubtotal();
  }

  calculateItemSubtotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.length;
    const numItems = document.querySelector(
      `${this.outputSelector} #num-items`,
    );
    numItems.innerText = this.itemTotal;
    const cartItemTotals = this.list.map((i) => i.FinalPrice * i.quantity);
    this.subTotal = cartItemTotals.reduce((acc, curr) => acc + curr, 0);
    const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
    subtotal.innerText = `$${this.subTotal.toFixed(2)}`;
  }
  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = this.subTotal * 0.06;
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.orderTotal = this.subTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity,
    }));
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    tax.innerText = `$${this.tax.toFixed(2)}`;
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    const orderTotal = document.querySelector(
      `${this.outputSelector} #order-total`,
    );
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
  async checkout(form) {
    const formData = new FormData(form);
    const formObject = {};
    for (const key of formData.keys()) {
      formObject[key] = formData.get(key);
    }

    const packagedItems = this.packageItems(this.list);
    const payload = {
      orderDate: new Date().toJSON(),
      ...formObject,
      items: packagedItems,
      orderTotal: this.orderTotal,
      shipping: this.shipping,
      tax: this.tax,
    };

    try {
      await services.checkout(payload);
      setLocalStorage("so-cart", []);
      window.location.href = "/checkout/success.html";
    } catch (error) {
      for (const key of Object.keys(error.message)) {
        alertMessage(error.message[key]);
      }
    }
  }
}

import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess("so-cart", ".order-summary");
checkoutProcess.init();

document.addEventListener("DOMContentLoaded", () => {
  document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutProcess.checkout(e.target);
  });

  const zipInput = document.querySelector("#zip");

  zipInput.addEventListener("change", () => {
    if (zipInput.value) {
      checkoutProcess.calculateOrderTotal();
    }
  });
});

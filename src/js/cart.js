import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart");
const listElement = document.querySelector(".product-list");
const totalElement = document.querySelector(".cart-total");
const cart = new ShoppingCart(cartItems, listElement, totalElement);

cart.init();
loadHeaderFooter();

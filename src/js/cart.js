import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart");
const listElement = document.querySelector(".product-list");
const cart = new ShoppingCart(cartItems, listElement);

cart.init();
loadHeaderFooter();

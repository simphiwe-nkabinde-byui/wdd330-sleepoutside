import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  if (!cartItems.length) {
    productList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const colorName = item.Colors && item.Colors[0] ? item.Colors[0].ColorName : "N/A";
  const image = item.Image || "";
  const name = item.Name || "Product";
  const quantity = item.quantity || 1;
  const price = item.FinalPrice || "0.00";
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${image}" alt="${name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${price}</p>
  </li>`;
}

renderCartContents();

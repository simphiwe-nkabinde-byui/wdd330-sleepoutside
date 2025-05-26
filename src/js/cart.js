import { getLocalStorage } from "./utils.mjs";
 // this will be used to get the cart items from local storage
// and render them in the cart page
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  if (!cartItems.length) {
    productList.innerHTML = "<li>Your cart is empty.</li>";
    document.getElementById("cartTotal").textContent = "0.00";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
  // Set the cart total
  document.getElementById("cartTotal").textContent = totalCartPrice();
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


function totalCartPrice() {
  const cartItems = getLocalStorage("so-cart") || [];
  return cartItems.reduce((total, item) => {
    return total + (item.FinalPrice || 0) * (item.quantity || 1);
  }, 0).toFixed(2);
}

renderCartContents();

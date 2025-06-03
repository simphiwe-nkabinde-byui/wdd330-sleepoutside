import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(item) {
  return `
  <li class="cart-card divider">
        <a href="#" class="cart-card__image">
        <img
        src="${item.Image}"
        alt="${item.Name}"
        />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: ${item.quantity}</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}
export default class ShoppingCart {
  constructor(cartItems, listElement) {
    this.cartItems = cartItems;
    this.listElement = listElement;
  }

  async init() {
    this.renderList(this.cartItems);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

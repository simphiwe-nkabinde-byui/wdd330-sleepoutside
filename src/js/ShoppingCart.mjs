import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(item) {
  return `
  <li class="cart-card divider">
        <a href="#" class="cart-card__image">
        <img
        src="${item.Images?.PrimarySmall}"
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
  constructor(cartItems, listElement, totalElement) {
    this.cartItems = cartItems;
    this.listElement = listElement;
    this.totalElement = totalElement;
  }

  async init() {
    this.renderList(this.cartItems);
    this.renderTotal(this.cartItems);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
  renderTotal(list) {
    const cartFooter = document.querySelector(".cart-footer");
    if (!list?.length) {
      cartFooter.classList.add("hide");
    } else {
      cartFooter.classList.remove("hide");
    }
    const cartIemTotals = list.map((i) => i.FinalPrice * i.quantity);
    const grandTotal = cartIemTotals.reduce((acc, curr) => acc + curr, 0);
    this.totalElement.textContent = `Total: $${grandTotal.toFixed(2)}`;
  }
}

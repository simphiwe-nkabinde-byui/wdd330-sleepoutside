import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }
  renderProductDetails() {
    const brandName = document.querySelector("h3");
    brandName.textContent = this.product.Brand.Name;

    const name = document.querySelector("h2.divider");
    name.textContent = this.product.NameWithoutBrand;

    const image = document.querySelector("img.divider");
    image.src = this.product.Image;
    image.alt = this.product.NameWithoutBrand;

    const price = document.querySelector("p.product-card__price");
    price.textContent = `$${this.product.FinalPrice}`;

    const color = document.querySelector("p.product__color");
    color.textContent = this.product.Colors.map((item) => item.ColorName).join(
      ",",
    );

    const description = document.querySelector("p.product__description");
    description.innerHTML = this.product.DescriptionHtmlSimple;
  }
}

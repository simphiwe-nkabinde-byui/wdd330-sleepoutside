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
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }
  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const existingProductIndex = cartItems.findIndex((item) => item.Id === this.product.Id);
    if (existingProductIndex >= 0) {
      cartItems[existingProductIndex].quantity = cartItems[existingProductIndex].quantity + 1;
    } else {
      cartItems.push({ ...this.product, quantity: 1 });
    }
    setLocalStorage("so-cart", cartItems);
    // Optionally, show feedback to the user here
  }
  renderProductDetails() {
    const brandName = document.querySelector("h3");
    if (brandName && this.product.Brand) {
      brandName.textContent = this.product.Brand.Name;
    }

    const name = document.querySelector("h2.divider");
    if (name) {
      name.textContent = this.product.NameWithoutBrand;
    }

    const image = document.querySelector("img.divider");
    if (image) {
      image.src = this.product.Image;
      image.alt = this.product.NameWithoutBrand;
    }

    const price = document.querySelector("p.product-card__price");
    if (price) {
      price.textContent = `$${this.product.FinalPrice}`;
    }

    const color = document.querySelector("p.product__color");
    if (color) {
      color.textContent = this.product.Colors.map((item) => item.ColorName).join(
        ",",
      );
    }

    const description = document.querySelector("p.product__description");
    if (description) {
      description.innerHTML = this.product.DescriptionHtmlSimple;
    }
  }
}

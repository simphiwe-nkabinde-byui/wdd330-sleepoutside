import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document.getElementById("addToCart").addEventListener("click", () => {
      this.addProductToCart();
      alertMessage("Product was added to cart");
    });
  }
  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array

    // if product is already in the cart, increment quantity otherwise add it to the cart
    const existingProductIndex = cartItems.findIndex(
      (item) => item.Id === this.product.Id,
    );
    if (existingProductIndex >= 0) {
      cartItems[existingProductIndex].quantity =
        cartItems[existingProductIndex].quantity + 1;
    } else {
      cartItems.push({ ...this.product, quantity: 1 });
    }

    setLocalStorage("so-cart", cartItems);
  }
  renderProductDetails() {
    const brandName = document.querySelector("h3");
    brandName.textContent = this.product.Brand.Name;

    const name = document.querySelector("h2.divider");
    name.textContent = this.product.NameWithoutBrand;

    const image = document.querySelector("img.divider");
    image.src = this.product.Images.PrimaryLarge;
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

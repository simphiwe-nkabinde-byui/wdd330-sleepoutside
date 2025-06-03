import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
    
    // Update cart count on page load
    this.updateCartCount();
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    
    // Trigger cart animation
    this.animateCartIcon();
    
    // Update cart count
    this.updateCartCount();
  }

  animateCartIcon() {
    const cartIcon = document.getElementById("cart-icon");
    const cartCount = document.getElementById("cart-count");
    
    if (cartIcon && cartCount) {
      // Remove animation classes if they exist
      cartIcon.classList.remove("cart-bounce");
      cartCount.classList.remove("cart-count-pulse");
      
      // Force reflow to restart animation
      cartIcon.offsetHeight;
      
      // Add animation classes
      cartIcon.classList.add("cart-bounce");
      cartCount.classList.add("cart-count-pulse");
      
      // Remove animation classes after animation completes
      setTimeout(() => {
        cartIcon.classList.remove("cart-bounce");
        cartCount.classList.remove("cart-count-pulse");
      }, 600);
    }
  }

  updateCartCount() {
    const cartItems = getLocalStorage("so-cart") || [];
    const cartCount = document.getElementById("cart-count");
    
    if (cartCount) {
      cartCount.textContent = cartItems.length;
      
      // Hide count if cart is empty
      if (cartItems.length === 0) {
        cartCount.style.display = "none";
      } else {
        cartCount.style.display = "flex";
      }
    }
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

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat("de-DE",
    {
      style: "currency", currency: "EUR",
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}
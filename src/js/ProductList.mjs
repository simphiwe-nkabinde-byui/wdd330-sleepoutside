import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Calcular si hay descuento
  const hasDiscount = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
    : 0;

  // Template del indicador de descuento
  const discountIndicator = hasDiscount 
    ? `<div class="discount-indicator">
         <span class="discount-badge">-${discountPercentage}% OFF</span>
         <span class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
       </div>`
    : '';

  return `
    <li class="product-card ${hasDiscount ? 'product-card--discounted' : ''}">
        <a href="product_pages/?product=${product.Id}">
            ${discountIndicator}
            <img
            src="${product.Image}"
            alt="${product.NameWithoutBrand}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <div class="price-container">
                <p class="product-card__price ${hasDiscount ? 'product-card__price--sale' : ''}">
                    $${product.FinalPrice.toFixed(2)}
                </p>
            </div>
        </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  
  async init() {
    const products = await this.dataSource.getData();
    this.renderList(products);
  }
  
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
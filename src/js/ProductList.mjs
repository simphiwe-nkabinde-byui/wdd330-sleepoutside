import { renderListWithTemplate } from "./utils.mjs";

function calculateDiscount(suggestedPrice, finalPrice) {
  if (!suggestedPrice || suggestedPrice <= finalPrice) {
    return null;
  }
  
  const discountAmount = suggestedPrice - finalPrice;
  const discountPercentage = Math.round((discountAmount / suggestedPrice) * 100);
  
  return {
    amount: discountAmount,
    percentage: discountPercentage
  };
}

function productCardTemplate(product) {
  const discount = calculateDiscount(product.SuggestedRetailPrice, product.FinalPrice);
  
  let discountHTML = '';
  let priceHTML = '';
  
  if (discount && discount.percentage > 0) {
    discountHTML = `
      <div class="discount-indicator">
        <span class="discount-badge">-${discount.percentage}%</span>
        <span class="discount-label">¡Oferta!</span>
      </div>
    `;
    
    priceHTML = `
      <div class="price-container">
        <span class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
        <span class="final-price">$${product.FinalPrice}</span>
        <span class="savings">Ahorras $${discount.amount.toFixed(2)}</span>
      </div>
    `;
  } else {
    priceHTML = `<p class="product-card__price">$${product.FinalPrice}</p>`;
  }

  return `
    <li class="product-card ${discount ? 'product-card--on-sale' : ''}">
      <a href="/product_pages/?product=${product.Id}">
        ${discountHTML}
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        ${priceHTML}
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
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
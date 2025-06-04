import { getParam, renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
        <li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
                <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.NameWithoutBrand}"
                />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.ListPrice}</p>
            </a>
        </li>
    `;
}

function sortList(list, field) {
  list.sort((a, b) => {
    if (!isNaN(a[field]) || !isNaN(b[field])) {
      return a[field] - b[field];
    }
    const nameA = a[field].toUpperCase(); // ignore upper and lowercase
    const nameB = b[field].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
}

function setNewParam(name, value) {
  let url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  params.set(name, value);
  window.location.href = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.sortButtons = {
      byName: document.querySelector("#sort-by-name"),
      byPrice: document.querySelector("#sort-by-price"),
    };
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    const sortField = getParam("sort");
    if (sortField) {
      sortList(list, sortField);
    }

    // addd click event listeners to sort buttons
    this.sortButtons.byName.addEventListener("click", () =>
      setNewParam("sort", "NameWithoutBrand"),
    );
    this.sortButtons.byPrice.addEventListener("click", () =>
      setNewParam("sort", "ListPrice"),
    );
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

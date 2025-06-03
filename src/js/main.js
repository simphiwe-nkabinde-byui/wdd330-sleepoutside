import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";


const tentsDataSource = new ProductData("tents");
const tentsElement = document.querySelector(".product-list");
const tentsList = new ProductList("tents", tentsDataSource, tentsElement);
tentsList.init();
loadHeaderFooter();

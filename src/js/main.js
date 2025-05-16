import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const category = 'tents'; // o la categoría que estés usando
const dataSource = new ProductData(category);

const listElement = document.querySelector('.product-list');
const tentList = new ProductList(category, dataSource, listElement);
tentList.init();

import { loadHeaderFooter, getParam, renderListWithTemplate } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// Inicializar header y footer
loadHeaderFooter();

// Función para crear template de productos
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

// Esperar a que se cargue el DOM y el header
setTimeout(() => {
  initializeSearch();
}, 200);

function initializeSearch() {
  // Configurar el formulario de búsqueda
  setupSearchForm();
  
  // Obtener el término de búsqueda de la URL
  const searchQuery = getParam('q');
  
  if (searchQuery) {
    searchProducts(searchQuery);
  } else {
    showNoSearch();
  }
}

function setupSearchForm() {
  const searchForm = document.getElementById('search-form');
  
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }
}

function handleSearch(event) {
  event.preventDefault();
  
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value.trim();
  
  if (query) {
    // Redirigir a la página de resultados de búsqueda
    window.location.href = `?q=${encodeURIComponent(query)}`;
  }
}

async function searchProducts(query) {
  try {
    // Mostrar loading
    document.getElementById('search-info').innerHTML = '<p>Buscando productos...</p>';
    
    const dataSource = new ExternalServices();
    const results = await dataSource.searchProducts(query);
    
    // Actualizar título y información
    document.getElementById('search-title').textContent = `Resultados para "${query}"`;
    document.getElementById('search-info').innerHTML = `
      <p>Se encontraron <strong>${results.length}</strong> productos para tu búsqueda.</p>
    `;
    
    if (results.length > 0) {
      // Mostrar resultados
      const productList = document.getElementById('product-list');
      renderListWithTemplate(productCardTemplate, productList, results, "afterbegin", true);
    } else {
      showNoResults(query);
    }
    
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    showError();
  }
}

function showNoResults(query) {
  document.getElementById('product-list').innerHTML = `
    <div class="no-results">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
      <h2>No se encontraron productos</h2>
      <p>No encontramos productos que coincidan con "${query}"</p>
      <p>Intenta con otros términos de búsqueda.</p>
    </div>
  `;
}

function showNoSearch() {
  document.getElementById('search-title').textContent = 'Búsqueda';
  document.getElementById('search-info').innerHTML = `
    <p>Usa el formulario de búsqueda para encontrar productos.</p>
  `;
}

function showError() {
  document.getElementById('product-list').innerHTML = `
    <div class="no-results">
      <h2>Error en la búsqueda</h2>
      <p>Hubo un problema al buscar productos. Intenta de nuevo.</p>
    </div>
  `;
}
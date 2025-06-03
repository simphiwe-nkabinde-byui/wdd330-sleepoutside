import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

// Agregar funcionalidad de búsqueda después de cargar el header
setTimeout(() => {
  setupSearch();
  updateCartCount(); // Actualizar contador del carrito en la página principal
}, 500); // Aumentamos el tiempo para asegurar que el header esté cargado

function setupSearch() {
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
    window.location.href = `search/?q=${encodeURIComponent(query)}`;
  }
}

function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = document.getElementById("cart-count");
  
  console.log("Cart items:", cartItems); // Para debugging
  console.log("Cart count element:", cartCount); // Para debugging
  
  if (cartCount) {
    cartCount.textContent = cartItems.length;
    
    // Hide count if cart is empty
    if (cartItems.length === 0) {
      cartCount.style.display = "none";
    } else {
      cartCount.style.display = "flex";
    }
  } else {
    // Si no encuentra el elemento, intentar de nuevo después de un poco más de tiempo
    setTimeout(updateCartCount, 200);
  }
}
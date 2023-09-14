// Solicitar el nombre del usuario a través de un prompt
const nombre = prompt("Por favor, introduce tu nombre:");

// Obtener el nombre de usuario
const nombreUsuario = document.getElementById("nombreUsuario");

// Mostrar el nombre del usuario 
nombreUsuario.textContent = `Bienvenido, ${nombre}!`;

// Definición de productos
const productos = [
    { name: "Tazas ZET", price: 200, discount: 0.1 },
    { name: "Platos ASIC", price: 267, discount: 0.1 },
    { name: "Porta Pie Elefant", price: 300, discount: 0 },
    { name: "Bowl GER", price: 467, discount: 0 },
    { name: "Vaso Fernet", price: 500, discount: 0 },
];
  
// referencias DOM
const productosList = document.getElementById("productosList");
const carritoList = document.getElementById("carritoList");
const totalElement = document.getElementById("total");
const mostrarDescuentosBtn = document.getElementById("mostrarDescuentos");
const comprarBtn = document.getElementById("comprarBtn");
  
// Objeto carrito de compras
const shoppingCart = {
    items: [],
  
    addItem: function(product) {
      this.items.push(product);
      this.render();
      this.saveToLocalStorage();
      this.showNotification(`Agregado: ${product.name}`);
    },
  
    removeItem: function(index) {
      this.items.splice(index, 1);
      this.render();
      this.saveToLocalStorage();
    },
  
    calculateTotal: function() {
      let total = 0;
        for (const item of this.items) {
            total += item.price * (1 - item.discount);
        }
        return total;
    },
  
    render: function() {
      carritoList.innerHTML = "";
      let total = 0;
  
      // Mostrar los productos en el carrito
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const carritoItem = document.createElement("li");
            carritoItem.innerHTML = `
            <div class="product-info">
                <span>${item.name} - Precio: $${item.price.toFixed(2)}</span>
                <span class="discount">${(item.discount * 100)}% descuento</span>
            </div>
            <button class="delete-button" onclick="shoppingCart.removeItem(${i})">✕</button>`;
            carritoList.appendChild(carritoItem);
            total += item.price * (1 - item.discount);
        }
  
      // Actualizar el total de la compra cada vez que se agrega un producto
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    },
  
    saveToLocalStorage: function() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
  
    loadFromLocalStorage: function() {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        this.items = JSON.parse(cartData);
        this.render();
      }
    },
  
    showNotification: function(message) {
      const notification = document.createElement("div");
      notification.className = "notification";
      notification.textContent = message;
      document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 2000);
    },
};
  
// Cargar carrito desde el local storage
shoppingCart.loadFromLocalStorage();
  
// prompt de compra realizada 
comprarBtn.addEventListener("click", () => {
    const productosComprados = shoppingCart.items.map(item => {
      let precioTexto = `${item.name} - Precio: $${item.price.toFixed(2)}`;
        if (item.discount > 0) {
            const precioConDescuento = item.price * (1 - item.discount);
            precioTexto += ` (Descuento ${item.discount * 100}%): $${precioConDescuento.toFixed(2)}`;
        }
        return precioTexto;
    }).join('\n');
  
    const totalCompra = shoppingCart.calculateTotal().toFixed(2);
    alert(`Compra realizada por un total de $${totalCompra}.\n\nProductos comprados:\n${productosComprados}\n\nGracias por su compra, ${nombre}`);
    shoppingCart.items = [];
    shoppingCart.render();
    shoppingCart.saveToLocalStorage();
});
  
  
// Función mostrarDescuentos
mostrarDescuentosBtn.addEventListener("click", () => {
    mostrarDescuentos();
});
  
// Función para mostrar productos
function mostrarProductos() {
    productosList.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span>${producto.name} - Precio: $${producto.price.toFixed(2)}</span>
        <span class="discount">${(producto.discount * 100)}% descuento</span>
        <button onclick="shoppingCart.addItem(productos[${i}])">Agregar al carrito</button>`;
      productosList.appendChild(listItem);
    }
}
  
// Mostrar productos de compra al cargar la página
mostrarProductos();
  
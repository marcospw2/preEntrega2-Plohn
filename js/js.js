// Array de productos
const productos = [
    { id: 1, nombre: "Teclado mecánico", descripcion: "Teclado mecánico con retroiluminación RGB", precio: 50, categoria: "Periféricos" },
    { id: 2, nombre: "Mouse inalámbrico", descripcion: "Mouse inalámbrico con sensor óptico", precio: 20, categoria: "Periféricos" },
    { id: 3, nombre: "Monitor curvo", descripcion: "Monitor curvo de 27 pulgadas con resolución 1080p", precio: 200, categoria: "Monitores" }
];

// Selección de elementos HTML
const botonAgregar = document.querySelectorAll(".agregar");
const carrito = document.querySelector("#carrito");
const total = document.querySelector("#total");
const busqueda = document.querySelector("#busqueda");
const formBusqueda = document.querySelector("form");

// Carrito de compras
let carritoDeCompras = [];

// Agregar evento de clic al botón "Agregar al carrito"
botonAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const productoId = boton.getAttribute("data-id");
        const producto = productos.find((producto) => producto.id == productoId);
        carritoDeCompras.push(producto);
        actualizarCarrito();
    });
});

// Actualizar carrito de compras
function actualizarCarrito() {
    carrito.innerHTML = "";
    carritoDeCompras.forEach((producto) => {
        const li = document.createElement("li");
        li.innerText = `${producto.nombre} - $${producto.precio}`;
        carrito.appendChild(li);
    });
    calcularTotal();
}

// Calcular total de compra
function calcularTotal() {
    let totalDeCompra = 0;
    carritoDeCompras.forEach((producto) => {
        totalDeCompra += producto.precio;
    });
    total.innerText = `$${totalDeCompra}`;
}

// Buscar productos por ID, precio o categoría
formBusqueda.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const valorBusqueda = busqueda.value.toLowerCase();
    const productosEncontrados = productos.filter((producto) => {
        return (
            producto.id.toString().toLowerCase().includes(valorBusqueda) ||
            producto.precio.toString().toLowerCase().includes(valorBusqueda) ||
            producto.categoria.toLowerCase().includes(valorBusqueda)
        );
    });
    console.log(productosEncontrados);
});

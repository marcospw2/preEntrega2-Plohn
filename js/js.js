// Array de productos
const productos = [
    { id: 1, nombre: "Teclado mecánico", descripcion: "Teclado mecánico con retroiluminación RGB", precio: 50, categoria: "Periféricos" },
    { id: 2, nombre: "Mouse inalámbrico", descripcion: "Mouse inalámbrico con sensor óptico", precio: 20, categoria: "Periféricos" },
    { id: 3, nombre: "Monitor curvo", descripcion: "Monitor curvo de 27 pulgadas con resolución 1080p", precio: 200, categoria: "Monitores" }
];

// Selección de elementos HTML
const botonAgregar = document.querySelectorAll(".agregar");
const carrito = document.querySelector("#carrito");
const total = document.querySelector("#total-aside");
const busqueda = document.querySelector("#busqueda");
const formBusqueda = document.querySelector("form");

// Carrito de compras
let carritoDeCompras = [];

// Agregar evento de click al botón "Agregar al carrito"
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
    const listaCarrito = document.querySelector("#lista-carrito");
    listaCarrito.innerHTML = "";
    if (carritoDeCompras.length === 0) {
        listaCarrito.innerHTML = "<li>No hay productos en el carrito</li>";
        total.innerText = "$0";
    } else {
        carritoDeCompras.forEach((producto) => {
            const li = document.createElement("li");
            li.innerText = `${producto.nombre} - $${producto.precio}`;
            listaCarrito.appendChild(li);
        });
        calcularTotal();
    }
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
    let productosEncontrados;
    if (valorBusqueda.startsWith(">")) {
        const precioFiltro = parseFloat(valorBusqueda.substring(1));
        productosEncontrados = productos.filter((producto) => producto.precio > precioFiltro);
    } else if (valorBusqueda.startsWith("<")) {
        const precioFiltro = parseFloat(valorBusqueda.substring(1));
        productosEncontrados = productos.filter((producto) => producto.precio < precioFiltro);
    } else {
        productosEncontrados = productos.filter((producto) => {
            const id = producto.id.toString().toLowerCase();
            const precio = producto.precio.toString().toLowerCase();
            return (
                id.includes(valorBusqueda) ||
                precio.includes(valorBusqueda) ||
                producto.categoria.toLowerCase().includes(valorBusqueda) ||
                producto.nombre.toLowerCase().includes(valorBusqueda) ||
                producto.descripcion.toLowerCase().includes(valorBusqueda)
            );
        });
    }
    console.log(productosEncontrados);
});




// formBusqueda.addEventListener("submit", (evento) => {
//     evento.preventDefault();
//     const valorBusqueda = busqueda.value.toLowerCase();
//     const productosEncontrados = productos.filter((producto) => {
//         // Convertir los valores de ID y Precio a string en minúsculas para la comparación
//         const id = producto.id.toString().toLowerCase();
//         const precio = producto.precio.toString().toLowerCase();
//         return (
//             id.includes(valorBusqueda) ||
//             precio.includes(valorBusqueda) ||
//             producto.categoria.toLowerCase().includes(valorBusqueda) ||
//             producto.nombre.toLowerCase().includes(valorBusqueda) ||
//             producto.descripcion.toLowerCase().includes(valorBusqueda)
//         );
//     });
//     console.log(productosEncontrados);
// });



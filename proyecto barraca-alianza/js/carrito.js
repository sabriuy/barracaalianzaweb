const navToggle = document.querySelector(".toggle");
const navCategorias = document.querySelector(".navbar-categorias");

navToggle.addEventListener("click", () => {
    navCategorias.classList.toggle("navbar-categorias_visible");
});

const prodJSON = localStorage.getItem("producto-en-carrito");
let prod = [];

if (prodJSON) {
    prod = JSON.parse(prodJSON);
}

const cart = document.getElementById("carrito-productos");
const contenedorPrecio = document.getElementById("precio-total");
let preciototal = 0;

cart.innerHTML = '';

if (prod.length === 0) {
    const carritovacio = document.createElement("div");
    carritovacio.className = "carrito-vacio";
    carritovacio.innerHTML = `
        <p>Tu carrito está vacío <i class="bi bi-emoji-frown"></i></p>
    `;
    cart.append(carritovacio);
} else {
    prod.forEach((producto, index) => {
        const precioProducto = parseFloat(producto.precio); 
        preciototal += precioProducto; 

        const productoElemento = document.createElement("div");
        productoElemento.className = "carrito-producto";
        productoElemento.dataset.index = index; // Añadir un índice para identificar el producto
        productoElemento.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="">
            <div class="carrito-producto-titulo">
                <small>Nombre</small>
                <h3>${producto.nombre}</h3>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio}</p>
            </div>
            <button class="carrito-producto-eliminar"><i class="bi bi-trash3-fill"></i></button>
        `;
           
        cart.append(productoElemento);
    });
}

contenedorPrecio.textContent = preciototal.toFixed(2);

const eliminarProducto = () => {
    const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach((botonEliminar) => {
        botonEliminar.addEventListener("click", (e) => {
            const productoElemento = e.target.closest(".carrito-producto");
            const index = productoElemento.dataset.index;

        
            prod.splice(index, 1);
            localStorage.setItem("producto-en-carrito", JSON.stringify(prod));

            
            productoElemento.remove();
            contadorCarrito();
            actualizaTotal();
        });
    });
};

const actualizaTotal = () => {
    preciototal = 0;
    document.querySelectorAll(".carrito-producto").forEach((productoElemento) => {
        const precio = parseFloat(productoElemento.querySelector(".carrito-producto-precio p").textContent);
        preciototal += precio;
    });
    contenedorPrecio.textContent = preciototal.toFixed(2);
};

const vaciarcarrito = () => {
    const botonvaciar = document.querySelector(".carrito-acciones-vaciar");
    botonvaciar.addEventListener("click", () => {
        const elcarrito = document.getElementById("carrito-productos");
        elcarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío <i class="bi bi-emoji-frown"></i></p>';
        localStorage.removeItem("producto-en-carrito");
        contadorCarrito();
        preciototal = 0;
        contenedorPrecio.textContent = preciototal.toFixed(2);
    });
};

eliminarProducto();
vaciarcarrito();


const comprarCarrito = ()=>{
   
    const botonComprar = document.querySelector(".carrito-acciones-comprar")
    botonComprar.addEventListener("click", ()=>{
    
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
          });
          swalWithBootstrapButtons.fire({
            title: "confirmar compra",
            text: "seguro que desea confirmar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si confirmar!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                const compra = document.getElementById("carrito-productos")
                compra.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío <i class="bi bi-emoji-frown"></i></p>';
                localStorage.removeItem("producto-en-carrito");
        
                preciototal = 0;
                contenedorPrecio.textContent = preciototal.toFixed(2);
                
              swalWithBootstrapButtons.fire({
                title: "Gracias por su compra",
                text: "Compra realizada con exito",
                icon: "success"
              });
            } else if (
             
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Siga explorando nuestro sitio",
                icon: "error"
              });
            }
          });
    })
}

comprarCarrito();


function contadorCarrito (){
  let numerito = document.querySelector("#numerito");
  if(prod.length===0){
numerito.textContent = 0
  }else
{   numerito.textContent = prod.length}
 
}



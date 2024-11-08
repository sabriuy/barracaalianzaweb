const navToggle = document.querySelector(".toggle")
const navCategorias = document.querySelector(".navbar-categorias")

navToggle.addEventListener("click", ()=>{
navCategorias.classList.toggle("navbar-categorias_visible")
});




const productos = [];
const url = "../js/objetos.json";
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");


const traerproductos = async () => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            productos.push(...data);
            displayProductos();
        } else {
            throw new Error("No se pudieron cargar los productos");
        }
    } catch (error) {
        contenedorProductos.innerHTML = "";
        console.error(error);
    }
};

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'green',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: false,
  })

const displayProductos = () => {
    productos.forEach((producto) => {
        const contenido = document.createElement("div");
        contenido.className = "producto";
        contenido.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}">
            <p class="producto-titulo">${producto.nombre}</p>
            <h2 class="precio">${producto.precio}</h2>
            <button class="producto-ver" data-producto='${JSON.stringify(producto)}'>Agregar al carrito</button>`;
        contenedorProductos.appendChild(contenido);
    });
};


const carrito = (producto) => {
    let productocarritoAgregado = JSON.parse(localStorage.getItem("producto-en-carrito")) || [];
    productocarritoAgregado.push(producto);
    localStorage.setItem("producto-en-carrito", JSON.stringify(productocarritoAgregado));
    console.log("Producto agregado al carrito:", producto);
    contadorCarrito() 

    function contadorCarrito (){
        let numerito = document.querySelector("#numerito");
        let productocarritoAgregado = JSON.parse(localStorage.getItem("producto-en-carrito"))
        if(productocarritoAgregado===0){
      numerito.textContent = 0
        }else
      {   numerito.textContent = productocarritoAgregado.length}
       
      }
      
      
     
    (async () => {
        await Toast.fire({
          icon: 'success',
          title: 'producto agregado en carrito',
        })
      })()
};


document.addEventListener("DOMContentLoaded", () => {
    traerproductos();
});


document.addEventListener("click", (event) => {
    if (event.target.classList.contains("producto-ver")) {
        const producto = JSON.parse(event.target.getAttribute("data-producto"));
        carrito(producto);
    }
});

const barra = document.querySelector("input#text");
const menuDesplegable = document.getElementById("menu-desplegable");

barra.addEventListener('keyup', e => {
    if (e.target.matches("#text")) {
        const filtro = e.target.value.toLowerCase();
        menuDesplegable.innerHTML = ""; 
        
        if (filtro === "") {
            
            return;
        }

        productos.filter(producto => {
            if (producto.nombre.toLowerCase().includes(filtro)) {
                const busqueda = document.createElement("div");
                busqueda.className = "busqueda";
                busqueda.innerHTML = `
                    <img class="carrito-producto-imagen" src="${producto.imagen}">
                    <p class="carrito-producto-titulo"><small><h4>Nombre:</h4></small>${producto.nombre}</p>
                    <h2 class="carrito-producto-precio-menu"><small>Precio: </small>${producto.precio}</h2>
                    <button class="producto-ver" id="producto-ver-menu" data-producto='${JSON.stringify(producto)}'>Agregar al carrito</button>`;
                menuDesplegable.appendChild(busqueda);
             }
        });
    }
});






 





  
 

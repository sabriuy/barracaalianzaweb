
const navToggle = document.querySelector(".toggle")
const navCategorias = document.querySelector(".navbar-categorias")

navToggle.addEventListener("click", ()=>{
navCategorias.classList.toggle("navbar-categorias_visible")
});



let imagenes = [];
 imagenes[0] = "../imagenes/img fondo/fondo1.jpg";
 imagenes[1] = "../imagenes/img fondo/fondo2.jpg";
 imagenes[2] = "../imagenes/img fondo/fondo3.jpg";
 imagenes[3] = "../imagenes/img fondo/fondo4.jpg";

let indiceImagenes = 0;
let tiempo = 2000;

function cambiarImagenes (){
    document.slider.src = imagenes[indiceImagenes];
    if(indiceImagenes<3){
        indiceImagenes++;
    }else{
        indiceImagenes = 0;
    }
}

setInterval(cambiarImagenes, tiempo);

cambiarImagenes();


const productos = [];
const url = "../js/objetos.json";
const contenedorProductos = document.getElementById("contenedor-productos");

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



const displayProductos = () => {
    productos.forEach((producto) => {
        const contenido = document.createElement("div");
        contenido.className = "producto";
        contenido.innerHTML =  ` <img class="producto-imagen" src="${producto.imagen}">
            <p class="producto-titulo">${producto.nombre}</p>
            <h2 class="precio">${producto.precio}</h2>
            <button class="producto-ver" data-producto='${JSON.stringify(producto)}'>Agregar al carrito</button>`;
        contenedorProductos.appendChild(contenido);
    });
};



document.addEventListener('DOMContentLoaded', () => {
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
});

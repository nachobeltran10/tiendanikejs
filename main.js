/* const items = document.getElementById('zapatillas')
const templateCard = document.getElementById('cartas').content
const fragment = document.createDocumentFragment();
const cartModal = document.querySelector('.cart-modal')
const cartTemplate = document.getElementById('cart-modal').content
let bag = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchdata()
})

items.addEventListener('click', e => {
    addBag(e)
})

const fetchdata = async () => {
    try {
        const res = await fetch('data.json')
        const data = await res.json()
        drawProduct(data)
    } catch (error) {
        console.log(error)
    }
}

const drawProduct = data => {
    data.forEach(producto => {
        templateCard.querySelector('h2').textContent = producto.nombre
        templateCard.querySelector('h3').textContent = producto.genero
        templateCard.querySelector('h4').textContent = producto.color
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.imagen)
        templateCard.querySelector('.cart-modal__Checkout').dataset.id = producto.id




        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    items.appendChild(fragment)
}


const addBag = e => {

    if (e.target.classList.contains('cart-modal__Checkout')) {
        setBag(e.target.parentElement)
    }
}



const setBag = objeto => {
    const producto = {
        id: objeto.querySelector('.cart-modal__Checkout').dataset.id,
        nombre: objeto.querySelector('h2').textContent,
        precio: objeto.querySelector('p').textContent,
        imagen: objeto.querySelector('img').setAttribute,
        cantidad: 1

    }
    if (bag.hasOwnProperty(producto.id)) {
        producto.cantidad = bag[producto.id].cantidad + 1
        
    }

    bag[producto.id] = { ...producto }
    drawBag()
}

const drawBag = ()=>{
    Object.values(bag).forEach(producto=>{
        cartTemplate.querySelector('.cart-modal__product').textContent = producto.nombre
        cartTemplate.querySelector('.cart-modal__price').textContent = producto.precio
        cartTemplate.querySelector('.quantity').textContent = producto.cantidad
        cartTemplate.querySelector('span').textContent = producto.cantidad * producto.precio
        cartTemplate.querySelector('.cart-modal__image').setAttribute("src", producto.imagen)

        const clone = cartTemplate.cloneNode(true)
        fragment.appendChild(clone)
    })
    cartModal.appendChild(fragment)
}



let bagIcon = document.querySelector('.bag-icon');

bagIcon.addEventListener('click',()=>{
    cartModal.style.display = "block";
})
 */

let productoContainer = document.getElementById('zapatillas');
let cartContainer = document.querySelector('.cart-modal__checkout-container')
let totalElement = document.querySelector('.total')
let cartModalContainer = document.querySelector('.cart-modal')
let lastValue = 0

let bagCart = []
let total = 0;

const cargarProductos = async () => {
    const respuesta = await fetch('data.json');
    const dataJson = await respuesta.json();

    dataJson.forEach(producto => {
        productoContainer.innerHTML +=

            `<div class="cartas" id=" ${producto.id} ">
        <div class="card-container">
            <div class="card-container__img-product">

            <img src=" ${producto.imagen} " alt="">
        </div>
        <div class="card-container__titulo">
            <h2> ${producto.nombre} </h2>
            <h3> ${producto.genero} </h3>
        </div>
        <div class="card-container__description">
            <h4> ${producto.color} </h4>

        </div>
        <p>$${producto.precio} </p>
        <button class="card__button" >Agregar</button>
        </div>
        
        </div>`

    })
    let addBtn = document.querySelectorAll('.card__button');
    addBtn = [...addBtn];

    function agregarProducto() {
        addBtn.forEach(btn => {
            btn.addEventListener('click', element => {

                /* BUSCAR ID */

                let actualId = parseInt(element.target.parentNode.parentNode.id)
                

                /* ENCONTRAR PRODUCTO CON ID */
                let actualProduct = dataJson.find(item => item.id == actualId)

                if (actualProduct.quantity === undefined) {
                    actualProduct.quantity = 1;
                }

                /* PREGUNTAR SI SE AGREGO EL PRODUCTO Y AGREGAR */

                let creado = false
                bagCart.forEach(productos => {
                    if (actualId == productos.id) {
                        creado = true
                    }
                })

                if (creado) {
                    actualProduct.quantity++

                } else {
                    bagCart.push(actualProduct)
                }


                /* AGREGAR PRODUCTO DEL CARRITO */

                dibujarBag()

                borrarCarrito()

                /* ACTUALIZAR TOTAL */
                totalElement.innerText = `Total $${total}`

                



            });

        });


    }

    agregarProducto()


}


cargarProductos()

/* FUNCION TOTAL CARRITO */

function getTotal() {
    let sumTotal
    return bagCart.reduce((sum, item) => {
        sumTotal = sum + item.quantity * item.precio
        return sumTotal
    }, 0);

}



/* FUNCION DIBUJAR CARRITO */

function dibujarBag() {
    cartContainer.innerHTML = '';
    bagCart.forEach(item => {
        total = getTotal()



        totalElement.innerText = `Total $${total}`
        cartContainer.innerHTML +=

            `<div class="cart-modal__details-container">
                        <img class="cart-modal__image" src="${item.imagen}" alt="">
                        <div>
                    <p class="cart-modal__product">${item.nombre}</p>
                    <p class="cart-modal__price">$${item.precio} x${item.quantity}</p>

                    </div>
                        <img class="cart-modal__delete" src="./img/icon-delete.svg" alt="">
                        </div>`


    })
    borrarCarrito()
    if (borrarCarrito) {
        total = getTotal()
        totalElement.innerText = `Total $${total}`
    }
    
            
        
    }


/* FUNCION BORRAR CARRITO */

function borrarCarrito() {
    let borrarBtn = document.querySelectorAll('.cart-modal__delete')
    borrarBtn = [...borrarBtn];
    borrarBtn.forEach(btn => {
        btn.addEventListener('click', (event) => {
            let actualNombre = (event.target.parentElement.childNodes[3].childNodes[1].innerText)
            let actualTituloObjeto = bagCart.find(item => item.nombre == actualNombre)

            bagCart = bagCart.filter(item => item != actualTituloObjeto)
            console.log(bagCart)
            dibujarBag()
            total = getTotal()
        })

    })
}

/* MODAL CARRITO MOSTRAR. CERRAR */

const bagIconBtn = document.querySelector(".header__cart");
const cartModal = document.querySelector(".cart-modal");
const productContainer = document.querySelector(".cart-modal__checkout-container");

bagIconBtn.addEventListener("click", () => {
    cartModal.classList.toggle("show");
    
    
}
);




/* * MENU HAMBURGESA */

function menuHamburgesa() {
    let menuIcon = document.querySelector(".header__menu");
    let closeIcon = document.querySelector(".modal-navbar__close-icon");
    let modalNavbar = document.querySelector(".modal-navbar__background");

    menuIcon.addEventListener("click", () => {
        modalNavbar.style.display = "block";
    });

    closeIcon.addEventListener("click", () => {
        modalNavbar.style.display = "none";
    });
}

menuHamburgesa();

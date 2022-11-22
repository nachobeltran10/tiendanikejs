
/* INPUT - BOTONES, MAS ,MENOS */

let minusBtn = document.querySelector(".input__minus");
let plusBtn = document.querySelector(".input__plus");
let userInput = document.querySelector(".input__number");

let userInputNumber = 0;

plusBtn.addEventListener("click", () => {
    userInputNumber++;
    userInput.value = userInputNumber;
});

minusBtn.addEventListener("click", () => {
    userInputNumber--;
    if (userInputNumber <= 0) {
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
});

/* BOTON AGREGAR A CARRITO */

const addToCartBtn = document.querySelector(".input__button");
let cartNotification = document.querySelector(".header__cart--notification");
let lastValue = parseInt(cartNotification.innerText);

function carrito() {
    addToCartBtn.addEventListener("click", () => {
        lastValue = lastValue + userInputNumber;
        localStorage.setItem('bagvalue', lastValue);

        cartNotification.innerText = lastValue;
        cartNotification.style.display = "block";
        drawModal();


    });
}

carrito();

let guardadoCartnotification = parseInt(localStorage.getItem('bagvalue'));




/* MODAL CARRITO */

const bagIconBtn = document.querySelector(".header__cart");
const cartModal = document.querySelector(".cart-modal");
const productContainer = document.querySelector(".cart-modal__checkout-container");

bagIconBtn.addEventListener("click", () => {
    cartModal.classList.toggle("show");

    if (lastValue == 0) {

        productContainer.innerHTML = '<p class="cart-empty">Tu Shop bag esta vacia</p>';
    } else {
        drawModal()

    }
});

/* BORRAR CARRITO */

function deleteProduct() {
    const deleteCartBtn = document.querySelector(".cart-modal__delete");

    deleteCartBtn.addEventListener("click", () => {
        productContainer.innerHTML =
            '<p class="cart-empty">Tu Shop bag esta vacia</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
        localStorage.clear()
    });
}



/* DIBUJAR CARRITO */

function drawModal() {
    productContainer.innerHTML = `
    <div class="cart-modal__details-container">
        <img class="cart-modal__image" src="./img/Air jordan 1 - thumnail1.png" alt="">
        <div>
            <p class="cart-modal__product">Air Jordan 1 Hi FlyEase</p>
            <p class="cart-modal__price">$57.000 x3 <span>$171.000</span></p>

        </div>
        <img class="cart-modal__delete" src="./img/icon-delete.svg" alt="">
    </div>
        <button class="cart-modal__Checkout">Checkout</button>`;
    deleteProduct()
    let priceModal = document.querySelector(".cart-modal__price");
    priceModal.innerHTML = `$57.000 x${lastValue} <span>$${lastValue * 57
        }.000</span>`;


}


/* MENU HAMBURGESA */

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



/* FUNCIONES GALLERY */

function changeNextImg(imageContainer) {
    if (imgIndex == 4) {
        imgIndex = 1
    } else {
        imgIndex++
    }

    imageContainer.style.backgroundImage = `url('../img/Air\ jordan-${imgIndex}.png')`

}

function changePreviusImg(imageContainer) {
    if (imgIndex == 1) {
        imgIndex = 4;
    } else {
        imgIndex--
    }

    imageContainer.style.backgroundImage = `url('../img/Air\ jordan-${imgIndex}.png')`
}

/* GALLERY MOVIL */

const imageContainer = document.querySelector('.gallery__image-container');
const previusBtn = document.querySelector('.gallery__previus');
const nextBtn = document.querySelector('.gallery__next');
let imgIndex = 1;


nextBtn.addEventListener('click', () => {
    changeNextImg(imageContainer)
})

previusBtn.addEventListener('click', () => {
    changePreviusImg(imageContainer)
})

/* GALLERY DESKTOP */

let thumbnails = document.querySelectorAll('.gallery__thumnail');
thumbnails = [...thumbnails]

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event => {
        console.log(event.target.id)
        imageContainer.style.backgroundImage = `url('../img/Air\ jordan-${event.target.id}.png')`
    })
})


/* MOSTRAR CARRITO DEL LOCALSTOREGE */
window.onload = () => {
    if (guardadoCartnotification) {
        cartNotification.innerText = guardadoCartnotification;
        cartNotification.style.display = "block";
        lastValue = guardadoCartnotification;

    }
}

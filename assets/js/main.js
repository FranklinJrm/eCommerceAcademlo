const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'assets/images/featured3.png',
      category: 'shirts',
      quantity: 20
    },
    {
        id: 4,
        name: 'Sweatshirts',
        price: 14.00,
        image: 'assets/images/home.png',
        category: 'shirts',
        quantity: 20
      }
]
let cart = JSON.parse(localStorage.getItem("data")) || [];

/* LOADER */
/* This function is responsible for making the loader disappear after 3 seconds from the moment it's executed */
const loadComponent = () => {
    const loader = document.getElementById( "loader" )

    setTimeout(() => {
        //Add the 'hide' class to the loader element
        loader.classList.add( "hide" )
    }, 1000);
}
window.addEventListener('scroll', function() {
    
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0)
})

window.addEventListener('scroll', function() {
    
    let nav = document.querySelector('nav');
    nav.classList.toggle('sticky', window.scrollY > 0)
})


/* SHOPPING CART VIEW */
const cart_1 = document.getElementById("cart-container")
const shopIcon = document.getElementById("cart-shop")
const shopCloseIcon = document.getElementById("close-cart")


// When a click occurs on the store icon, remove the hide class from the 'cart' element to make it visible
shopIcon.addEventListener("click", () => {
  cart_1.classList.remove("hide");
})


// When it detects a click on the close icon, it adds the 'hide' class back to the 'cart' element to hide it
shopCloseIcon.addEventListener( "click", () => {
    cart_1.classList.add("hide")
})

/* SHOW PRODUCT LIST */
const showProducts = () => {
    const productContainer = document.getElementById("products-list")

    let fragment = ``

    items.slice(0, -1).forEach( producto => {
        fragment += `
        <div class="product-card" id="${producto.id}">
            <div class="image--container">
            <img src="${producto.image}" alt="">
            </div>
            <p>$${producto.price.toFixed(2)}<span>Stock: ${producto.quantity}</span></p>
            <h4>${producto.name}</h4>
            <i class='bx bx-plus bx-md btn-add btn-add-apereance'></i>
        </div>
         `
    })

    productContainer.innerHTML = fragment

    cartFunctionality()
}


/* ADD FUNCTIONALITY TO BUTTONS ON PRODUCTS */
function cartFunctionality(){
    const btns = document.querySelectorAll(".btn-add")
    totalCantidad = 0
            for (const arti of cart) {
            totalCantidad += arti.cantidad
            } 

    btns.forEach( button => {
        button.addEventListener( "click", e => {
            let selectedProduct;
            const id = parseInt(e.target.parentElement.id)
            if(cart.find( item => item.id === id )) {
                selectedProduct = cart.find( item => item.id === id )
            }else {
                selectedProduct = items.find( item => item.id === id )
            }
            
            
            let index = cart.indexOf( selectedProduct )

            
            if( index !== -1 ){
                
                if( cart[index].quantity <= cart[index].cantidad ){
                    swal("No hay stock","", "error")
                }else{
                    
                    cart[index].cantidad++;
                }
                
            }else{
    
                selectedProduct.cantidad = 1

                
                cart.push( selectedProduct )
            }
                
            totalCantidad = 0
            for (const arti of cart) {
            totalCantidad += arti.cantidad
            }           
            
            cart_quantity.innerHTML = `${totalCantidad}`;
            showProductsInCart( cart )
            localStorage.setItem("data", JSON.stringify(cart));
        })
    } )
     cart_quantity.innerHTML = `${totalCantidad}`;
    showProductsInCart( cart )
    localStorage.setItem("data", JSON.stringify(cart));

}


/* List the products added to the cart */
function showProductsInCart(cart){
    const productSelect = document.getElementById("produc-selec")
    const idTotal = document.getElementById("total")
    let fragmen = ``
   
    let totals = 0
        cart.forEach(producto => {
        let subTotal = (producto.price)*(producto.cantidad)
        totals+=subTotal
        fragmen +=`
            <div class="cart--products">
                <div class="products--img">
                    <div class="products--center">
                        <img src="${producto.image}">
                    </div>
                </div>
                <div class="products--text">
                    <h3>${producto.name}</h3>
                    <p>Stock: ${producto.quantity} |<span> $${producto.price}.00</span></p>
                    <span class="span-sub">Subtotal:$${subTotal} </span>
                    <div class="text--btns">
                    <button class="btn-cart">-</button><label>${producto.cantidad}</label> units<button class="btn-cart"><i class='bx bx-trash-alt'></i></button>
                    </div>
                </div>
            </div>       
            ` })

            let total = `<div class="cart--items">
            <spam class="cart--count"> ${totalCantidad} Items<span>
            <spam class="cart--price"> Total: $${totals} <span>
            </div>
            <div class="cart--btn">
                <button class="btn-checkout"> <i class='bx bxs-check-shield'></i> Checkout</button>
         </div>`

        
        productSelect.innerHTML = fragmen
        idTotal.innerHTML = total
    }

const themeIcon = document.getElementById( "theme-btn" );
themeIcon.addEventListener( "click", () => {
    
    document.body.classList.toggle("dark")

    if( themeIcon.classList.contains("bx-moon") ){ //evaluar si existe la clase bx-moon
        themeIcon.classList.replace("bx-moon", "bx-sun");
    }else{
        themeIcon.classList.replace("bx-sun", "bx-moon");
    }

});

// Product filter function

const showProductsFiltered = (itemName) => {
    const productContainer = document.getElementById("products-list");
    let itemsSelection = [];
    if(itemName === 'all') {
        itemsSelection = items;
    } else {
        itemsSelection = items.filter((item) => item.name === itemName);
    }
    let fragment = ``;

    itemsSelection.forEach( producto => {
        fragment += `
        <div class="product-card" id="${producto.id}">
            <div class="image--container">
            <img src="${producto.image}" alt="">
            </div>
            <p>$${producto.price.toFixed(2)}<span>Stock: ${producto.quantity}</span></p>
            <h4>${producto.name}</h4>
            <i class='bx bx-plus bx-md btn-add btn-add-apereance'></i>
        </div>
         `
    });

    productContainer.innerHTML = fragment

    cartFunctionality()
}

document.addEventListener( "DOMContentLoaded", () =>{
    console.log( "DOM Cargado" ) ;
    console.log(cart);
    loadComponent() 
    showProducts()
})

// hamburger menu functionality

const menuBtn = document.getElementById("btn-menu")

const menu = document.querySelector(".menu--container")

menuBtn.addEventListener( "click" , () => {
    

    menu.classList.toggle("visible")
   
})



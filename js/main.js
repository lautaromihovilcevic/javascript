
/////////////////////////////////////////ARRAY PARA EL CARRITO////////////////////////////////////////////////////////
let products = [];

let cart = [];

//////////////////////FUNCION PARA GENERAR LAS CARTAS DE LA PAGINA PRINCIPAL//////////////////////////////////////////
function generateProductHTML(product) {
    return `
        <div class="col-md-4">
            <div class="card mb-4">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: $${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    `;
}

////////////////////////////////////FUNCION P/TRAER DATOS DEL JSON CON VALID/////////////////////////////////////////
function loadProducts() {
    fetch('json/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            return response.json();
        })
        .then(data => {
            products = data;
            renderProducts();
        })
        .catch(error => {
            console.error('Hubo un problema con la carga de productos:', error);
        });
}

/////////////////////////////FUNCION P/CARGAR LAS CARTAS DE LOS PROD. EN LA PAG PRINC DOM/////////////////////////////
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => generateProductHTML(product)).join('');
}
////////////////////////FUNCION P/AGREGAR UN PROD. AL CARRITO DE COMPRAS/////////////////////////////////////////////
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    Toastify({
        text: "Se ha agregado al carrito!",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: false,
        style: {
        background: "(to right, #30b09b, #96c93d)",
        }
    }).showToast();

    updateCartCount()
}
/////////////////////////////FUNCION P/CARGAR EL CARRITO DESDE EL ALMAC. LOCAL Y RENDERIZARLO////////////////////////
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    if (document.querySelector('.cart-items')) {
        renderCart();
    }
    updateCartCount();
}

///////////////////////FUNCION P/RENDERIZAR EL CARRITO DE COMPRAS EN LA PAG. DEL CARRITO DOM//////////////////////////
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'card mb-3';
        itemElement.innerHTML = `
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${item.image}" class="card-img" alt="${item.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.name} - $${item.price} x ${item.quantity}</h5>
                        <div class="d-flex justify-content-center align-items-center">
                            <input type="number" id="quantity-${item.id}" class="form-control w-25 mr-2" value="1" min="1" max="${item.quantity}">
                            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    totalElement.textContent = total.toFixed(2);
}
///////////////////////////////////FUNCION P/ELIMINAR UN ITEM DEL CARRITO////////////////////////////////////////////
function removeFromCart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantityToRemove = parseInt(quantityInput.value);
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > quantityToRemove) {
            item.quantity -= quantityToRemove;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}
//////////////////////FUNCION P/MOSTRAR LA CANT. DE ELEMENTOS DEL CARRITO (LO ACTUALIZA)///////////////////////////////
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = itemCount;

    ////////////////////////CAMBIA EL ICONO SI ESTA LLENO EL CARRITO O NO/////////////////////////////////////////////
    const cartIconElement = document.getElementById('cart-icon');
    if (itemCount > 0) {
        cartIconElement.classList.remove('bi-minecart');
        cartIconElement.classList.add('bi-minecart-loaded');
    } else {
        cartIconElement.classList.remove('bi-minecart-loaded');
        cartIconElement.classList.add('bi-minecart');
    }
}
///////LLAMO A LA FUNCION P/CARGAR LOS PROD. EN EL CARRITO Y QUE ACTUALICE EL CONT. DE ELEMENTOS AL CARGAR LA PAG.////
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    if (document.getElementById('product-list')) {
        loadProducts();
    }
});
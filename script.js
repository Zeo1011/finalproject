// OPEN & Close cart
const cartIcon = document.querySelector("#cart-icon");
const closeCart = document.querySelector("#cart-close");
const addCart = document.querySelector('.add-cart')
const cart = document.querySelector('.cart')

cartIcon.addEventListener('click', ()=>{
    cart.classList.add('active');
});

closeCart.addEventListener('click', ()=>{
    cart.classList.remove('active');
});

// add item to cart
let addCart_btn = document.querySelectorAll(".add-cart");
addCart_btn.forEach(btn =>{
    btn.addEventListener('pointerdown',addToCart);
});

function addToCart(e) {
  console.log('test');
  const cartProductTitle = document.createElement('div')
  cartProductTitle.textContent = e.target.parentElement.children[1].textContent
  cartProductTitle.className = 'cart-product-title'
  const cartPrice = document.createElement('div')
  cartPrice.textContent = e.target.parentElement.children[2].textContent
  cartPrice.className = 'cart-price'
  const cartQuantity = document.createElement('input')
  cartQuantity.type = "number"
  cartQuantity.value = 1
  cartQuantity.className = 'cart-quantity'
  cartQuantity.addEventListener("change", handle_changeItemQuantity);  
  const detailBox = document.createElement('div')
  detailBox.className = "detail-box" 
  detailBox.append(cartProductTitle, cartPrice, cartQuantity)
  const productImage = document.createElement('img')
  productImage.src = e.target.parentElement.children[0].src
  productImage.className = 'cart-img'
  const i = document.createElement('i');
  i.className = 'fa-solid fa-trash cart-remove'
  i.addEventListener("click", handle_removeCartItem);
  const cartBox = document.createElement('div')
  cartBox.className = 'cart-box'
  cartBox.append(productImage, detailBox, i)
  const productContents = document.querySelector('.cart-content')
  productContents.appendChild(cartBox)
  updateTotal();
}

// start document when ready
if(document.readyState =="loading"){
    document.addEventListener('DOMContentLoaded', start);
} else{
    start();
}

//Start
function start(){
    addEvents();
}

//update and render
function update(){
    addEvents();
    updateTotal();
}
let cartRemove_btn = document.querySelectorAll(".cart-remove");
console.log(cartRemove_btn);
cartRemove_btn.forEach(btn => {
    btn.addEventListener("click", handle_removeCartItem);
});
function handle_removeCartItem(){
    this.parentElement.remove();

    update();
}
//add events

// remove items from cart
function addEvents(){

//change item quantity
let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
cartQuantity_inputs.forEach(input => {
    input.addEventListener("change", handle_changeItemQuantity);
});
}
function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value <1 ){
        this.value = 1;
    }
    this.value = Math.floor(this.value); //to keep integer
   
    update();
}   

//update &render funtion
function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("₱",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });
    totalElement.innerHTML = "₱" + total;
}
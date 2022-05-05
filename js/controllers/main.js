// get product datas
// import { count } from 'console'
// import { count } from 'console'
import SPServices from '../services/ad-ProServices.js'

let spService = new SPServices()
let phoneList = [];

let carts = [];

let getSP = () => {
    spService.layDSSP()
    .then(result => {
        phoneList = result.data
        showSP(result.data)
    })
}
getSP()

// displayCart()
function showSP (products){
    let content = ''
    products.map((product, index) => {
        content += `
        <div class="box">
        <div class="image">
            <img src="${product.img}" class="main-img" alt="">
            <div class="icons addToCart" onclick="addToCart('${product.name}')">
                <i class="fas fa-shopping-cart" ></i>
            </div>
        </div>
        <div class="content">
            <h3>${product.name}</h3>
            <div class="products-info">
                <p>price: ${product.price}$</p>
                <p>screen: ${product.screen}</p>
                <p>backCamera: ${product.backCamera}</p>
                <p>frontCamera: ${product.frontCamera}</p>
                <p>${product.desc}</p>
            </div>
            <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </div>
        </div>
    </div>
        `
    })
    document.getElementById("idProducts").innerHTML = content;
    showResultCart()
}

// filer products 
function filterIAll(){
    let productList = []
    phoneList.map(cart => {
        productList.push(cart)
    })
    showSP(productList)
}
window.filterIAll = filterIAll

// Filter Iphone
function filterIphone(){
    let productList = []
    productList = phoneList.filter(cart => cart.type === 'iphone')
    showSP(productList)
}
window.filterIphone = filterIphone

// filter samsung
function filterSamSung(){
    let productList = []
   productList = phoneList.filter(cart => cart.type === 'samsung')
   showSP(productList)
}
window.filterSamSung = filterSamSung



function addToCart(phoneName) {
    let isNamePhone = true
    isNamePhone = carts.some(item => item.product.name === phoneName)

    if(isNamePhone) {
        carts.map(cart => {
            if(cart.product.name === phoneName) {
                cart.quanity++
            }
        })
    }
    else {
        phoneList.map(item => {
            if(item.name === phoneName) {
                var cartItems = {
                    product: item,
                    quanity : 1
                }
                carts.push(cartItems)
            }
        })
    }
    setPhoneLocal() 
    showResultCart()
}
export default carts
window.addToCart = addToCart

// show result to cart after add
let cartShow = document.getElementById('icons-quanity')
function showResultCart () {
    let count = 0

    let qtyCart = localStorage.getItem('Carts') ? JSON.parse(localStorage.getItem('Carts')) : []
    qtyCart.map(cart => {
        count += cart.quanity
        console.log(count);
    })
    if(count) {
           cartShow.textContent = count 
    }
    else {
        cartShow.textContent = 0
    }

}

export  function setPhoneLocal() {
    localStorage.setItem('Carts', JSON.stringify(carts));
}

export let idMoney = document.getElementById("idMoney")

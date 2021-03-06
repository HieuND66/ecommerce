import { setPhoneLocal } from "./main.js"
import { idMoney } from "./main.js"
var carts = []

function getPhoneLocal() {
    if (localStorage.getItem('Carts') != null) {
        carts = JSON.parse(localStorage.getItem('Carts'))
        renderSPCart()
 
    }
}
getPhoneLocal()
totalMoney()
// render products after choose at cart folder
function renderSPCart () {
    let content = ''
    
    carts.map((cart,index) => {
        content += `
        <div class="box" id="box-${cart.product.name}">
        <i class="fas fa-times" onclick="deletePhone('${cart.product.name}')"></i>
        <img src="${cart.product.img}" alt="">
        <div class="content">
            <h3>${cart.product.name}</h3>
            <form action="">
                
                <span class="caculator-list">
                    <div class="caculator-item">
                        <div class="caculator-btn" onclick="caculatorDeincrease('${cart.product.name}')">
                            <i class="fas fa-arrow-left"></i>
                        </div>
                        <p>${cart.quanity}</p>
                        <div class="caculator-btn"  onclick="caculatorIncrease('${cart.product.name}')">
                            <i  class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </span>
            </form>
            <div id="price" class="price">$${cart.product.price * cart.quanity}</div>
        </div>
    </div>
        `
    })
    
    document.querySelector(".box-container").innerHTML = content
}
export default renderSPCart
function caculatorIncrease(namePhone) {
    carts.map(cart => {
        if(cart.product.name === namePhone) {
            cart.quanity++
        
        }
    })
    renderSPCart()
    setPhoneLocal()
    totalMoney()
}
window.caculatorIncrease = caculatorIncrease
function caculatorDeincrease(namePhone) {
    carts.map(cart => {
        if(cart.product.name === namePhone && cart.quanity > 1) {
            cart.quanity--
            
        }
    })
    renderSPCart()  
    setPhoneLocal()
    totalMoney()
}
window.caculatorDeincrease = caculatorDeincrease
function lookPosition(namePhone) {
  let position = -1;
  carts.map((cart,index) => {
    if(cart.product.name === namePhone) {
      position = index
    }
  })
  return position
}
// delete san pham

function deletePhone(namePhone) {
 let position = lookPosition(namePhone)
  if(position != -1) {
    carts.splice(position,1)
  }
  setPhoneLocal()

  renderSPCart()
  totalMoney()
}
window.deletePhone = deletePhone
// t??nh t???ng ti???n 
function totalMoney() {
    let totalMoney 
    totalMoney = carts.reduce((total, current) => {
      return (total + Number(current.product.price)*current.quanity)
    },0)
    idMoney.innerHTML = `$${totalMoney}` 
    // console.log("ok");
    renderSPCart()  
    // setPhoneLocal()
}

// notification when payment
document.getElementById("btnPayment").onclick = function () {
  if(carts.length > 0) {
    carts = []

    setPhoneLocal()
    renderSPCart()
    totalMoney()
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'B???n ???? thanh to??n th??nh c??ng',
      showConfirmButton: false,
      timer: 1500
    })
  }
}

document.getElementById("btnPaymentDelete").onclick = function () {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'B???n mu???n x??a h???t s???n ph???m?',
        text: "B???n kh??ng th??? l???y l???i s???n ph???m!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '?????ng ??, X??a h???t!',
        cancelButtonText: 'Kh??ng, H???y!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed && carts != null) {
            carts = []

            setPhoneLocal()
            renderSPCart()
            totalMoney()
          swalWithBootstrapButtons.fire(
            '???? x??a!',
            'T???t c??? s???n ph???m ???? x??a.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'H???y B???',
            'S???n ph???m c???a b???n v???n c??n trong kho :)',
            'error'
          )
        }
      })

}


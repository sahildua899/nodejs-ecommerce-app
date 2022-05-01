var projectCheckout = document.getElementById('left-section');
var itemCount = document.getElementById('item-count');
var totalAmount = document.getElementById('total-amount');
var placeOrder = document.getElementById('btn-place-order');
var productList = window.localStorage.getItem('product-list');
productList = productList === null || productList === '' ? [] : productList;
productList = productList.length > 0 ? JSON.parse(productList) : [];

function checkData(data) {
    projectCheckout.innerHTML += `<div class="checkout-card">
    <div class="image-section">
        <img src="${data.preview}" alt="" class="product-checkout-image">
    </div>
    <div class="content-section">
        <h4 class="product-checkout-name">${data.name}</h4>
        <p class="product-checkout-count"> x${data.count}</p>
        <p class="product-checkout-amount">Amount: Rs  <span>${parseInt(data.count) * parseInt(data.price)}</span></p>
    
    </div> 
    
    </div>`
}
var grandTotal = 0;
for(i=0; i<productList.length; i++) {
    checkData(productList[i]);
    var totalForCurrentProduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);
    grandTotal = grandTotal + totalForCurrentProduct;

}
itemCount.innerHTML = productList.length;
totalAmount.innerHTML = grandTotal;

placeOrder.addEventListener('click', function(){
    var orderItems = [];
    for(i=0; i<productList.length; i++) {
        var orderData = {
            "id": productList[i].id,
            "brand": productList[i].brand,
            "name": productList[i].name,
            "price": productList[i].price,
            "preview": productList[i].preview,
            "isAccessory": productList[i].isAccessory
        }
        orderItems.push(orderData);
    }
    var itemObj = {
        amount:grandTotal,
        products: orderItems
    }
    
    var sendData = new XMLHttpRequest()
    sendData.open('POST', 'https://614590b038339400175fc5f8.mockapi.io/Order', true);

    sendData.onreadystatechange = function(){
        if(this.readyState == 4) {
            if(itemObj == undefined|| itemObj.amount == 0) {
                alert('Add Something in Cart Before placing Order')
            }else {
            alert(`Yoohoo, Order Placed Successfully`);
            window.localStorage.setItem('product-list', []);
            location.assign('thankyou');
            }
        }
    }
    sendData.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    sendData.send(JSON.stringify(itemObj));

})
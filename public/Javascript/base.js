var cartCount = document.getElementById('cart-count');
var mainCart = document.getElementById('cart-wrapper');
var productList = window.localStorage.getItem('product-list');
    productList = productList === null || productList === '' ? [] : productList;
     productList = productList.length > 0 ? JSON.parse(productList) : [];
     var cardCount = 0;
        for(var i=0; i<productList.length; i++) {
            cardCount = cardCount + productList[i].count;
        }
        cartCount.innerHTML = cardCount;

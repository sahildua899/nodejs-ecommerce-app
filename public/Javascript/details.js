$(document).ready(function() {

var productId = window.location.search.split('=')[1];  

    
    


var projectContainer = document.getElementById('project-container');




var detailsproduct = new XMLHttpRequest();
detailsproduct.open('GET', `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productId}` , true);
detailsproduct.onreadystatechange = function() {
    if(this.readyState == 4) {
        var productData = JSON.parse(this.responseText);

        projectContainer.innerHTML = `<div class="project-wrapper">
        <div class="image-section">
            <img src="${productData.preview}" alt="" class="main-image">
        </div>
        <div class="content-container">
            <h3 class="product-title">${productData.name}</h3>
            <p class="product-brand">${productData.brand}</p>
            <p class="product-price">Price: Rs. <span class="payment">${productData.price}</span></p>
            <p class="description-heading">Description</p>
            <p class="description">${productData.description}</p>
            <p class="product-preview-heading">Product Preview</p>
            <div class="product-preview-images">
                
            </div>
            <button class="cart-button">Add to Cart</button>
      
        </div>
      </div>`
      
      // Creating Image Grid
      
      var productPreviewImage = document.querySelector('.product-preview-images')
      // productPreviewImage.classList.add('product-preview-images');
      
      function productPreview (i) {
        var imagesData = productData.photos;
        var images = document.createElement('img');
        images.classList.add('images');
        if(i===0) {
          images.classList.add('active');
        }
        images.src = imagesData[i];
        productPreviewImage.appendChild(images);
      }
      
      for (i=0; i<productData.photos.length; i++) {
        productPreview(i);
      }
      
      const topImage = document.querySelector(".main-image"); 
      const mainImages = document.querySelectorAll(".images");
      
      for (let i = 0; i < mainImages.length; i++) {
        mainImages[i].addEventListener("click", function () {
          const mainBorders = document.querySelector(".active"); 
          mainBorders.classList.remove("active"); 
      
          mainImages[i].classList.add("active"); 
              topImage.src = mainImages[i].src;
        });
      }
      const addToCart = document.querySelector('.cart-button');
      var productList = window.localStorage.getItem('product-list');
       productList = productList === null || productList === '' ? [] : productList;
      productList = productList.length > 0 ? JSON.parse(productList) : [];

      addToCart.addEventListener('click', function(){
        

        var foundAtPos = -1;
        for(var i=0; i < productList.length; i++) {
            if(parseInt(productList[i].id) == parseInt(productData.id)) {
                foundAtPos = i;
            }
        }
        if(foundAtPos > -1) {
          productList[foundAtPos].count = productList[foundAtPos].count + 1;
          window.localStorage.setItem('product-list', JSON.stringify(productList));
      } else {
          productData.count = 1;
          productList.push(productData);
          window.localStorage.setItem('product-list', JSON.stringify(productList));
      }
        var cardCount = 0;
        for(var i=0; i<productList.length; i++) {
            cardCount = cardCount + productList[i].count;
        }
        cartCount.innerHTML = cardCount;
      })
    }
}

detailsproduct.send();
});
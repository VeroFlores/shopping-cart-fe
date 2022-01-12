export const productCard=(product)=>{
    const itemCard=`
    <div class = "product-item">
        <div class = "product-img">
            <img src = "${product.url_image}" alt="${product.name}">
        </div>
        <span class = "product-discount">-${product.discount}%</span>
        <div class = "product-content">
            <h3 class = "product-name color">${product.name}</h3>
            
            <p class="product-code color">S/${product.price.toFixed(2)}</p>
        </div>
        <input type = "button" class = "btn add-to-cart" value="Add to cart">
    </div>
    `;
    return itemCard;
}
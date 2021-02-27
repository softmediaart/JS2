const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const elementProduct = document.querySelector('.products');

function renderProduct (title, price) {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
}

function renderProducts (list) {
    let productDiv = "";
   products.forEach(function(product) {
       productDiv += renderProduct(product.title,  product.price);
    })

    elementProduct.insertAdjacentHTML("afterbegin",productDiv);
}
renderProducts(products);

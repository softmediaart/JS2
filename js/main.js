class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    console.log('constructor');
    this.container = container;
    // this._goods = [];
    this.#goods = [];
    this.#allProducts = [];

    this.#fetchGoods();
    this.#render();
    // this.sum = 0; // BAD!
    this.goodsTotalPrice();
  }

  // goodsTotalPrice() { // Very BAD!
  //   let totalPrice = 0;
  //   this.#goods.forEach(function (good) {
  //
  //       totalPrice += good.price;
  //       console.log(good.price);
  //
  //   });
  //
  // }
  //
  //   document.querySelector('.blockTotal').insertAdjacentHTML('beforeend', `Сумма = ${this.sum}`);
  // return НО НЕ this.sum!!!


  // getTotalWithDiscount(discont) {
  //   return this.goodsTotalPrice() * discont;
  //


  #fetchGoods() {
    this.#goods = [
      {id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},
      {id: 3, title: 'Keyboard', price: 5000},
      {id: 4, title: 'Gamepad', price: 4500},
    ];
  }

  #render() {
    const block = document.querySelector(this.container);

    this.#goods.forEach((product) => {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());

    });
  }


  goodsTotalPrice() {
    let totalPrice = 0;
    this.#goods.forEach(function (product) {
      totalPrice += product.price;
      console.log(product.price);
    });

    const conunt = new GoodsTotalPrice(totalPrice);
    document.querySelector('.blockTotal').insertAdjacentHTML('beforeend', `Итоговая стоимость ${conunt.area}`);
  }

}

class GoodsTotalPrice {
  constructor(totalPrice) {
    this.totalPrice = totalPrice;
  }

  get area() {
    return this.calcArea();
  }
  calcArea() {
    return this.totalPrice;

  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;

  }



  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }

}




const productList = new ProductList();


// Добавление товара в корзину (привязываем на нажатие кнопки)
// addToBasket() {}
//
// // Удаление товара из корзины (привязываем на нажатие кнопки)
// deleteFromBasket() {}
//
// // Метод, который определяет, добавлены ли в корзину какие-либо товары и при их наличии активирует кнопку "Оформить заказ"
// isOrder() {}
//
// // Метод открывания корзины
// openBasket() {}









// const goodsTotalPrice= new TotalPrice();


// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = ({ title, price }, img='https://placehold.it/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${title}</h3>
//                   <p>${price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);

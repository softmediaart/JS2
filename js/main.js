// Внешняя функция для вызова добавления в корзину
function addBasket(id) {
  cart.addToBasket(id);
};
// Внешняя функция для вызова удаления из корзины
function deleteItem(id) {
  cart.deleteFromBasket(id);
};

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// Перевести на Promise НЕ ИСПОЛЬЗОВАТЬ fetch
// let getRequest = (url, callBack) => {
  // let xhr = new XMLHttpRequest();
  // xhr.open('GET', url, true);
  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState === 4) {
  //     if (xhr.status !== 200) {
  //       console.log('Error');
  //     } else {
  //       callBack(xhr.responseText);
  //     }
  //   }
  // }
  // xhr.send();
  function getRequest(url, callBack) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => resolve(callBack(xhr.responseText));
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }


///////////////////////////////////////

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    console.log('constructor');
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];

    this.#fetchGoods();
    this.#render();
  //   this.#getProducts()
  //       .then((data) => {
  //         this.#goods = [...data];
  //         this.#render();
  //       });
  }

  goodsTotalPrice() {
    return this.#goods.reduce((sum, { price }) => sum + price, 0);
  }

  #fetchGoods() {
    getRequest(`${API}/catalogData.json`, (data) => {
      console.log(data);
      this.#goods = JSON.parse(data);
      this.#render();
      console.log(this.#goods);
      console.log(this.#allProducts);
    });
  }
  // #getProducts() {
  //   return fetch(`${API}/catalogData.json`)
  //       .then((response) => response.json())
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // }

  #render() {
    const block = document.querySelector(this.container);

    this.#goods.forEach((product) => {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
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

class Basket {
  constructor() {
    this.cartGoods = [];
  }

  // Добавление товара в корзину (привязываем на нажатие кнопки)
  addToBasket(id) {
    let toBasket;
    list.goods.forEach(function (item) {

        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;

    });
    this.cartGoods.push(toBasket);
    this.goodsTotalPrice();
  }

  // Удаление товара из корзины (привязываем на нажатие кнопки)
  deleteFromBasket(id) {
    let getIdElemen;
    this.cartGoods.forEach(function (item, i) {
      let thisId = item.id;
      if (id == thisId) {
        getIdElemen = i;
      }

    });
    this.cartGoods.splice(getIdElemen, 1);
    this.render();
    this.goodsTotalPrice();
  }
}

const productList = new ProductList();
  const cartGoods = new Basket();





const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/**
 * Описываем базовые классы
 */
class List {
    constructor(url, container, list = ListContext) {
      this.container = container;
      this.list = list;
      this.url = url;
      this.goods = [];
      this.allProducts = [];
      this.filtered = [];
      this._init();
    }

  /**
   * Получение данных с сервера
   * @param url
   * @returns {Promise<any | never>}
   */
   getJson(url) {
     return fetch( url ? url : `${API + this.url}`)
         .then( result => result.json())
         .catch(error => {
           console.log(error);
         })
  }

  /**
   * обработка и получение данных
   * @param data
   */
  handleData(data) {
    this.goods = [...data];
    this.render();
  }

  /**
   * подчёт стоимости всех товаров
   * @returns {*|number}
   */
  calcSum() {
     return this.allProducts.reduce((accum,item) => accum + item.price, 0);
  }
  render() {
     const block = document.querySelector(this.container);
     for (let product of this.goods) {
       console.log(this.constructor.name);
       const productObj = new this.list[this.constructor.name](product);
       console.log(productObj);
       this.allProducts.push(productObj);
       block.insertAdjacentHTML('beforeend',productObj.render());
     }

  }

   /**
   * метод поиска товара
   * @param value  - поисковый запрос
   */

   filter(value) {
     const regexp = new RegExp (value, 'i');
     this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
     this.allProducts.forEach(el => { })
   }
  _init(){
     return false
  }

}

class Item {
  constructor(el, img = 'https://placehold.it/200x150') {
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
  }
  render() {
    return ``;
  }
}

/**
 * Наследование от базовых классов
 */

class ProductList extends List{
  constructor(cart, container = '.products', url = "/catalogData.json") {
  super(url,container);
  this.cart = cart;
  this.getJson()
      .then(data => this.handleData(data));
  }
  _init() {
    document.querySelector(this.container).addEventListener('click', e => {
      if(e.target.classList.contains('buy-btn')) {
        this.cart.addProduct(e.target);
      }
    });
    document.querySelector('.search-form').addEventListener('submit', e => {
      e.preventDefault();
      this.filter(document.querySelector('.search-field').value)
    })
  }
}


class ProductItem extends Item{
  render() {
    return `<div class="product-item" data-id="${this.id_product}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">             
                  <h3>${this.product_name}</h3>
                  <p>${this.price} Р</p>
                  <button class="buy-btn"
                  data-id= "${this.id_product}"
                  data-name= "${this.product_name}"
                  data-price= "${this.price}">Купить </button>
              </div>
          </div>`;
  }
}

class Cart extends List {
  constructor(container = ".cart-block", url = "/getBasket.json") {
    super(url, container);
    this.getJson()
        .then(data => {
          this.handleData(data.contents);
        });
  }

  /**
   * добавление товара
   * @param element
   */
  addProduct(element) {
    this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if(data.result === 1) {
            let productId = +element.dataset['id'];
            let find = this.allProduct.find(product => product.id_product === productId);
            if(find) {
              find.quantity++;
              this._updateCart(find);
            }else {
              let product = {
                id_product: productId,
                price: +element.dataset['price'],
                product_name: element.dataset['name'],
                quantity: 1
              };
              // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить
              // При добавление нового товара, нас интересует только он один.
              this.goods = [product];
              // Далее вызываеться метод render, мы добавлем в allProducts только его, тем самым избегая лишнего перерендера.
              this.render();
            }
          } else {
            alert('Error');
          }
        })
  }

  /**
   * удаление товара
   * @param element
   */
  removeProduct(element) {
    this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if(data.result === 1) {
            let productId = +element.dataset['id'];
            let find = this.allProduct.find(product => product.id_product === productId);
            if(find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
              find.quantity--;
              this._updateCart(find);
            }else { //удаляем
              this.allProducts.slice(this.allProducts.indexOf(find),1);
              document.querySelector(`.card-item[data-id="${productId}"]`).remove();
            }
          } else {
            alert('Error');
          }
        })

  }

  /**
   * добавляем данные корзины
   * @param product
   * @private
   */

  _updataCart(product) {
    let block =document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('product-price').textContent = `${product.quantity * product.price} Р`;

  }
  _init() {
    document.querySelector('.btn-cart').addEventListener('click',() => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', e => {
      if(e.target.classList.contains('del-btn')) {
        this.removeProduct(e,target);
      }
    })
  }

}

class CartItem extends Item {
  constructor(el, img = 'https://placehold.it/200x150') {
    super(el, img);
    this.quantity = el.quantity;
  }

  render() {
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество:  ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
         </div>
        </div>
        <div class="right-block">
        <p class="product-price">${this.quantity * this.price} P </p>
        <button class="del-btn" data-id="${this.id_product}">x</button>
        </div>
        </div>`
  }
}

const ListContext = {
  ProductsList: ProductItem,
  Cart: CartItem
};

let cart = new Cart();
let products = new ProductList(cart);


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
// }
// function getRequest(url, callBack) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.onload = () => resolve(callBack(xhr.responseText));
//     xhr.onerror = () => reject(xhr.statusText);
//     xhr.send();
//   });
// }
// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//       let xhr = new XMLHttpRequest();
//       xhr.open("GET", url, true);
//       xhr.onreadystatechange = () => {
//           if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//               reject('Error');
//             } else {
//               resolve(xhr.responseText);
//             }
//           }
//         }
//         xhr.send();
//     });
//   }
///////////////////////////////////////






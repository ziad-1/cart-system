// let products = [
//   { id: 1, name: "iPhone x", price: 400 },
//   { id: 2, name: "iPhone 11", price: 450 },
//   { id: 3, name: "iPhone 12", price: 500 },
//   { id: 4, name: "iPhone 13", price: 550 },
//   { id: 5, name: "iPhone 14", price: 600 },
// ];

// let productsJson = JSON.stringify(products);
// localStorage.setItem('products',productsJson);
let products = JSON.parse(localStorage.getItem('products')) ;

let cart = [];

let productsDiv = document.querySelector("#productsDiv");
let table = document.querySelector("tbody");
let totalSpan = document.querySelector("#totalSpan");

function showProducts() {
  products.forEach((el) => {
    productsDiv.innerHTML += `
      <div class="col-12 p-3 bg-white shadow rounded border">
        <h5>${el.name}</h5>
        <div class="d-flex align-items-center justify-content-between">
          <p class="mb-0">Price : ${el.price} $</p>
          <button class="btn btn-success" onclick="addToCart(${el.id})">Add To Cart</button>
        </div>
      </div>
    `;
  });
}

function addToCart(id) {
  let product = products.find((el) => {
    return el.id === id;
  });

  let indexInCart = cart.findIndex((el) => {
    return el.id === id;
  });

  if (indexInCart === -1) {
    cart.push({ ...product, qty: 1 });
  } else {
    cart[indexInCart].qty++;
  }

  updateCart();
}

function updateCart() {
  table.innerHTML = "";

  cart.forEach((el, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${el.name}</td>
        <td>${el.price} $</td>
        <td>
          <div class="d-flex align-items-center justify-content-center gap-2">
            <button id="decrease" class="btn btn-danger btn-sm" onclick="decreaseQty(${
              el.id
            })">-</button>
            <p class="mb-0">${el.qty}</p>
            <button id="increase" class="btn btn-success btn-sm" onclick="increaseQty(${
              el.id
            })">+</button>
          </div>
        </td>
        <td>${el.qty * el.price} $</td>
        <td>
          <button id="del" class="btn btn-danger btn-sm" onclick="deleteItem(${
            el.id
          })">Del</button>
        </td>
      </tr>
    `;
  });

  getTotal();
}

function deleteItem(id) {
  cart = cart.filter((el) => {
    return el.id !== id;
  });
  updateCart();
}

function increaseQty(id) {
  let item = cart.find((el) => {
    return el.id === id;
  });
  item.qty++;
  updateCart();
}

function decreaseQty(id) {
  let item = cart.find((el) => {
    return el.id === id;
  });
  if (item.qty > 1) {
    item.qty--;
  } else {
    deleteItem(id);
  }
  updateCart();
}

let getTotal = () => {
  let final = 0;
  cart.forEach((el) => {
    final += el.price * el.qty;
  });
  totalSpan.innerText = final;
};

let resetBill = () => {
  table.innerHTML = "";
  totalSpan.innerText = 0;
  cart = [];
};

function addNewPhone() {
  let name = prompt("Enter phone name:");
  let price = +prompt("Enter phone price:");
  let newProduct = { id: products.length + 1, name: name, price: price };
  products.push(newProduct);
  localStorage.setItem('products',JSON.stringify(products));
  productsDiv.innerHTML += `
    <div class="col-12 p-3 bg-white shadow rounded border">
      <h5>${newProduct.name}</h5>
      <div class="d-flex align-items-center justify-content-between">
        <p class="mb-0">Price : ${newProduct.price} $</p>
        <button class="btn btn-success" onclick="addToCart(${newProduct.id})">Add To Cart</button>
      </div>
    </div>
  `;
}
function printBill() {
  let rightSection = document.querySelector('.col-4');
  let buttons = document.querySelector('#buttons');
  let decrease = document.querySelector('#decrease')
  let increase = document.querySelector('#increase')
  let del = document.querySelector('#del')
  rightSection.style.display = 'none';
  buttons.style.display = 'none';
  decrease.style.display = 'none';
  increase.style.display = 'none';
  del.style.display = 'none';

  window.onafterprint = function () {
    rightSection.style.display = 'block';
    buttons.style.display = 'block';
    decrease.style.display = 'block';
    increase.style.display = 'block';
    del.style.display = 'block';
  };

  window.print();
}

showProducts();

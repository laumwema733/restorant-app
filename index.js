"use strict";

import { menuArray } from "./data.js";
const totalArr = [];
document.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.dataset.add) {
    handleAddClick(+e.target.dataset.add);
  }
  if (e.target.id === "btn-order") {
    handleCompleteOrder(e.target.id);
  }
  if (e.target.id === "overlay") {
    document.querySelector(".overlay").classList.add("not--show");
    document.querySelector("#payment-form").classList.add("not--show");
  }

  if (e.target.closest(".cart--item")) {
    // e.target.closest(".cart--item").remove();
    handleRemoveClick(e.target.closest(".cart--item"));
  }

  if (e.target.id === "btn-pay") {
    const name = document.getElementById("form-name");
    const cardNumber = document.getElementById("card-number");
    const cardCVV = document.getElementById("cvv");

    if ((name.value, cardCVV.value, cardNumber.value)) {
      handlePayment(e.target.id);
    } else {
      alert("Enter you card details!!");
    }
  }
});

function handleAddClick(id) {
  const [targetObj] = menuArray.filter((item) => item.id === +id);
  totalArr.push(targetObj.price);
  const html = ` 
      <li class="cart--item" id="cart-item">
        <span class="cart__item-name">${targetObj.name}<span class='remove' id='remove'>remove</span></span>
        <span class="cart__item-price">$${targetObj.price}</span>
      </li>
              `;
  document.getElementById("cart").classList.remove("hidden");
  document.getElementById("cart-item__container").innerHTML += html;
  document.getElementById("notification").classList.add("not--show");

  handleTotal(totalArr);
}

function handleCompleteOrder(id) {
  document.querySelector(".overlay").classList.remove("not--show");
  document.querySelector("#payment-form").classList.remove("not--show");
}
function handleRemoveClick(item) {
  const itemPrice = +item
    .querySelector(".cart__item-price")
    .textContent.slice(1);
  const fixTotal = totalArr.findIndex((num) => num === itemPrice);
  const removed = totalArr.splice(fixTotal, 1);
  handleTotal(totalArr);
  item.remove();
  if (totalArr.length === 0) {
    document.getElementById("cart").classList.add("hidden");
  }
}

function handlePayment(id) {
  const name = document.getElementById("form-name");
  const cardNumber = document.getElementById("card-number");
  const cardCVV = document.getElementById("cvv");

  if (!name.value && !cardNumber && cardCVV) return;

  console.log(name.value, cardNumber.value, cardCVV.value);
  document.querySelector(".overlay").classList.add("not--show");
  document.querySelector("#payment-form").classList.add("not--show");
  document.getElementById("cart").classList.add("hidden");

  document.getElementById(
    "notification"
  ).textContent = `Thanks, ${name.value}! Your order is on its way!`;
  document.getElementById("notification").classList.remove("not--show");
  name.value = "";
  cardNumber.value = "";
  cardCVV.value = "";
}
// create html element

function createHtml() {
  const html = menuArray
    .map((item) => {
      return `
            <li class="item" id="${item.id}">
              <span class="img">${item.emoji}</span>
              <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-ingredients"> ${item.ingredients}</span>
                <span class="item-price">$${item.price}</span>
              </div>
              <button class="btn-add" data-add=${item.id}>
                <i class="fa-solid fa-plus icon" data-add=${item.id}></i>
              </button>
            </li>
`;
    })
    .join("");

  return html;
}

function render() {
  document.getElementById("product-container").innerHTML = createHtml();
}
render();

function handleTotal(arr) {
  const total = arr.reduce((pre, cur) => pre + cur, 0);
  document.getElementById("total-price").textContent = `$${total}`;
}

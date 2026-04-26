let boxProduct = document.querySelector(".box-product");
let boxCard = document.querySelector(".box-card");
let mainContainer = document.querySelector("main");
let dataOfProducts = [];
let cart = [];

// use fetch Api to Get Data from json file
// The data section
async function fetchProducts() {
  const respons = await fetch("data.json");

  const data = await respons.json();
  dataOfProducts = data;

  render();
}
fetchProducts();

// The Logic Section
//  Add Button Function
function addToCart(product) {
  //  cart.push({...product,qty:1})
  let cartItems = cart.find((item) => {
    return item.name === product.name;
  });
  if (cartItems) {
    cartItems.quant++;
  } else {
    cart.push({ ...product, quant: 1 });
  }
  render();
}

//
function increase(product) {
  let cartItems = cart.find((item) => {
    return item.name === product.name;
  });
  if (cartItems) {
    cartItems.quant++;
  }
  render();
}
// Function to Decrease Product Quantity
function decrement(product) {
  let cartItems = cart.find((item) => {
    return item.name === product.name;
  });
  if (cartItems) {
    cartItems.quant--;
  }
  if (cartItems.quant === 0) {
    cart = cart.filter((item) => {
      return item.name !== product.name;
    });
  }
  render();
}

// A function to calculate the total sum returns `reduce`, which in turn returns the sum of all `quant` values
function numberOfProducts() {
  return cart.reduce((prev, current) => {
    return prev + current.quant;
  }, 0);
  render();
}

// Total Price Function
function totalPrice() {
  return cart.reduce((previous, current) => {
    return previous + current.price * current.quant;
  }, 0);
}

//  Presentation Section **** UI
// Function to create elements on the page
function render() {
  renderProducts();
  rendercart();
}
function renderProducts() {
  boxCard.innerHTML = "";
  dataOfProducts.forEach((element) => {
    // Create a product page for each product
    let card = document.createElement("div");
    card.classList.add("card");
    // Generate an image with dimensions suitable for all screens
    let imgOfcard = document.createElement("picture");
    imgOfcard.classList.add("img-card");
    imgOfcard.innerHTML = `
        <source media="(min-width:1024px )" srcset="${element.image.desktop}">
        <source media="(min-width:768px )" srcset="${element.image.tablet}">
       <img src="${element.image.mobile}" > 
  `;

    // Create the button based on the condition
    //Does the element name match the name of an existing element in the array?
    let cartItems = cart.find((item) => {
      return item.name === element.name;
    });

    if (cartItems) {
      let control = document.createElement("div");
      control.classList.add("control");
      //Create a button to decrease the product quantity

      let minus = document.createElement("button");
      minus.classList.add("minus");
      minus.textContent = "-";
      minus.addEventListener("click", () => {
        decrement(element);
      });
      // Product number
      let quantity = document.createElement("span");
      quantity.textContent = cartItems.quant;
      quantity.classList.add("quantity");
      //Create a button to increase the product quantity
      let plus = document.createElement("button");
      plus.textContent = "+";
      plus.classList.add("plus");
      plus.addEventListener("click", () => {
        increase(element);
      });
      control.append(minus, quantity, plus);
      imgOfcard.append(control);
    } else {
      // If the conditions are not met, we create and display the “Add” button
      let btnAdd = document.createElement("button");
      btnAdd.classList.add("btn-add");
      let iconBtn = document.createElement("img");
      iconBtn.src = "assets/images/icon-add-to-cart.svg";
      btnAdd.appendChild(iconBtn);
      let Text = document.createTextNode("Add to Cart");
      btnAdd.appendChild(Text);
      imgOfcard.appendChild(btnAdd);
      btnAdd.addEventListener("click", () => {
        addToCart(element);
      });
    }
    // Product Information
    let infoCard = document.createElement("div");
    infoCard.classList.add("info");
    let typeOfProducts = document.createElement("p");
    typeOfProducts.innerHTML = element.category;
    typeOfProducts.classList.add("type");
    let nameOfProducts = document.createElement("p");
    nameOfProducts.innerHTML = element.name;
    nameOfProducts.classList.add("name");
    let priceOfProducts = document.createElement("p");
    priceOfProducts.innerHTML = `$${element.price.toFixed(2)}`;
    priceOfProducts.classList.add("price");

    infoCard.appendChild(typeOfProducts);
    infoCard.appendChild(nameOfProducts);
    infoCard.appendChild(priceOfProducts);

    card.appendChild(imgOfcard);
    card.appendChild(infoCard);
    boxCard.appendChild(card);
  });
}
// Basket data
let productBasket = document.querySelector(".product-basket");
function rendercart() {
  productBasket.innerHTML = "";
  let infoBasket = document.createElement("h3");
  infoBasket.classList.add("info-basket");
  if (cart.length === 0) {
    infoBasket.textContent = "Your Cart (0)";
    let imgOfbasket = document.createElement("img");
    imgOfbasket.src = "assets/images/illustration-empty-cart.svg";
    imgOfbasket.alt = "image for empty basket";
    let descrBasket = document.createElement("p");
    descrBasket.classList.add("descr-basket");
    descrBasket.textContent = "Your added items will appear here";
    productBasket.append(infoBasket, imgOfbasket, descrBasket);
    return;
  }
  infoBasket.textContent = `Your Cart (${numberOfProducts()})`;
  productBasket.appendChild(infoBasket);
  // Add products to the cart
  cart.forEach((element) => {
    let product = document.createElement("div");
    product.classList.add("product");

    let titleProduct = document.createElement("h4");
    titleProduct.textContent = element.name;
    titleProduct.classList.add("titel-Product");

    let quantity = document.createElement("span");
    quantity.textContent = `${element.quant}x`;
    quantity.classList.add("quantity");

    let price = document.createElement("span");
    price.textContent = `@ $${element.price.toFixed(2)}`;
    price.classList.add("price-Product");

    let totalPrice = document.createElement("span");
    totalPrice.textContent = `$${(element.price * element.quant).toFixed(2)}`;
    totalPrice.classList.add("total-Price");

    product.append(titleProduct, quantity, price, totalPrice);
    productBasket.appendChild(product);
  });
  // Create the total price field
  let boxTotalPrice = document.createElement("div");
  boxTotalPrice.classList.add("total-price");
  let info = document.createElement("span");
  info.classList.add("info-total");
  info.textContent = "Order Total";
  let total = document.createElement("span");
  total.classList.add("total");
  total.textContent = `$${totalPrice().toFixed(2)}`;
  boxTotalPrice.append(info, total);
  productBasket.appendChild(boxTotalPrice);
  // Create a note regarding the order
  let noteOfOrder = document.createElement("div");
  noteOfOrder.classList.add("note-of-order");
  let imgOfNote = document.createElement("img");
  imgOfNote.src = "assets/images/icon-carbon-neutral.svg";
  imgOfNote.alt = "icon-carbon";
  let textNote = document.createElement("p");
  textNote.classList.add("text-note");
  textNote.innerHTML = `This is a <span>carbon-neutral</span> delivery`;
  noteOfOrder.append(imgOfNote, textNote);
  productBasket.appendChild(noteOfOrder);
  //Create an “Confirm Order” button
  let btnConfirm = document.createElement("button");
  btnConfirm.classList.add("btn-confirma");
  btnConfirm.textContent = "Confirma Oreder";
  btnConfirm.addEventListener("click", () => {
    renderOrder();
    scroll()
  });
  productBasket.appendChild(btnConfirm);
}

function renderOrder() {
  let overlay = document.querySelector(".overlay");
  overlay.classList.remove("none");
  let boxOrderConfirm = document.createElement("div");
  let orderConfirem = document.createElement("div");
  // Create an order confirmation or invoice
  boxOrderConfirm.classList.add("box-order-Confirem");
  orderConfirem.classList.add("order-Confirem");

  let infoOfOrder = document.createElement("div");
  infoOfOrder.classList.add("info-of-order");

  let CheckMark = document.createElement("img");
  CheckMark.classList.add("check-mark");
  CheckMark.src = "assets/images/icon-order-confirmed.svg";
  CheckMark.alt = "checkMrk of order";

  let titel = document.createElement("h2");
  titel.classList.add("title-order");
  titel.textContent = "Order Confirmed";

  let marketingText = document.createElement("p");
  marketingText.classList.add("marketing-text");
  marketingText.textContent = "we hope you  enjoy your food!";
  orderConfirem.appendChild(infoOfOrder);
  infoOfOrder.append(CheckMark, titel, marketingText);
  //Display the requested products after confirmation
  cart.forEach((element) => {
    let productOrder = document.createElement("div");
    productOrder.classList.add("product-Order");

    let imgOfProduct = document.createElement("img");
    imgOfProduct.classList.add("img-of-product");
    imgOfProduct.src = element.image.mobile;
    // ********
    let inofProductOrder = document.createElement("div");
    inofProductOrder.classList.add("inof-product-order");

    let nameOfProductOrder = document.createElement("p");
    nameOfProductOrder.classList.add("name-of-product-order");
    nameOfProductOrder.textContent = element.name;

    let quantityProductOrder = document.createElement("span");
    quantityProductOrder.classList.add("quantity-product-order");
    quantityProductOrder.textContent = `${element.quant}x`;

    let pricProductOrder = document.createElement("span");
    pricProductOrder.classList.add("price-product-order");
    pricProductOrder.textContent = `@ $${element.price.toFixed(2)}`;

    let totalPriceProductOrder = document.createElement("p");
    totalPriceProductOrder.classList.add("total-price-product-order");

    totalPriceProductOrder.textContent = `$${(element.price * element.quant).toFixed(2)}`;
    inofProductOrder.append(
      nameOfProductOrder,
      quantityProductOrder,
      pricProductOrder,
    );
    // ********

    productOrder.append(imgOfProduct, inofProductOrder, totalPriceProductOrder);
    orderConfirem.appendChild(productOrder);
  });

  let orderTotal = document.createElement("div");
  orderTotal.classList.add("order-total");

  let text = document.createElement("span");
  text.textContent = "Order Total";

  let total = document.createElement("span");
  total.classList.add("total");
  total.textContent = `$${totalPrice().toFixed(2)}`;
  orderTotal.append(text, total);

  let newOrderBtn = document.createElement("button");
  newOrderBtn.classList.add("new-order-btn");
  newOrderBtn.textContent = "Start New order";
  newOrderBtn.addEventListener("click", () => {
    overlay.classList.add("none");
    boxOrderConfirm.remove();

    newOrder();
  });

  orderConfirem.append(orderTotal, newOrderBtn);
  boxOrderConfirm.appendChild(orderConfirem);

  mainContainer.appendChild(boxOrderConfirm);
}
//function create new Order
function newOrder() {
  cart = [];

  render();
}

function scroll() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
 

function templateDishes(i, btn) {
    return `
            <div class="clr-backg-lightOrange menu-box p-8 border-r-12">
                <img id="menu${i}"  class="border-r-12 menu-section-img" src="${myDishes[i].img}" alt="Picture of ${myDishes[i].name}">
                <div class="m-left-right menu-description">
                    <h3 class="menu-name font-s-24 m-0 font-w-600" id="menu1">${myDishes[i].name}</h3>
                    <span class=" font-s-16">${myDishes[i].description}</span>
                </div>
                <div class="add-item" id="add-item${i}">
                    <span class="font-s-24 font-w-600">${myDishes[i].price}€</span>
                    <button class="font-s-16 font-w-600 btn p-8" id="add-Basket${i}" onclick="addDish(${i})">${btn}</button>
                </div>
            </div>
    `
}

function templateHero(rating, reviews) {
   return `
            <div class="hero-background-image"></div>
            <div class="hero-burger-icon-position">
                <div class="hero-burger-icon"></div>
            </div>
            <div>
                <div class="hero-title">
                    <h1 class="font-w-700 font-s-48"><span class="clr-orange">Burger</span><span class="clr-black">House</span></h1>
                    <div class="star-rating">
                        <div class="font-w-400 font-palanqin-dark ">
                            <span class="font-s-24">★</span>
                            <span class="font-s-20">${rating}</span>
                        </div>
                        <span class="font-w-400 font-s-18">(${reviews})</span>
                    </div>
                </div>
                <div class="d-flex-center">
                    <span class="font-w-700 font-s-24">The best Burgers, Pizza, and Green, all in one great place</span>
                </div>
            </div>
   ` 
}

function templateSection(i) {
    return `
            <div class="menu-section"  id="menu-section${i}">
                <div class="div-line d-flex-center m-b80">
                    <div class="wrapper div-line-positioning">
                        <img src="${myCategorys[i].icon}" alt="Icon of ${myCategorys[i].name}">
                        <h2 class="clr-white font-s-48 m-0 pb-8">${myCategorys[i].name}</h2>
                    </div>
                </div> 
            </div>
    `
}



function templateBasket(priceMeals, priceTotal, deliveryFee) {
    return `
            <div class="basket-container">
                <h2 class="font-w-700 font-s-32 clr-white">Your Basket</h2>
                <div class="scroll-container" id="basket-items"></div>
                <div class="m-b24"> 
                    <div class="font-w-600 font-s-20 clr-white pb-8 d-flex-space-btw">
                        <span >Subtotal</span>
                        <span id="price-subtotal">${priceMeals}€</span>
                    </div>
                    <div class="font-w-600 font-s-20 clr-white pb-8 d-flex-space-btw">
                        <span>Delivery fee</span>
                        <span>${deliveryFee}€</span>
                    </div>
                    <div class="div-line-black"></div>
                    <div class="font-w-700 font-s-22 clr-white pt-8 d-flex-space-btw">
                        <span>Total</span>
                        <span id="price-total">${priceTotal}€</span>
                    </div>
                </div>
                <button class="font-w-700 font-s-32 btn-buy clr-white clr-backg-orange" id="price-total-btn" onclick="openPopUpDeliverOrder()">Buy now ${priceTotal}€</button>
            </div> 
    `
}

function templateBasketEmpty() {
    return `
            <div class="basket-container">
                <h2 class="font-w-700 font-s-32 clr-lightOrange">Your Basket</h2>
                <div class="font-w-500 font-s-24 clr-lightOrange text-align-c m-b80">
                    <span>Nothing here yet.</span>
                    <br>
                    <span>Go ahead and choose something delicious!</span>
                </div>
                <div class="d-flex-center">
                    <img class="img-shop-card" src="./assets/icons/shopping_cart.png" alt="">
                </div>
            </div>
    `
}


function templateBasketItems(i, priceMeal) {
    return `
                    <div class="clr-backg-white  basket-meal-container" id="${myDishes[i].name}">
                        <div class="d-flex-space-btw">
                            <span class="font-w-700 font-s-22 clr-gray" id="basket-dish-name${i}">${myDishes[i].amount} x ${myDishes[i].name}</span>
                            <button class="btn-white" id="${myDishes[i].name}-trashBtn-top" onclick="deletItemBasket(${i})"></button>
                        </div>
                        <div class="d-flex-space-btw" id="${myDishes[i].name}-overview">
                            <div class="d-flex-center">
                                <button class="font-w-600 font-s-24 btn-white" id="${myDishes[i].name}-trashBtn-bottum" onclick="deletItemBasket(${i})">
                                    <img src="./assets/icons/delete.png">
                                </button>
                                <div class="font-w-600 font-s-24 transformY-4">1</div>
                                <button class="font-w-600 font-s-24 btn-white">+</button>
                            </div>
                            <span class="font-w-700 font-s-22 clr-gray">${priceMeal}€</span>
                        </div>
                    </div>
    `
}

function templateUpdateBasketItem(i, priceMeal) {
    return `
            <div class="d-flex-center">
                <button class="font-w-600 font-s-24 btn-white" id="${myDishes[i].name}-trashBtn-bottum" onclick="deletItemBasket(${i})">
                    <img src="./assets/icons/delete.png">
                </button>
                <div class="font-w-600 font-s-24 transformY-4">${myDishes[i].amount}</div>
                <button class="font-w-600 font-s-24 btn-white">+</button>
            </div>
            <span class="font-w-700 font-s-22 clr-gray">${priceMeal}€</span>
    `
}


function templateDialogOrderDeliver() {
    return `
            <div class="clr-backg-black clr-white dialog-container p-32 border-r-12">
                <div class="dialog-close">
                    <button class="btn-white clr-backg-black clr-white font-s-24" onclick="closeDialog()"> x </button>
                </div>
                <img src="./assets/icons/foodsTruck.png" class="transform-rotate-180">
                <span class="font-w-700 font-s-42">Order confirmed!</span>
                <span class="font-w-700 font-s-29">Youre food is on the way!</span>
            </div>
    `
}

function templateDialogOrderDenied() {
    return `
            <div class="clr-backg-black clr-white dialog-container p-32 border-r-12">
                <div class="dialog-close">
                    <button class="btn-white clr-backg-black clr-white font-s-24" onclick="closeDialog()"> x </button>
                </div>
                <img src="./assets/icons/Logo-Bestell-App.png" class="m-b80">
                <span class="font-w-700 font-s-42 m-b24">The order cannot be added!</span>
                <span class="font-w-700 font-s-29">The maximum quantity is 10 per unit.</span>
                <span class="font-w-700 font-s-29">We apologize for the inconvenience.</span>
            </div>
    `
}

function templateTrashButton() {
    return `
    <img src="./assets/icons/delete.png">
    `
}
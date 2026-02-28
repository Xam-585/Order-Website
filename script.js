let basketBtndefault = "Add to basket"
let basketBtnAdd = "Added"
let basket = false;
let priceDish = 0;
let dishAmount = 0;
let subTotalPrice = 0;
let totalPrice = 0;
const deliveryFee = 4.99;

function loadPage() {
    loadHero();
    loadSections();
    loadDishes();
    checkBasket();
}

/*start load function*/

function loadHero() {
    const hero = document.getElementById('hero-section');
    let rating = testRatingData.score;
    let reviews = testRatingData.reviews;
    hero.innerHTML = templateHero(rating, reviews);
}

function loadSections() {
    let main = document.getElementById('main-content');
    for (let i = 0; i < myCategorys.length; i++) {
        main.innerHTML += templateSection(i);
    }
}

function loadDishes() {
    for (let i = 0; i < myCategorys.length; i++) {
        let section = document.getElementById('menu-section'+ i)
        let temp = "";
        for (const dish in myDishes){
            if (myDishes[dish].category === i) {
                if (myDishes[dish].amount > 0) {
                    let btn = basketBtnAdd + " " + myDishes[dish].amount;
                   temp += templateDishes(dish, btn); 
                }
                else {
                    temp += templateDishes(dish, basketBtndefault);
                }
            } 
        }
        section.innerHTML += temp;
        }
    }

    /*calculation*/

function calculatePrice(amount, price) {
    priceDish = amount * price;
    subTotalPrice = 0;
    totalPrice = 0;
    for (const i in myDishes) {
        subTotalPrice += myDishes[i].amount * myDishes[i].price;
    }
    totalPrice = subTotalPrice + deliveryFee;
}

    /*menu function*/

function addDish(i) {
    if (myDishes[i].amount < 10) {
        myDishes[i].amount = myDishes[i].amount + 1;
        calculatePrice(myDishes[i].amount, myDishes[i].price);
        updateBasketItem(i);
        updateMenuButton(i);
        
    }
    else {
        openPopUpMaxAmount(i);
    }
}

function removeOneDish(i) {
    if (myDishes[i].amount > 1) {
        myDishes[i].amount = myDishes[i].amount - 1;
        calculatePrice(myDishes[i].amount, myDishes[i].price);
        updateBasketItem(i);
        updateMenuButton(i);

    }
    else {
        deletItemBasket(i);
    }
}

function updateMenuButton(i) {
        let dishIdButton = document.getElementById('add-Basket'+ i)
        dishIdButton.innerHTML = basketBtnAdd + " " + myDishes[i].amount;
}

function checkBasket() {
    let tempHtml = "";
    basketStatus();
    if (basket === true) {
        for(const i in myDishes){
            if (myDishes[i].amount  > 0) {
                tempHtml += generateBasketHtml(i);
            }
        }
    }
    if (basket === true) {
        loadBasket(tempHtml);
    }
    else {
        getEmptyBasketTemplate();
    }
}

function getEmptyBasketTemplate() {
    if (matchMedia("(max-width: 950px)")) {
        document.getElementById('dialog-responsive').innerHTML = templateDialogBasketEmpty();
    }
    else {
        document.getElementById('basket').innerHTML = templateBasketEmpty();
    }
}

function generateBasketHtml(i) {
    let temp = "";
    let tempAmount = myDishes[i].amount;
    let tempPrice = myDishes[i].price;
    calculatePrice(tempAmount, tempPrice);
    basket = true;   
    temp += templateBasketItems(i, priceDish.toFixed(2));
    return temp;
}

function loadBasket(tempHtml) {
    if (matchMedia("(max-width: 950px)")) {
        let basketResponsive = document.getElementById('dialog-responsive');
        basketResponsive.innerHTML = templateDialogBasketMenu(subTotalPrice.toFixed(2), totalPrice.toFixed(2) , deliveryFee);
        let basketResponsiveItem = document.getElementById('basket-items');
        basketResponsiveItem.innerHTML = tempHtml;   
    }
    else {
        let basket = document.getElementById('basket');
        basket.innerHTML = templateBasket(subTotalPrice.toFixed(2), totalPrice.toFixed(2) , deliveryFee);
        let basketItem = document.getElementById('basket-items');
        basketItem.innerHTML = tempHtml;   
    }
}

function emptyTheBasket() {
    for (const i in myDishes) {
        myDishes[i].amount = 0;
        menuBtnDefault(i);
    }
    basket = false;
    getEmptyBasketTemplate();
}

function menuBtnDefault(i) {
    let btnMenu = 'add-Basket' + i;
    document.getElementById(btnMenu).innerHTML = basketBtndefault;
}


function updateBasketItem(i) {
    if (basket === true) {
        if (document.getElementById('basket-container' + i) !== null) {
            let basketItemName = document.getElementById('basket-dish-name' + i)
            let basketItem = document.getElementById('name-overview' + i);
            basketItem.innerHTML = templateUpdateBasketItem(i, priceDish.toFixed(2));
            basketItemName.innerHTML = myDishes[i].amount + " x " + myDishes[i].name;
        }
        else {
           let basketItem = document.getElementById('basket-items');
           basketItem.innerHTML += templateBasketItems(i, priceDish.toFixed(2));
        }
        updateBasketItemAssets(i);
        updateBasketValues();
    }
    else {
        checkBasket();
    }
}

function basketStatus() {
    let count = 0;
    for (const n in myDishes) {
        if (myDishes[n].amount > 0) {
            count = count + 1;
        }
    }
    if (count === 0) {
        basket = false;
    }
    else {
        basket = true;
    }
}


function updateBasketItemAssets(i) {
    let trashBtnTop = document.getElementById('trashBtn-top-' + i);
    let trashBtnbot = document.getElementById('trashBtn-bottum-' + i);
    let minusBtn = document.getElementById('minusBtn-' + i);
    if (myDishes[i].amount > 1) {
        trashBtnTop.classList.remove('d-none');
        minusBtn.classList.remove('d-none');
        trashBtnbot.classList.add('d-none');
    }
    else {
        trashBtnTop.classList.add('d-none');
        minusBtn.classList.add('d-none');
        trashBtnbot.classList.remove('d-none');
    }
}

function updateBasketValues() {
        let priceTotalBtn = document.getElementById('price-total-btn');
        let priceTotal = document.getElementById('price-total');
        let priceSubtotal = document.getElementById('price-subtotal');
        priceSubtotal.innerHTML = subTotalPrice.toFixed(2) + "€";
        priceTotalBtn.innerHTML = "Buy now " + totalPrice.toFixed(2) + "€";
        priceTotal.innerHTML = totalPrice.toFixed(2) + "€";
}

function deletItemBasket(i) {
    myDishes[i].amount = 0;
    let basketContainer = document.getElementById('basket-container' + i);
    basketContainer.remove();
    basketStatus();
    if (basket === false) {
        document.getElementById('basket').innerHTML = templateBasketEmpty();
    }
    else {
        checkBasket();
    }
    let btnMenu = 'add-Basket' + i;
    document.getElementById(btnMenu).innerHTML = basketBtndefault;
}


/*Dialog*/

function openPopUpMaxAmount() {
    let dialogRef = document.getElementById('dialog');
    dialogRef.innerHTML = templateDialogOrderDenied();
    openDialog(dialogRef);
}

function openPopUpDeliverOrder() {
    let dialogRef = document.getElementById('dialog');
    dialogRef.innerHTML = templateDialogOrderDeliver();
    openDialog(dialogRef);
    emptyTheBasket();
}

function openBasketResponsive() {
    let dialogRef = document.getElementById('dialog-responsive');

    openDialog(dialogRef);
}

function openDialog(id) { 
    id.showModal();
    id.classList.add('open');
    document.body.classList.add('no-scroll');
}

function closeDialog(id) { 
    const dialogRef = document.getElementById(id);
    dialogRef.close();
    dialogRef.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

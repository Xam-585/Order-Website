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
        let dishIdButton = document.getElementById('add-Basket'+ i)
        myDishes[i].amount = myDishes[i].amount + 1;
        calculatePrice(myDishes[i].amount, myDishes[i].price);
        updateBasketItem(i);
        dishIdButton.innerHTML = basketBtnAdd + " " + myDishes[i].amount;       
    }
    else {
        openPopUpMaxAmount(i);
    }
}

/*basket*/

function checkBasket() {
    let tempHtml = "";
    for(const i in myDishes){
        if (myDishes[i].amount  > 0) {
            let tempName = myDishes[i].name;
            let tempAmount = myDishes[i].amount;
            let tempPrice = myDishes[i].price;
            calculatePrice(tempAmount, tempPrice);
            tempHtml += templateBasketItems(i, priceDish.toFixed(2));
            basket = true;
        }
    }
    if (basket === true) {
        loadBasket(tempHtml);
    }
    else {
        document.getElementById('basket').innerHTML = templateBasketEmpty();
    }
}

function loadBasket(tempHtml) {
    let basket = document.getElementById('basket');
    basket.innerHTML = templateBasket(subTotalPrice.toFixed(2), totalPrice.toFixed(2) , deliveryFee);
    let basketItem = document.getElementById('basket-items');
    basketItem.innerHTML = tempHtml;
}

function emptyTheBasket() {
    for (const i in myDishes) {
        myDishes[i].amount = 0;
        let btnMenu = 'add-Basket' + i;
        document.getElementById(btnMenu).innerHTML = basketBtndefault;

    }
    basket = false;
    document.getElementById('basket').innerHTML = templateBasketEmpty();
}

function basketChangeAmount() {
    
}


function updateBasketItem(i) {
    if (basket === true) {
        if (myDishes[i].amount > 1) {
            let basketItemName = document.getElementById('basket-dish-name' + i)
            let basketItem = document.getElementById(myDishes[i].name + '-overview')
            basketItem.innerHTML = templateUpdateBasketItem(i, priceDish.toFixed(2));
            basketItemName.innerHTML = myDishes[i].amount + " x " + myDishes[i].name;
            updateBasketItemAssets(i);
        }
        else {
           let basketItem = document.getElementById('basket-items');
           basketItem.innerHTML += templateBasketItems(i, priceDish.toFixed(2));
        }
        updateBasketValues();
    }
    else {
        checkBasket();
    }
}

function updateBasketItemAssets(i) {
    let btnTop = document.getElementById(myDishes[i].name + '-trashBtn-top');
    let btnBot = document.getElementById(myDishes[i].name + '-trashBtn-bottum');
    if (myDishes[i].amount > 1) {
        btnTop.innerHTML = templateTrashButton();
        btnBot.innerHTML = "-";
    }
    else {
        btnTop.innerHTML = "";
        btnBot.innerHTML = templateTrashButton();
    }

}

function updateBasketValues() {
        let priceTotalBtn = document.getElementById('price-total-btn');
        let priceTotal = document.getElementById('price-total');
        let priceSubtotal = document.getElementById('price-subtotal');
        priceSubtotal.innerHTML = priceDish.toFixed(2) + "€";
        priceTotalBtn.innerHTML = "Buy now " + totalPrice.toFixed(2) + "€";
        priceTotal.innerHTML = totalPrice.toFixed(2) + "€";
}

function deletItemBasket(id) {
    let deleteItem = document.getElementById(myDishes[id].name);
    deleteItem.innerHTML = "";
}


/*Dialog*/

function openPopUpMaxAmount() {
    dialogRef = document.getElementById('dialog');
    dialogRef.innerHTML = templateDialogOrderDenied();
    openDialog();
}

function openPopUpDeliverOrder() {
    dialogRef = document.getElementById('dialog');
    dialogRef.innerHTML = templateDialogOrderDeliver();
    openDialog();
    emptyTheBasket();
}

function openDialog() { 
    const dialogRef = document.getElementById('dialog');
    dialogRef.showModal();
    dialogRef.classList.add('open');
    document.body.classList.add('no-scroll');
}

function closeDialog() { 
    const dialogRef = document.getElementById('dialog');
    dialogRef.close();
    dialogRef.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

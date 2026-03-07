let basketBtndefault = "Add to basket"
let basketBtnAdd = "Added"
let basket = false;
let priceDish = 0;
let dishAmount = 0;
let subTotalPrice = 0;
let totalPrice = 0;
const deliveryFee = 4.99;
let mobileResposive = false;
let shoppingCard = 0;


/*Eventlistener for window resiz */ 

    window.addEventListener('resize', checkResponsiveChanged)

/*Eventlistener for dialog close with escape*/
    function escListener() {
            document.addEventListener("keydown", function dialogButtonControl(evt) {
            if (document.getElementById('dialog-responsive').classList.contains('open')) {
                if (evt.code == 'Escape') {
                    closeDialog('dialog-responsive');
                }
            }
            if (document.getElementById('dialog').classList.contains('open')) {
                if (evt.code == 'Escape') {
                    closeDialog('dialog');
                }
            }
        });
    }

    /*check Responsive change*/
    function checkResponsiveChanged() {
        let tempbool = mobileResposive;
        checkResponsive();
        if (tempbool !== mobileResposive) {
            emptyBasketResponsiveChange();
            checkBasket();
            for (const i in myDishes){
                if (myDishes[i].amount > 1) {
                    updateBasketItemAssets(i);
                }
            }      
        }
    }

    function emptyBasketResponsiveChange() {
        if (mobileResposive === true && (document.getElementById('basket-container-default') !== null)) {
            document.getElementById('basket-container-default').innerHTML = "";
        }
        if (mobileResposive === false && (document.getElementById('basket-responsive') !== null)) {
            document.getElementById('basket-responsive').innerHTML = "";
            closeDialog('dialog-responsive');
        }
    }

    /*onload function*/
    function loadPage() {
        escListener();
        checkResponsive();
        loadHero();
        loadSections();
        loadDishes();
        checkBasket();
        loadResponsiveControll();
    }

    /*check for responsive*/
    function checkResponsive() {
        if (matchMedia("(max-width: 950px)").matches) {
            mobileResposive = true;
        }
        else {
            mobileResposive = false;
        }
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
    }

    function calculatePriceTotal() {
        subTotalPrice = 0;
        totalPrice = 0;
        for (const i in myDishes) {
            subTotalPrice += myDishes[i].amount * myDishes[i].price;
        }
        totalPrice = subTotalPrice + deliveryFee;
    }

    function calculateOperaterPriceTotal(dishPrice ,arithmetic) {
        const factor = arithmetic === "add" ? 1 : -1; 
        subTotalPrice = subTotalPrice + dishPrice * factor;
        totalPrice  = totalPrice + dishPrice * factor;
    }

    /*menu function*/

    function amountChange(i ,arithmetic) {
        let calc = true;
        if (myDishes[i].amount >= 10 && arithmetic === "add") {
            openPopUpMaxAmount(i);
            calc = false;
        }
        if (myDishes[i].amount === 1 && arithmetic === "remove") {
            deletItemBasket(i);
            calc = false;
        }
        if (calc) {
            myDishes[i].amount += arithmetic === "add" ? +1 : - 1;
            calculatePrice(myDishes[i].amount, myDishes[i].price);
            calculateOperaterPriceTotal(myDishes[i].price , arithmetic);
            updateBasketItem(i);
            updateMenuButton(i);  
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
        if (mobileResposive === true) {
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
    function getBasketItemContainer() {
        return document.getElementById(mobileResposive ? 'basket-items-responsive' : 'basket-items');
    }

    function getBasket() {
        return document.getElementById(mobileResposive ? 'dialog-responsive' : 'basket');
    }

    function loadBasket(tempHtml) {

        let basket = getBasket();
        if (mobileResposive === false) {
            basket.innerHTML = templateBasket(subTotalPrice.toFixed(2), totalPrice.toFixed(2) , deliveryFee);
        }
        else {
            basket.innerHTML = templateDialogBasketMenu(subTotalPrice.toFixed(2), totalPrice.toFixed(2) , deliveryFee, shoppingCard);
        }
        let basketItem = getBasketItemContainer();
        basketItem.innerHTML = tempHtml;   
    }

    function loadResponsiveControll() {
        let docRef = document.getElementById('responsive-control');
        docRef.innerHTML = ResponsiveControlTemplate(shoppingCard);
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
            updateBasketItemDefault(i);
            updateBasketItemAssets(i);
            updateBasketValues();
        }
        else {
            checkBasket();
        }
    }
    function updateBasketItemDefault(i) {
        if ((document.getElementById('basket-container' + i) !== null)) {
            let basketItemName = document.getElementById('basket-dish-name' + i)
            let basketItem = document.getElementById('name-overview' + i);
            basketItem.innerHTML = templateUpdateBasketItem(i, priceDish.toFixed(2));
            basketItemName.innerHTML = myDishes[i].amount + " x " + myDishes[i].name;
        }
        else {
        let basketItem = getBasketItemContainer();
        basketItem.innerHTML += templateBasketItems(i, priceDish.toFixed(2));
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
            let shoppingCardNumber = document.getElementById('shopping-cart-number');
            priceSubtotal.textContent = subTotalPrice.toFixed(2) + "€";
            priceTotalBtn.textContent = "Buy now " + totalPrice.toFixed(2) + "€";
            priceTotal.textContent = totalPrice.toFixed(2) + "€";
            shoppingCardNumber.textContent = shoppingCard;
    }

    function deletItemBasket(i) {
        myDishes[i].amount = 0;
        let basketContainer = document.getElementById('basket-container' + i);
        basketContainer.remove();
        calculatePriceTotal();
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

    function openFunctionNotImplemented() {
        let dialogRef = document.getElementById('dialog');
        dialogRef.innerHTML = templateFunctionNotImplemented();
        openDialog(dialogRef);
    }

    function openPopUpDeliverOrder() {
        if (basket === true) {
            let dialogRef = document.getElementById('dialog');
            dialogRef.innerHTML = templateDialogOrderDeliver();
            openDialog(dialogRef);
            emptyTheBasket();  
        }
        else {
            openBasketResponsive();
        }
    }

    function openBasketResponsive() {
        let dialogRef = document.getElementById('dialog-responsive');
        openDialog(dialogRef);
    }

    function openDialog(id) { 
        id.showModal();
        id.classList.add('open');
        document.body.classList.add('no-scroll');
        if (id === document.getElementById('dialog')) {
        id.classList.add('dialog-background');
            setTimeout(() => {
                closeDialog('dialog');
            }, 5000);
        }
    }

    function closeDialog(id) { 
        const dialogRef = document.getElementById(id);
        dialogRef.close();
        dialogRef.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }


let basketBtndefault = "Add to basket"
let basketBtnAdd = "Added"

function loadPage() {
    loadHero();
    loadSections();
    loadDishes();
}

function loadHero() {
    const hero = document.getElementById('hero-section');
    let rating = testRatingData.score;
    let reviews = testRatingData.reviews;
    hero.innerHTML = templateHero(rating, reviews);
}

function loadSections() {
    let main = document.getElementById('main');
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

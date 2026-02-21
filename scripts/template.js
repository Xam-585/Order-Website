
function templateDishes(i, btn) {
    return `
            <div class="clr-backg-lightOrange menu-box p-8 border-r-12">
                <img id="menu${i}"  class="border-r-12 menu-section-img" src="${myDishes[i].img}" alt="Picture of ${myDishes[i].name}">
                <div class="m-left-right menu-description">
                    <h3 class="menu-name font-s-24 m-0 font-w-600" id="menu1">${myDishes[i].name}</h3>
                    <span class=" font-s-16">${myDishes[i].description}</span>
                </div>
                <div class="add-item">
                    <span class="font-s-24 font-w-600">${myDishes[i].price}€</span>
                    <button class="font-s-16 font-w-600 btn p-8" id="add-Basket1">${btn}</button>
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
            <section class="menu-section"  id="menu-section${i}">
                <div class="div-line d-flex-center m-b80">
                    <div class="wrapper div-line-positioning">
                        <img src="${myCategorys[i].icon}" alt="Icon of ${myCategorys[i].name}">
                        <h2 class="clr-white font-s-48 m-0 pb-8">${myCategorys[i].name}</h2>
                    </div>
                </div> 
            </section>
    `
}
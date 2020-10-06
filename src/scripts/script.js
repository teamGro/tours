// Отрисовка фигуры в footer
let canvasTopElem = document.querySelector('.footer__item-line_top');
let canvasBottomElem = document.querySelector('.footer__item-line_bottom');

if (canvasTopElem.getContext) {
    let ctxTop = canvasTopElem.getContext('2d');
    ctxTop.strokeStyle = "rgb(255, 255, 255)";
    ctxTop.lineWidth = 5;
    ctxTop.beginPath();
    ctxTop.moveTo(0, 0);
    ctxTop.lineTo(54.5, 74);
    ctxTop.lineTo(5000, 74);
    ctxTop.stroke();

    let ctxBottom = canvasBottomElem.getContext('2d');
    ctxBottom.strokeStyle = "rgb(255, 255, 255)";
    ctxBottom.lineWidth = 5;
    ctxBottom.beginPath();
    ctxBottom.moveTo(0, 80);
    ctxBottom.lineTo(54.5, 3);
    ctxBottom.lineTo(5000, 3);
    ctxBottom.stroke();
}

// валидация данных в форме
let userName = document.querySelector("#user-name");
let userWishes = document.querySelector("#user-wishes");

userName.addEventListener("blur", function () {
    onBlurHandle(this, "form__invalid");
});

userName.addEventListener("focus", function () {
    onFocusHandle(this, "form__invalid");
});

userWishes.addEventListener("blur", function () {
    onBlurHandle(this, "form__invalid");
});

userWishes.addEventListener("focus", function () {
    onFocusHandle(this, "form__invalid");
});

// запуск слайдера
new Glide('.glide2', {
    bound: true,
    startAt: 0,
    breakpoints: {
        2000: {
            perView: 2
        },
        1023: {
            perView: 3
        },
        767: {
            perView: 2
        }
    }
}).mount()

new Glide('.glide', {
    bound: true,
    startAt: 0,
    perView: 1
}).mount()


// функции
function onBlurHandle(elem, clName) {
    if (elem.value === "") {
        elem.classList.add(clName);
    }
}

function onFocusHandle(elem, clName) {
    if (elem.classList.contains(clName)) {
        elem.classList.remove(clName);
    }
}
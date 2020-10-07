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

// фильтр по странам
let toursFilterBtns = document.querySelector(".tours__btn-wrap");
let tours = document.querySelector(".offers");
let toursOffers = document.querySelectorAll("[data-country]");
let toursFilters = document.querySelector(".filters");
let toursBtnArrow = document.querySelector(".tours__btn-arrow");

let filterItalyBtn = document.querySelector("#italy");
filterItalyBtn.addEventListener("click", function (e) {
    filterHandler(this, e);
});

let filterIslandBtn = document.querySelector("#island");
filterIslandBtn.addEventListener("click", function (e) {
    filterHandler(this, e);
})

let filterTurkeyBtn = document.querySelector("#turkey");
filterTurkeyBtn.addEventListener("click", function (e) {
    filterHandler(this, e);
});

let filterSpainBtn = document.querySelector("#spain");
filterSpainBtn.addEventListener("click", function (e) {
    filterHandler(this, e);
});

// валидация данных в форме
let dataPatterns = {
    name: /^[а-яa-z0-9_-\S]{3,16}$/i,
    phone: /^((\+?7|8)[ \-]?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/,
    country: /^[а-яa-z0-9_-\S]{5,30}$/i
}
let userName = document.querySelector("#user-name");
userName.value = localStorage.getItem("user-name") || "";
userName.addEventListener("blur", function () {
    onBlurHandle(this, "form__invalid", "name");
});

userName.addEventListener("focus", function () {
    onFocusHandle(this, "form__invalid");
});


let userWishes = document.querySelector("#user-wishes");
userWishes.value = localStorage.getItem("user-country") || "";
userWishes.addEventListener("blur", function () {
    onBlurHandle(this, "form__invalid", "country");
});

userWishes.addEventListener("focus", function () {
    onFocusHandle(this, "form__invalid");
});

let userTel = document.querySelector("#user-tel");
userTel.value = localStorage.getItem("user-tel") || "";
userTel.addEventListener("blur", function () {
    if (this.value.trim() === "") return;
    if (!dataPatterns.phone.test(this.value)) {
        this.classList.add("form__invalid");
        return;
    }
    localStorage.setItem("user-tel", this.value)
});

userTel.addEventListener("focus", function () {
    onFocusHandle(this, "form__invalid");
});

//обработка чекбоксов
let connections = document.querySelector(".form__connection");
connections.addEventListener("click", function (e) {
    let target = e.target;
    if (target.tagName == "SPAN" && target.classList.contains("chk__input")) {
        target.classList.toggle("chk__input_active");
    }
    if (target.tagName === "LABEL" && target.classList.contains("chk__label")) {
        target.parentNode.querySelector(".chk__input").
            classList.toggle("chk__input_active");
    }
});

let contacts = document.querySelector(".form__contact");
contacts.addEventListener("click", function (e) {
    let target = e.target;
    if (target.tagName == "SPAN" && target.classList.contains("chk__input")) {
        target.classList.toggle("chk__input_active");
    }
    if (target.tagName === "LABEL" && target.classList.contains("chk__label")) {
        target.parentNode.querySelector(".chk__input").
            classList.toggle("chk__input_active");
    }
});

let agreementsSubscibe = document.querySelector(".agreements__input_subscribe");
agreementsSubscibe.addEventListener("click", function () {
    this.classList.toggle("agreements__input_active");
});

let agreementsHandle = document.querySelector(".agreements__input_handle");
let popupContainer = document.querySelector("#templ").content.querySelector(".popup");
let overlay = document.querySelector(".overlay");
agreementsHandle.addEventListener("click", function () {
    this.classList.toggle("agreements__input_active");
    if (this.classList.contains("agreements__input_active")) {
        document.body.style.overflow = "hidden";
        overlay.classList.add("overlay_active");
        overlay.style.top = window.pageYOffset + "px";

        let popup;
        if (!overlay.children.length) {
            popup = popupContainer.cloneNode(true);
            overlay.append(popup);
        }

        let agreeBtn = overlay.querySelector(".popup__btn_agree");
        agreeBtn.addEventListener("click", () => {
            document.body.style.overflow = "";
            overlay.classList.remove("overlay_active");
            return;
        });

        let disagreeBtn = overlay.querySelector(".popup__btn_disagree");
        disagreeBtn.addEventListener("click", () => {
            document.body.style.overflow = "";
            this.classList.remove("agreements__input_active");
            overlay.classList.remove("overlay_active");
            return;
        });

        let closeBtn = overlay.querySelector(".popup__close");
        closeBtn.addEventListener("click", () => {
            document.body.style.overflow = "";
            this.classList.remove("agreements__input_active");
            overlay.classList.remove("overlay_active");
            return;
        });
    }

});

//отправка формы
let btnSend = document.querySelector(".btn-send");
btnSend.addEventListener("click", function (e) {
    e.preventDefault();
    let count = 0;
    if (!agreementsHandle.classList.contains("agreements__input_active")) {
        count++;
        agreementsHandle.classList.add("agreements__input_handle-invalid");
    }
    if (userWishes.value.trim() === "") {
        count++;
        userWishes.classList.add("form__invalid");
    }
    if (userName.value.trim() === "") {
        count++;
        userName.classList.add("form__invalid")
    }

    if (count != 0) return;
})

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
    // bound: true,
    // startAt: 0,
    // perView: 1
}).mount()


// функции
function filterHandler(elem, ev) {
    let target = ev.target.id;

    if (elem.classList.contains("tours__btn_active")) {
        elem.classList.remove("tours__btn_active");
        let activeFilters = elem.parentNode.querySelector(".tours__btn_active");
        if (activeFilters != null) {
            Array.from(toursFilters.querySelectorAll(`[data-country=${target}]`)).forEach(elem => {
                elem.parentNode.removeChild(elem);
            });
            return;
        }
        tours.style.display = "flex";
        toursBtnArrow.style.display = "block";
        while (toursFilters.firstChild) {
            toursFilters.removeChild(toursFilters.firstChild);
        }

        return;
    }

    let fragment = document.createDocumentFragment();
    Array.from(toursOffers).forEach(elem => {
        if (elem.getAttribute("data-country") == target) {
            let node = elem.cloneNode(true)
            fragment.append(node);

        }
    });
    toursFilters.append(fragment);
    toursFilters.style.display = "flex";
    tours.style.display = "none";
    toursBtnArrow.style.display = "none";
    elem.classList.add("tours__btn_active");

}

function onBlurHandle(elem, clName, field) {
    if (!dataPatterns[field].test(elem.value)) {
        elem.classList.add(clName);
        return;
    }
    localStorage.setItem(`user-${field}`, elem.value)
}

function onFocusHandle(elem, clName) {
    if (elem.classList.contains(clName)) {
        elem.classList.remove(clName);
    }
}
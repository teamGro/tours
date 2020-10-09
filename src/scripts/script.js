//меню
const menuBtn = document.querySelector(".menu-btn");
const menuContainer = document.querySelector(".menu");

menuBtn.addEventListener("click", function () {
  this.classList.toggle("menu-btn_open");

  if (this.classList.contains("menu-btn_open")) {
    this.classList.remove("menu-btn_close");
  } else {
    this.classList.add("menu-btn_close");
  }

  menuContainer.classList.toggle("menu_open");
})

// обработчик для стран
const countriesField = document.querySelector(".search__field_country");
const countriesFieldName = document.querySelector(".search__title_country");

countriesField.addEventListener("click", function (e) {
  let target = e.target;

  if (target.closest(".search__field-wrap")) {
    if (this.querySelector(".menu__list") == null) {
      let list = renderCountriesList(countries, { main: "menu__list countries menu__list_disactive", sub: "countries__places countries__places_disactive" }, { main: "menu__item", sub: "places", allTours: "places_all" });
      this.append(list);

      this.querySelector(".search__more").classList.add("search__more_open");
      this.querySelector(".menu__list").classList.toggle("menu__list_disactive");

      return;
    }

    this.querySelector(".menu__list").classList.toggle("menu__list_disactive");
    this.querySelector(".search__more").classList.toggle("search__more_open");

    return;
  }

  if (target.closest(".places")) {
    countriesFieldName.textContent = target.textContent;
    this.querySelector(".countries__places").classList.toggle("countries__places_disactive");
    this.querySelector(".search__more").classList.toggle("search__more_open");
    this.querySelector(".menu__list").classList.toggle("menu__list_disactive");
  }

  target.querySelector(".countries__places").classList.toggle("countries__places_disactive");
});

//Обработчик для календаря
let months = {
  0: "Январь",
  1: "Февраль",
  2: "Март",
  3: "Апрель",
  4: "Май",
  5: "Июнь",
  6: "Июль",
  7: "Август",
  8: "Сентябрь",
  9: "Октябрь",
  10: "Ноябрь",
  11: "Декабрь",
}
const dateField = document.querySelector(".search__field_dates");
let date = new Date();

let month = date.getMonth();
let currentMonth = month;

let year = date.getFullYear();
let currentYear = year;

let monthYearField = dateField.querySelector(".calendar__month");
monthYearField.textContent = `${months[currentMonth]} ${currentYear}`;

let userDates = [];

const btnNextMonth = dateField.querySelector(".calendar__btn_next");
btnNextMonth.addEventListener("click", function () {
  const calendarTable = dateField.querySelector(".calendar__table");
  const calendarContainer = dateField.querySelector(".calendar__container");

  currentMonth++;
  if (currentMonth == 12) {
    currentMonth = 0;
    currentYear++;
  }

  calendarTable.remove();
  createCalendar(calendarContainer, currentYear, currentMonth);
  monthYearField.textContent = `${months[currentMonth]} ${currentYear}`;
})

const btnPrevMonth = dateField.querySelector(".calendar__btn_prev");
btnPrevMonth.addEventListener("click", function () {
  let calendarTable = dateField.querySelector(".calendar__table");
  let calendarContainer = dateField.querySelector(".calendar__container");

  currentMonth--;
  if (currentMonth == -1) {
    currentMonth = 11;
    currentYear--;
  }

  calendarTable.remove();
  createCalendar(calendarContainer, currentYear, currentMonth);
  monthYearField.textContent = `${months[currentMonth]} ${currentYear}`;
})

dateField.addEventListener("click", function (e) {
  let target = e.target;

  if (target.closest(".search__field-wrap") && target.tagName != "TD") {
    if (this.querySelector(".calendar__table") == null) {


      let calendarContainer = this.querySelector(".calendar__container");
      createCalendar(calendarContainer, year, month);

      this.querySelector(".search__more").classList.add("search__more_open");
      this.querySelector(".calendar").classList.toggle("calendar_disactive");

      return;
    }

    this.querySelector(".calendar").classList.toggle("calendar_disactive");
    this.querySelector(".search__more").classList.toggle("search__more_open");
  }
});

let calendarContainer = dateField.querySelector(".calendar__container");
calendarContainer.addEventListener("click", (e) => {

  let target = e.target;
  if (target.tagName == 'TH') return;

  target.className = "calendar__set-day";
  let userDay = target.textContent

  if (+userDay < 10) userDay = `0${userDay}`;

  let localCurrentMoth = currentMonth + 1;
  if (localCurrentMoth < 10) localCurrentMoth = `0${localCurrentMoth}`;

  userDates.push(`${userDay}.${localCurrentMoth}.${currentYear}`);

  if (userDates.length == 2) {
    dateField.querySelector(".calendar").classList.toggle("calendar_disactive");
    dateField.querySelector(".search__more").classList.toggle("search__more_open");

    if (userDates[1] > userDates[0]) {
      dateField.querySelector(".search__title_dates").textContent = `${userDates[0]} - ${userDates[1]}`;
    } else {
      dateField.querySelector(".search__title_dates").textContent = `${userDates[1]} - ${userDates[0]}`;
    }

    Array.from(dateField.querySelectorAll(".calendar__set-day")).forEach(elem => {
      elem.classList.remove("calendar__set-day");
    });

    userDates = [];
  }
})

// Обработчик для типа путешествия
const tripField = document.querySelector(".search__field_type");
const tripFieldName = document.querySelector(".search__title_type");
tripField.addEventListener("click", function (e) {
  let target = e.target;

  if (target.closest(".search__field-wrap")) {

    if (this.querySelector(".menu__list") == null) {
      let list = renderTripTypes(tripTypes, "menu__list trips", "menu__item trip__item");
      this.append(list);
      this.querySelector(".search__more").classList.add("search__more_open");

      return;
    }

    this.querySelector(".menu__list").classList.toggle("menu__list_disactive");
    this.querySelector(".search__more").classList.toggle("search__more_open");
    return;
  }

  if (target.closest(".trip__item")) {
    this.querySelector(".menu__list").classList.toggle("menu__list_disactive");
    this.querySelector(".search__more").classList.toggle("search__more_open");
    tripFieldName.textContent = target.textContent;
  }
})


// фильтр по странам
const toursFilterBtns = document.querySelector(".tours__btn-wrap");
const tours = document.querySelector(".offers");
const toursOffers = document.querySelectorAll("[data-country]");
const toursFilters = document.querySelector(".filters");
const toursBtnArrow = document.querySelector(".tours__btn-arrow");

const filterItalyBtn = document.querySelector("#italy");
filterItalyBtn.addEventListener("click", function (e) {
  filterHandler(this, e);
});

const filterIslandBtn = document.querySelector("#island");
filterIslandBtn.addEventListener("click", function (e) {
  filterHandler(this, e);
})

const filterTurkeyBtn = document.querySelector("#turkey");
filterTurkeyBtn.addEventListener("click", function (e) {
  filterHandler(this, e);
});

const filterSpainBtn = document.querySelector("#spain");
filterSpainBtn.addEventListener("click", function (e) {
  filterHandler(this, e);
});

//Позиционирование кнопки для слайдера в блоке "Горячие туры"
const heightHotContainer = document.querySelector(".offers__item");
const btnNextSlideHot = document.querySelector(".tours__btn-arrow_hot");
btnNextSlideHot.style.top = heightHotContainer.offsetHeight - btnNextSlideHot.offsetHeight / 2 + "px";

//Позиционирование кнопки для слайдера в блоке "Популярные туры"
const imgHeightPop = document.querySelector(".popular__img");
const btnNextSlidePop = document.querySelector(".tours__btn-arrow_pop");
btnNextSlidePop.style.top = imgHeightPop.offsetHeight / 2 - btnNextSlidePop.offsetHeight / 2 + "px";

// валидация данных в форме
let dataPatterns = {
  name: /^[а-яa-z0-9_-\S]{3,16}$/i,
  phone: /^((\+?7|8)[ \-]?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/,
  country: /^[а-яa-z0-9_-\S]{5,30}$/i
}

const userName = document.querySelector("#user-name");
userName.value = localStorage.getItem("user-name") || "";
userName.addEventListener("blur", function () {
  onBlurHandle(this, "form__invalid", "name");
});

userName.addEventListener("focus", function () {
  onFocusHandle(this, "form__invalid");
});


const userWishes = document.querySelector("#user-wishes");
userWishes.value = localStorage.getItem("user-country") || "";
userWishes.addEventListener("blur", function () {
  onBlurHandle(this, "form__invalid", "country");
});

userWishes.addEventListener("focus", function () {
  onFocusHandle(this, "form__invalid");
});

const userTel = document.querySelector("#user-tel");
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
const templ = document.querySelector("#templ");
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

const contacts = document.querySelector(".form__contact");
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

const agreementsSubscibe = document.querySelector(".agreements__input_subscribe");
agreementsSubscibe.addEventListener("click", function () {
  this.classList.toggle("agreements__input_active");
});

const agreementsHandle = document.querySelector(".agreements__input_handle");
const popupContainer = templ.content.querySelector(".popup");
const overlay = document.querySelector(".overlay");
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

    let closeBtn = overlay.querySelector(".popup__close-btn");
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
new Glide('.glide', {}).mount();

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
}).mount();


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

// Данные и функции для меню
let countries = {
  "Южная Америка": [{ name: "Аргентина", link: "#" }, { name: "Бразилия", link: "#" }, { name: "Перу", link: "#" }, { name: "Уругвай", link: "#" }, { name: "все туры на континенте", link: "#" }],
  "Арктика и Антарктика": [{ name: "Арктика", link: "#" }, { name: "Антарктика", link: "#" }, { name: "все туры на континенте", link: "#" }],
  "Северная Америка": [{ name: "США", link: "#" }, { name: "Мексика", link: "#" }, { name: "Канада", link: "#" }, { name: "все туры на континенте", link: "#" }],
  "Африка": [{ name: "Египет", link: "#" }, { name: "Нигерия", link: "#" }, { name: "все туры на континенте", link: "#" }],
  "Австралия и Океания": [{ name: "Австралия", link: "#" }, { name: "Океания", link: "#" }, { name: "все туры на континенте", link: "#" }],
  "Европа": [{ name: "Франция", link: "#" }, { name: "Германия", link: "#" }, { name: "Италия", link: "#" }, { name: "все туры на континенте", link: "#" }],
  "Россия": [{ name: "Москва", link: "#" }, { name: "Санкт-Петербург", link: "#" }, { name: "все туры на континенте", link: "#" }],
  "Азия": [{ name: "Китай", link: "#" }, { name: "Япония", link: "#" }, { name: "все туры на континенте", link: "#" }]
}

function renderCountriesList(countries, parentClNames, childClNames) {
  let parent = document.createElement("ul");
  parent.className = parentClNames.main;

  let fragment = new DocumentFragment();

  for (let key in countries) {
    let item = document.createElement("li");
    item.className = childClNames.main;
    item.textContent = key;

    let localFragment = new DocumentFragment();

    let localList = document.createElement("ul");
    localList.className = parentClNames.sub;
    countries[key].forEach((elem, i) => {
      let localitem = document.createElement("li");

      let link = document.createElement("a");
      link.textContent = elem.name;
      link.href = elem.link
      if (i == countries[key].length - 1) {
        localitem.className = childClNames.allTours;
      } else {
        localitem.className = childClNames.sub;
      }

      localitem.append(link);
      localFragment.append(localitem);
    })

    localList.append(localFragment);
    item.append(localList);
    fragment.append(item)
  }

  parent.append(fragment);

  return parent;
}

function createCalendar(elem, year, month) {
  let d = new Date(year, month);
  let table = '<table class="calendar__table"><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr><tr>';

  for (let i = 0; i < getDay(d); i++) {
    table += '<td></td>';
  }

  while (d.getMonth() == month) {
    table += `<td>${d.getDate()}</td>`;

    if (getDay(d) % 7 == 6) {
      table += '</tr><tr>';
    }

    d.setDate(d.getDate() + 1);
  }

  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += '<td></td>';
    }
  }

  table += '</tr></table>';

  elem.innerHTML = table;
}

function getDay(date) {
  let day = date.getDay();
  if (day == 0) day = 7;
  return day - 1;
}

let tripTypes = ["Активный", "Майские", "На авто", "На корабле", "Новый год", "Поход", "Серфинг", "Эксклюзив", "Экскурсионный", "Экспедиция"];
function renderTripTypes(arr, parentClName, clName) {
  let parent = document.createElement("ul");
  parent.className = parentClName;

  let fragment = new DocumentFragment();

  arr.forEach((elem) => {
    let item = document.createElement("li");
    let text = document.createElement("span");
    text.textContent = elem;
    item.className = clName;
    item.append(text);
    fragment.append(item);
  });

  parent.append(fragment);

  return parent;
}










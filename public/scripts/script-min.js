let menuBtn=document.querySelector(".menu-btn"),menuContainer=document.querySelector(".menu");menuBtn.addEventListener("click",function(){this.classList.toggle("menu-btn_open"),this.classList.contains("menu-btn_open")?this.classList.remove("menu-btn_close"):this.classList.add("menu-btn_close"),menuContainer.classList.toggle("menu_open")});let templ=document.querySelector("#templ"),countriesField=document.querySelector(".search__field_country"),countryTemplate=templ.content.querySelector("#countries");countriesField.addEventListener("click",function(e){let t=e.target;if(console.log(t),t.closest(".search__field-wrap")){if(null==this.querySelector(".menu__list")){let e=renderCountriesList(countries,{main:"menu__list countries menu__list_disactive",sub:"countries__places countries__places_disactive"},{main:"countries__item",sub:"places"});return this.append(e),this.querySelector(".search__more").classList.add("search__more_open"),void this.querySelector(".menu__list").classList.toggle("menu__list_disactive")}return this.querySelector(".menu__list").classList.toggle("menu__list_disactive"),void this.querySelector(".search__more").classList.toggle("search__more_open")}t.querySelector(".countries__places").classList.toggle("countries__places_disactive")});let toursFilterBtns=document.querySelector(".tours__btn-wrap"),tours=document.querySelector(".offers"),toursOffers=document.querySelectorAll("[data-country]"),toursFilters=document.querySelector(".filters"),toursBtnArrow=document.querySelector(".tours__btn-arrow"),filterItalyBtn=document.querySelector("#italy");filterItalyBtn.addEventListener("click",function(e){filterHandler(this,e)});let filterIslandBtn=document.querySelector("#island");filterIslandBtn.addEventListener("click",function(e){filterHandler(this,e)});let filterTurkeyBtn=document.querySelector("#turkey");filterTurkeyBtn.addEventListener("click",function(e){filterHandler(this,e)});let filterSpainBtn=document.querySelector("#spain");filterSpainBtn.addEventListener("click",function(e){filterHandler(this,e)});let heightHotContainer=document.querySelector(".offers__item"),btnNextSlideHot=document.querySelector(".tours__btn-arrow_hot");btnNextSlideHot.style.top=heightHotContainer.offsetHeight-btnNextSlideHot.offsetHeight/2+"px";let imgHeightPop=document.querySelector(".popular__img"),btnNextSlidePop=document.querySelector(".tours__btn-arrow_pop");btnNextSlidePop.style.top=imgHeightPop.offsetHeight/2-btnNextSlidePop.offsetHeight/2+"px";let dataPatterns={name:/^[а-яa-z0-9_-\S]{3,16}$/i,phone:/^((\+?7|8)[ \-]?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/,country:/^[а-яa-z0-9_-\S]{5,30}$/i},userName=document.querySelector("#user-name");userName.value=localStorage.getItem("user-name")||"",userName.addEventListener("blur",function(){onBlurHandle(this,"form__invalid","name")}),userName.addEventListener("focus",function(){onFocusHandle(this,"form__invalid")});let userWishes=document.querySelector("#user-wishes");userWishes.value=localStorage.getItem("user-country")||"",userWishes.addEventListener("blur",function(){onBlurHandle(this,"form__invalid","country")}),userWishes.addEventListener("focus",function(){onFocusHandle(this,"form__invalid")});let userTel=document.querySelector("#user-tel");userTel.value=localStorage.getItem("user-tel")||"",userTel.addEventListener("blur",function(){""!==this.value.trim()&&(dataPatterns.phone.test(this.value)?localStorage.setItem("user-tel",this.value):this.classList.add("form__invalid"))}),userTel.addEventListener("focus",function(){onFocusHandle(this,"form__invalid")});let connections=document.querySelector(".form__connection");connections.addEventListener("click",function(e){let t=e.target;"SPAN"==t.tagName&&t.classList.contains("chk__input")&&t.classList.toggle("chk__input_active"),"LABEL"===t.tagName&&t.classList.contains("chk__label")&&t.parentNode.querySelector(".chk__input").classList.toggle("chk__input_active")});let contacts=document.querySelector(".form__contact");contacts.addEventListener("click",function(e){let t=e.target;"SPAN"==t.tagName&&t.classList.contains("chk__input")&&t.classList.toggle("chk__input_active"),"LABEL"===t.tagName&&t.classList.contains("chk__label")&&t.parentNode.querySelector(".chk__input").classList.toggle("chk__input_active")});let agreementsSubscibe=document.querySelector(".agreements__input_subscribe");agreementsSubscibe.addEventListener("click",function(){this.classList.toggle("agreements__input_active")});let agreementsHandle=document.querySelector(".agreements__input_handle"),popupContainer=templ.content.querySelector(".popup"),overlay=document.querySelector(".overlay");agreementsHandle.addEventListener("click",function(){if(this.classList.toggle("agreements__input_active"),this.classList.contains("agreements__input_active")){let e;document.body.style.overflow="hidden",overlay.classList.add("overlay_active"),overlay.style.top=window.pageYOffset+"px",overlay.children.length||(e=popupContainer.cloneNode(!0),overlay.append(e)),overlay.querySelector(".popup__btn_agree").addEventListener("click",()=>{document.body.style.overflow="",overlay.classList.remove("overlay_active")}),overlay.querySelector(".popup__btn_disagree").addEventListener("click",()=>{document.body.style.overflow="",this.classList.remove("agreements__input_active"),overlay.classList.remove("overlay_active")}),overlay.querySelector(".popup__close-btn").addEventListener("click",()=>{document.body.style.overflow="",this.classList.remove("agreements__input_active"),overlay.classList.remove("overlay_active")})}});let btnSend=document.querySelector(".btn-send");btnSend.addEventListener("click",function(e){e.preventDefault();agreementsHandle.classList.contains("agreements__input_active")||(0,agreementsHandle.classList.add("agreements__input_handle-invalid")),""===userWishes.value.trim()&&(0,userWishes.classList.add("form__invalid")),""===userName.value.trim()&&(0,userName.classList.add("form__invalid"))}),new Glide(".glide2",{bound:!0,startAt:0,breakpoints:{2000:{perView:2},1023:{perView:3},767:{perView:2}}}).mount(),new Glide(".glide",{}).mount();let canvasTopElem=document.querySelector(".footer__item-line_top"),canvasBottomElem=document.querySelector(".footer__item-line_bottom");if(canvasTopElem.getContext){let e=canvasTopElem.getContext("2d");e.strokeStyle="rgb(255, 255, 255)",e.lineWidth=5,e.beginPath(),e.moveTo(0,0),e.lineTo(54.5,74),e.lineTo(5e3,74),e.stroke();let t=canvasBottomElem.getContext("2d");t.strokeStyle="rgb(255, 255, 255)",t.lineWidth=5,t.beginPath(),t.moveTo(0,80),t.lineTo(54.5,3),t.lineTo(5e3,3),t.stroke()}function filterHandler(e,t){let n=t.target.id;if(e.classList.contains("tours__btn_active")){if(e.classList.remove("tours__btn_active"),null!=e.parentNode.querySelector(".tours__btn_active"))return void Array.from(toursFilters.querySelectorAll(`[data-country=${n}]`)).forEach(e=>{e.parentNode.removeChild(e)});for(tours.style.display="flex",toursBtnArrow.style.display="block";toursFilters.firstChild;)toursFilters.removeChild(toursFilters.firstChild);return}let s=document.createDocumentFragment();Array.from(toursOffers).forEach(e=>{if(e.getAttribute("data-country")==n){let t=e.cloneNode(!0);s.append(t)}}),toursFilters.append(s),toursFilters.style.display="flex",tours.style.display="none",toursBtnArrow.style.display="none",e.classList.add("tours__btn_active")}function onBlurHandle(e,t,n){dataPatterns[n].test(e.value)?localStorage.setItem(`user-${n}`,e.value):e.classList.add(t)}function onFocusHandle(e,t){e.classList.contains(t)&&e.classList.remove(t)}let countries={"Южная Америка":["Аргентина","Бразилия","Перу","Уругвай","Чили","Эквадор"],"Арктика и Антарктика":["Арктика","Антарктика"],"Северная Америка":["США","Мексика","Канада"],"Африка":["Египет","Нигерия"],"Австралия и Океания":["Австралия","Океания"],"Европа":["Франция","Германия","Италия"],"Россия":["Москва","Санкт-Петербург"],"Азия":["Китай","Япония"]};function renderCountriesList(e,t,n){let s=document.createElement("ul");s.className=t.main;let r=new DocumentFragment;for(let s in e){let o=document.createElement("li");o.className=n.main,o.textContent=s;let l=document.createElement("ul"),i=new DocumentFragment;l.className=t.sub,e[s].forEach(e=>{let t=document.createElement("li");t.className=n.sub,t.textContent=e,i.append(t)}),l.append(i),o.append(l),r.append(o)}return s.append(r),s}
var canvasTopElem = document.querySelector('.footer__item-line_top');
var canvasBottomElem = document.querySelector('.footer__item-line_bottom');

if (canvasTopElem.getContext) {
    let ctxTop = canvasTopElem.getContext('2d');
    ctxTop.strokeStyle = "rgb(255, 255, 255)";
    ctxTop.lineWidth = 5;
    ctxTop.beginPath();
    ctxTop.moveTo(0, 0);
    ctxTop.lineTo(54.5, 74);
    ctxTop.lineTo(768, 74);
    ctxTop.stroke();

    let ctxBottom = canvasBottomElem.getContext('2d');
    ctxBottom.strokeStyle = "rgb(255, 255, 255)";
    ctxBottom.lineWidth = 5;
    ctxBottom.beginPath();
    ctxBottom.moveTo(0, 80);
    ctxBottom.lineTo(54.5, 3);
    ctxBottom.lineTo(768, 3);
    ctxBottom.stroke();

} else {

}
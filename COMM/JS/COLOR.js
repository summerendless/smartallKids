const colorOption = Array.from(document.getElementsByClassName("color-option")); /** 자바스크립트에서 배열로 바꾸어 html 클래스를 부른다. */
const color = document.getElementById("color") /** querySelector("#color")와 동일하다. */
const lineWidth = document.querySelector("#line-width") /** html에서 선굵기 조절할 input id 값을 lineWidth에 지정 */
const canvas = document.querySelector(".canvas1"); /** canvas라는 변수는 html의 canvas라는 엘리먼트를 지정한다 */
const canvasImg = document.querySelector(".canvas2"); /** canvas라는 변수는 html의 canvas라는 엘리먼트를 지정한다 */

const ctx = canvas.getContext("2d"); /** 2d로 그릴 것을지정 ctx는 canvas에 그림 그릴 때 쓰는 것  */
const ctxImg = canvasImg.getContext("2d"); /** 2d로 그릴 것을지정 ctx는 canvas에 그림 그릴 때 쓰는 것  */
canvas.width = 400;
canvas.height = 900;
ctx.lineWidth = lineWidth.value; /** 기본 선 굵기 값 설정 */
let isPainting = false; /** isPainting을 true로 변경될 수 있도록 let으로 설정한다. */

const image = new Image();
image.src = '../../COMM/IMG/WORD/1_1/WORD_1_1_1.PNG';
image.onload = () => {
  ctxImg.drawImage(image, 4, 4)
}
// drawImage()
ctx.globalCompositeOperation = "source-atop";

function onMove(event){
  if(isPainting){ /** isPainting이 true면 */
    ctx.lineTo(event.offsetX, event.offsetY); /** 마우스의 현재 위치에 선을 그린다. */
    ctx.stroke(); /** 그린 선을 나타낸다. */
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY); /** isPainting이 false면 마우스 따라 이동만 한다. */
}

function startPainting(){ /** 그림을 그리는 함수. isPainting이 true면 어떤 행동을 할지는 onMove 함수의 if문에 구현. */
  isPainting = true;
}

function canclePainting(){ /** 그림을 그리지 않는 함수. */
  isPainting = false;
  ctx.beginPath(); /** 마우스를 누르지 않았을 때 그려진 선의 path 분리. 
  새로 그려진 선과 같은 path값을 갖지 않아야 선 굵기를 조절할 때마다 각자 다른 굵기를 가질 수 있다. */
}

function onlineChangeWidth(event){ /** 변경된 선 굵기 값을 적용받게 하는 함수 */
  ctx.lineWidth = event.target.value;
}
function oncolorChange(event){
  $(this).addClass('active');
  $(this).siblings().removeClass('active');
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue; /** 선 색상변경 */
  ctx.fillStyle = colorValue;
  color.value = colorValue; /** 변경된 색상 표시 */
}

canvas.addEventListener("mousemove", onMove); 
canvas.addEventListener("mousedown", startPainting); /** 마우스 오른쪽 버튼이 눌리는 이벤트와 실행될 함수명 */
canvas.addEventListener("mouseup", canclePainting); /** 마우스 오른쪽 버튼이 눌리지 않았을 때 이벤트와 실행될 함수명 */
canvas.addEventListener("mouseleave", canclePainting); /** 버그해결 마우스가 캔버스를 벗어났을 때 이벤트와 실행될 함수명 */

lineWidth.addEventListener("change", onlineChangeWidth);

color.addEventListener("change", oncolorChange); /** 색상변경 함수명 */
colorOption.forEach((color) => color.addEventListener("click", oncolorChange));
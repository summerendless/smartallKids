var savekey = "ctxtImage",
    color = "rgb(255,0,0)",
    width = 500,
    height = 400,
    paint = false,
    points = [],
    canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext("2d");

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stop);


document.getElementById("btnSave").onclick = function () {
    var idt = ctx.getImageData(0, 0, width, height);
    localStorage.setItem(savekey, JSON.stringify(idt));
}

document.getElementById("btnLoad").onclick = function () {
    var idt = localStorage.getItem(savekey) || null;
    if (idt !== null) {
        var data = JSON.parse(idt);
        ctx.putImageData(idt, 0, 0);
    }
}

function change(e) {
    color = this.value;
}

function change_width(e) {
    color = this.value;
}

document.getElementById("color").onchange = change;

function start(e) {
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;
    paint = true;
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    points[points.length] = [mouseX, mouseY];
};

function draw(e) {

    if (paint) {
        var mouseX = e.pageX - canvas.offsetLeft;
        var mouseY = e.pageY - canvas.offsetTop;
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.lineWidth = 5;
        points[points.length] = [mouseX, mouseY];
    }
}

function stop(e) {
    paint = false;
}

function thicknessChange() { }

/////////////////////////

localStorage.setItem(canvasName, canvas.toDataURL());
var dataURL = localStorage.getItem(canvasName);
var img = new Image;
img.src = dataURL;
img.onload = function () {
    ctx.drawImage(img, 0, 0);
};
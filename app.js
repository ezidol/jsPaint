const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("colors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const CANVAS_SIZE = 700;
const INITIAL_COLOR = "black";
const saveBtn = document.getElementById("jsSave");
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = "2.5";


let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x ,y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke()
    }
}

function handleColorClick(event) {
    color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeSize(event) {
    size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === false) {
        filling = true;
        mode.innerText = "Paint";

    } else {
        filling = false;
        mode.innerText = "Fill";
    }
}

function handleCanvasClick() {
    if (filling === true){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
}

function handleCM(event) {
    event.preventDefault();
}

function saveImage() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "picture";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    // canvas.addEventListener("mouseleave", onMouseLeave);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

range.addEventListener("input", handleRangeSize);
mode.addEventListener("click", handleModeClick);
saveBtn.addEventListener("click", saveImage);
var canvas = document.getElementById("chrisCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = document.getElementById('colorChoose').value;
ctx.strokeStyle = document.getElementById('colorChoose').value;
ctx.lineWidth = document.getElementById('outlineThickness').value;
var x;
var y;
var angle = 90;

document.getElementById("btnDrawFractalLine").addEventListener("click", function() {
  var ratio = parseInt(document.getElementById('fractalRatio').value);
  var iterations = parseInt(document.getElementById('fractalIterations').value);
  drawFractal("line", ratio, iterations)
});

document.getElementById("btnClearCanvas").addEventListener("click", clearCanvas);

document.getElementById("colorChoose").addEventListener("change", function() {
  var colorChoose = document.getElementById('colorChoose');
  var color = colorChoose.value;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  colorChoose.style.backgroundColor = color;
});

document.getElementById("outlineThickness").addEventListener("change", function() {
  var thicknessChoose = document.getElementById('outlineThickness');
  ctx.lineWidth = thicknessChoose.value;
});

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawFractal(inputPrimitive, ratio, iterations) {
  var center_x = canvas.width / 2;
  var center_y = canvas.height / 2;
  var length = 500;

  clearCanvas();

  x = center_x - length / 2;
  y = center_y;

  ctx.beginPath();
  ctx.moveTo(x, y);

  if (inputPrimitive == "line")
    drawFractalLine(ratio, iterations, length);
  if (inputPrimitive == "circle")
    drawFractalCircle(ratio, iterations, length);

  ctx.stroke();
}

function drawFractalLine(ratio, iterations, sideLength) {
  if (iterations < 1) {
    x += sideLength * Math.sin(angle * Math.PI / 180);
    y -= sideLength * Math.cos(angle * Math.PI / 180);
    ctx.lineTo(x, y);
    return;
  }

  sideLength /= ratio;

  var q = 1;
  for (var i = 0; i < ratio; i++) {
    angle += 60 * q;
    drawFractalLine(ratio, iterations - 1, sideLength);
    angle -= 120 * q;
    drawFractalLine(ratio, iterations - 1, sideLength);
    angle += 60 * q;
    q *= -1;
  }
}

function drawFractalCircle(ratio, iterations, sideLength) {
  if (iterations < 1) {
    draw(sideLength);
    return;
  }


}

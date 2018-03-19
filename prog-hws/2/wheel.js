var canvas = document.getElementById("chrisCanvas");
var ctx = canvas.getContext("2d");
var fillStyle = 'blue';
var strokeStyle = 'blue';
var rivetStyle = 'red';
var outlineColor = null;
ctx.font = "24px Arial";
var thickness = 35;
var outlineThickness = 8;
var gradient = false;

document.getElementById("btnDrawWheel").addEventListener("click", function() {
  if (document.getElementById('txtScore').value == "")
    return;

  var score = parseInt(document.getElementById('txtScore').value);
  var center_x = canvas.width / 2;
  var center_y = canvas.height / 2;
  var RADIUS = 150;
  var text = "";

  clearCanvas();

  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = outlineColor;

  if (gradient) {
    var grd = ctx.createRadialGradient(center_x, center_y, 25, center_x + 50, center_y - 50, 150);
    grd.addColorStop(0, 'white');
    grd.addColorStop(1, fillStyle);
    ctx.fillStyle = grd;
  }

  if (score > 100) {
    alert("Invalid score!");
    return;
  } else if (score == 100) {
    circle(true, center_x, center_y, RADIUS);
    ctx.lineWidth = outlineThickness;
    if (outlineColor) circle(false, center_x, center_y, RADIUS);
    ctx.fillStyle = 'white';
    circle(true, center_x, center_y, RADIUS - thickness);
    if (outlineColor) circle(false, center_x, center_y, RADIUS - thickness);
    text = "Circular Wheel";
  } else if (score >= 80) {
    var difference = 100 - score;
    var newR = (1 + difference / 100) * RADIUS;
    ellipse(true, center_x, center_y, newR, RADIUS);
    ctx.lineWidth = outlineThickness;
    if(outlineColor) ellipse(false, center_x, center_y, newR, RADIUS);
    ctx.fillStyle = 'white';
    ellipse(true, center_x, center_y, newR - thickness, RADIUS - thickness);
    if(outlineColor) ellipse(false, center_x, center_y, newR - thickness, RADIUS - thickness);
    text = "Ellipse Wheel";
  } else if (score <= 2) {
    alert("Invalid score!");
    return;
  } else {
    polygon(true, score, RADIUS, center_x, center_y);
    ctx.lineWidth = outlineThickness;
    if(outlineColor) polygon(false, score, RADIUS, center_x, center_y);
    ctx.fillStyle = 'white';
    polygon(true, score, RADIUS - thickness, center_x, center_y);
    if(outlineColor) polygon(false, score, RADIUS - thickness, center_x, center_y);
    text = "Polygon Wheel";
  }
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.fillText(text, 10, 30);
  ctx.lineWidth = 8;
  circle(false, center_x, center_y, 15);
  ctx.lineWidth = 4;
  ctx.strokeStyle = rivetStyle;
  circle(false, center_x, center_y + 35, 5);
  circle(false, center_x, center_y - 35, 5);
  circle(false, center_x + 35, center_y, 5);
  circle(false, center_x - 35, center_y, 5);
});

document.getElementById("btnClearCanvas").addEventListener("click", clearCanvas);

document.getElementById("colorChoose").addEventListener("change", function() {
  var colorChoose = document.getElementById('colorChoose');
  var color = colorChoose.value;
  fillStyle = color;
  strokeStyle = color;
  colorChoose.style.backgroundColor = color;
});

document.getElementById("rivetColor").addEventListener("change", function() {
  var colorChoose = document.getElementById('rivetColor');
  var color = colorChoose.value;
  rivetStyle = color;
  colorChoose.style.backgroundColor = color;
});

document.getElementById("outlineColor").addEventListener("change", function() {
  var colorChoose = document.getElementById('outlineColor');
  var color = colorChoose.value;
  if (color == "none") {
    outlineColor = null;
    colorChoose.style.backgroundColor = 'gray';
  } else {
    outlineColor = color;
    colorChoose.style.backgroundColor = color;
  }
});

document.getElementById("thicknessChoose").addEventListener("change", function() {
  var thicknessChoose = document.getElementById('thicknessChoose');
  thickness = thicknessChoose.value;
});

document.getElementById("outlineThickness").addEventListener("change", function() {
  var thicknessChoose = document.getElementById('outlineThickness');
  outlineThickness = thicknessChoose.value;
});

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function between(a, b, val) {
  if ((a < val && val < b) || (a > val && val > b)) {
    return true;
  }
  return false;
}

//http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
function polygon(solid, numberOfSides, size, Xcenter, Ycenter) {
  ctx.beginPath();
  ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

  for (var i = 1; i <= numberOfSides; i += 1) {
    ctx.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
  }
  if (solid)
    ctx.fill();
  else
    ctx.stroke();
}

function circle(solid, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  if (solid)
    ctx.fill();
  else
    ctx.stroke();
}

function ellipse(solid, x, y, r1, r2) {
  ctx.beginPath();
  ctx.ellipse(x, y, r1, r2, 0, 0, 2 * Math.PI);
  if (solid)
    ctx.fill();
  else
    ctx.stroke();
}

document.getElementById("grd").addEventListener("change", function() {
  var grd = document.getElementById('grd');
  var checked = grd.checked;
  if (checked) {
    gradient = true;
  } else {
    gradient = false;
  }
});

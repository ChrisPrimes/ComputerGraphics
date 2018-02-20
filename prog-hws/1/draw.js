var canvas = document.getElementById("chrisCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = 'blue';
var instruction = document.getElementById("instruction");
var defaultInstruction = instruction.innerHTML;
var tool = null;
var thickness = 1;

var tools = {
  "Line": 1,
  "Circle": 2,
  "Rectangle": 3,
  "Ellipse": 4,
  "Polygon": 5,
  "Polyline": 6
};
var Line = {
  "x0": null,
  "x1": null,
  "y0": null,
  "y1": null
};
var Circle = {
  "x": null,
  "y": null,
  "r": null
};
var Rectangle = {
  "x1": null,
  "y1": null,
  "x2": null,
  "y2": null,
  "x3": null,
  "y3": null,
  "x4": null,
  "y4": null
};
var Ellipse = {
  "x": null,
  "y": null,
  "ra": null,
  "rb": null
};
var Polygon = {
  "x0": null,
  "y0": null,
  "xl": null,
  "yl": null
}
var Polyline = {
  "xl": null,
  "yl": null
}

//https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    "x": Math.floor(evt.clientX - rect.left),
    "y": Math.floor(evt.clientY - rect.top)
  };
}

canvas.addEventListener('click', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  var x = mousePos.x;
  var y = mousePos.y;

  switch (tool) {
    case tools.Line:
      if (Line.x0 == null) {
        Line.x0 = x;
        Line.y0 = y;
        instruction.innerHTML = "Select the ending point of the line.";
      } else {
        Line.x1 = x;
        Line.y1 = y;
        midpointLine(Line.x0, Line.y0, Line.x1, Line.y1);
        tool = null;
        instruction.innerHTML = defaultInstruction;
        Line.x0 = null;
        Line.x1 = null;
        Line.y0 = null;
        Line.y1 = null;
        document.getElementById("btnDrawLine").classList.remove('selected');
      }
      break;

    case tools.Circle:
      if (Circle.x == null) {
        Circle.x = x;
        Circle.y = y;
        instruction.innerHTML = "Select the radius of the circle.";
      } else {
        Circle.r = Math.floor(Math.sqrt((x - Circle.x) * (x - Circle.x) + (y - Circle.y) * (y - Circle.y)));
        midpointCircle(Circle.x, Circle.y, Circle.r);
        tool = null;
        instruction.innerHTML = defaultInstruction;
        Circle.x = null;
        Circle.y = null;
        Circle.r = null;
        document.getElementById("btnDrawCircle").classList.remove('selected');
      }
      break;

    case tools.Ellipse:
      if (Ellipse.x == null) {
        Ellipse.x = x;
        Ellipse.y = y;
        instruction.innerHTML = "Select the first radius of the ellipse.";
      } else if (Ellipse.ra == null) {
        Ellipse.ra = Math.floor(Math.sqrt((x - Ellipse.x) * (x - Ellipse.x) + (y - Ellipse.y) * (y - Ellipse.y)));
        instruction.innerHTML = "Select the second radius of the ellipse.";
      } else {
        Ellipse.rb = Math.floor(Math.sqrt((x - Ellipse.x) * (x - Ellipse.x) + (y - Ellipse.y) * (y - Ellipse.y)));
        midpointEllipse(Ellipse.x, Ellipse.y, Ellipse.ra, Ellipse.rb);
        tool = null;
        instruction.innerHTML = defaultInstruction;
        Ellipse.x = null;
        Ellipse.y = null;
        Ellipse.ra = null;
        Ellipse.rb = null;
        document.getElementById("btnDrawEllipse").classList.remove('selected');
      }
      break;

    case tools.Rectangle:
      if (Rectangle.x1 == null) {
        Rectangle.x1 = x;
        Rectangle.y1 = y;
        instruction.innerHTML = "Select the second corner of the rectangle.";
      } else if (Rectangle.x2 == null) {
        Rectangle.x2 = x;
        Rectangle.y2 = y;
        midpointLine(Rectangle.x1, Rectangle.y1, Rectangle.x2, Rectangle.y2);
        instruction.innerHTML = "Select the height of the rectangle.";
      } else {
        var m = (Rectangle.y2 - Rectangle.y1) / (Rectangle.x2 - Rectangle.x1);
        if (m == 0) {
          m = 0.0001;
        } else if (m == 1) {
          m = 1.0001;
        }

        var b2 = y - m * x;

        var invM = -1 / m;

        var bL = Rectangle.y1 - invM * Rectangle.x1;
        var bR = Rectangle.y2 - invM * Rectangle.x2;

        Rectangle.x3 = Math.floor((b2 - bL) / (invM - m));
        Rectangle.y3 = Math.floor((invM * b2 - m * bL) / (invM - m));

        Rectangle.x4 = Math.floor((b2 - bR) / (invM - m));
        Rectangle.y4 = Math.floor((invM * b2 - m * bR) / (invM - m));

        midpointLine(Rectangle.x3, Rectangle.y3, Rectangle.x4, Rectangle.y4);
        midpointLine(Rectangle.x1, Rectangle.y1, Rectangle.x3, Rectangle.y3);
        midpointLine(Rectangle.x2, Rectangle.y2, Rectangle.x4, Rectangle.y4);

        tool = null;
        instruction.innerHTML = defaultInstruction;
        Rectangle.x1 = null;
        Rectangle.y1 = null;
        Rectangle.x2 = null;
        Rectangle.y2 = null;
        Rectangle.x3 = null;
        Rectangle.y3 = null;
        Rectangle.x4 = null;
        Rectangle.y4 = null;
        document.getElementById("btnDrawRectangle").classList.remove('selected');
      }
      break;

    case tools.Polygon:
      if (Polygon.x0 == null) {
        Polygon.x0 = x;
        Polygon.y0 = y;
        Polygon.xl = x;
        Polygon.yl = y;
        instruction.innerHTML = "Select the next point of the polygon.";
      } else if (between(Polygon.x0 + 20, Polygon.x0 - 20, x) && between(Polygon.y0 + 20, Polygon.y0 - 20, y)) {
        midpointLine(Polygon.xl, Polygon.yl, Polygon.x0, Polygon.y0);

        tool = null;
        instruction.innerHTML = defaultInstruction;
        document.getElementById("btnDrawPolygon").classList.remove('selected');
        Polygon.x0 = null;
        Polygon.y0 = null;
        Polygon.xl = null;
        Polygon.yl = null;
      } else {
        midpointLine(Polygon.xl, Polygon.yl, x, y);
        Polygon.xl = x;
        Polygon.yl = y;
      }
      break;

    case tools.Polyline:
      if (Polyline.xl == null) {
        Polyline.xl = x;
        Polyline.yl = y;
        instruction.innerHTML = "Select the next point of the Polyline.<br />Press \"Complete polyline\" when finished!";
        document.getElementById("btnDrawPolyline").innerHTML = "Complete polyline";
      } else {
        midpointLine(Polyline.xl, Polyline.yl, x, y);
        Polyline.xl = x;
        Polyline.yl = y;
      }
      break;
  }
});

document.getElementById("btnDrawLine").addEventListener("click", function() {
  if (tool != null)
    return;

  tool = tools.Line;
  document.getElementById("btnDrawLine").classList.add('selected');
  instruction.innerHTML = "Select the starting point of the line.";
});

document.getElementById("btnDrawCircle").addEventListener("click", function() {
  if (tool != null)
    return;

  tool = tools.Circle;
  document.getElementById("btnDrawCircle").classList.add('selected');
  instruction.innerHTML = "Select the center of the circle.";
});

document.getElementById("btnDrawRectangle").addEventListener("click", function() {
  if (tool != null)
    return;

  tool = tools.Rectangle;
  document.getElementById("btnDrawRectangle").classList.add('selected');
  instruction.innerHTML = "Select a corner of the rectangle.";
});

document.getElementById("btnDrawEllipse").addEventListener("click", function() {
  if (tool != null)
    return;

  tool = tools.Ellipse;
  document.getElementById("btnDrawEllipse").classList.add('selected');
  instruction.innerHTML = "Select the center of the ellipse.";
});

document.getElementById("btnDrawPolygon").addEventListener("click", function() {
  if (tool != null)
    return;

  tool = tools.Polygon;
  document.getElementById("btnDrawPolygon").classList.add('selected');
  instruction.innerHTML = "Select the first point of the polygon.";
});

document.getElementById("btnDrawPolyline").addEventListener("click", function() {
  if (tool == tools.Polyline && Polyline.xl != null) {
    tool = null;
    instruction.innerHTML = defaultInstruction;
    document.getElementById("btnDrawPolyline").innerHTML = "Draw a polyline";
    document.getElementById("btnDrawPolyline").classList.remove('selected');
    Polyline.xl = null;
    Polyline.yl = null;
  } else if(tool != null){
    return;
  }else{
    tool = tools.Polyline;
    document.getElementById("btnDrawPolyline").classList.add('selected');
    instruction.innerHTML = "Select the first point of the polyline.";
  }
});

document.getElementById("btnClearCanvas").addEventListener("click", clearCanvas);

document.getElementById("colorChoose").addEventListener("change", function() {
  var colorChoose = document.getElementById('colorChoose');
  var color = colorChoose.value;
  ctx.fillStyle = color;
  colorChoose.style.backgroundColor = color;
});

document.getElementById("thicknessChoose").addEventListener("change", function() {
  var thicknessChoose = document.getElementById('thicknessChoose');
  thickness = thicknessChoose.value;
});

function drawPoint(x, y) {
  //console.log('(' + x + ', ' + y + ')');
  //default thickness is 1
  ctx.fillRect(x, y, thickness, thickness);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  instruction.innerHTML = defaultInstruction;
  tool = null;
  Line.x0 = null;
  Line.x1 = null;
  Line.y0 = null;
  Line.y1 = null;
  Circle.x = null;
  Circle.y = null;
  Circle.r = null;
  Ellipse.x = null;
  Ellipse.y = null;
  Ellipse.ra = null;
  Ellipse.rb = null;
  Rectangle.x1 = null;
  Rectangle.y1 = null;
  Rectangle.x2 = null;
  Rectangle.y2 = null;
  Rectangle.x3 = null;
  Rectangle.y3 = null;
  Rectangle.x4 = null;
  Rectangle.y4 = null;
  Polygon.x0 = null;
  Polygon.y0 = null;
  Polygon.xl = null;
  Polygon.yl = null;
  Polyline.xl = null;
  Polyline.yl = null;
  document.getElementById("btnDrawLine").classList.remove('selected');
  document.getElementById("btnDrawCircle").classList.remove('selected');
  document.getElementById("btnDrawRectangle").classList.remove('selected');
  document.getElementById("btnDrawEllipse").classList.remove('selected');
  document.getElementById("btnDrawRectangle").classList.remove('selected');
  document.getElementById("btnDrawPolygon").classList.remove('selected');
  document.getElementById("btnDrawPolyline").classList.remove('selected');
  document.getElementById("btnDrawPolyline").innerHTML = "Draw a polyline";
}

function between(a, b, val) {
  if ((a < val && val < b) || (a > val && val > b)) {
    return true;
  }
  return false;
}

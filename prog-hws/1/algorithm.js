/*
 * Function adapted from code on the following website:
 * https://www.opengl.org/discussion_boards/showthread.php/168761-Drawing-Line-Bresenhem-midpoint-algorithm
 * Code was modified to remove redundant lines, make meaning easier to understand, and align variable names
 * to what was used in class
 */
function midpointLine(xa, ya, xb, yb) {
  var y, x, dy, dx, sx, sy, d, incE, incNE;

  dx = xb - xa;
  dy = yb - ya;

  sx = Math.sign(dx);
  sy = Math.sign(dy);

  dx = Math.abs(dx);
  dy = Math.abs(dy);

  d = 2 * dy - dx;
  x = xa;
  y = ya;

  drawPoint(x, y);

  if (dy > dx) {
    incE = 2 * dx;
    incNE = 2 * (dx - dy);

    while (y != yb) {
      drawPoint(x, y);
      if (d <= 0)
        d += incE;
      else {
        d += incNE;
        x += sx;
      }
      y += sy;
    }
  } else {
    incE = 2 * dy;
    incNE = 2 * (dy - dx);

    while (x != xb) {
      drawPoint(x, y);
      if (d <= 0)
        d += incE;
      else {
        d += incNE;
        y += sy;
      }
      x += sx;
    }
  }
}

/*
 * Function based off code samples presented in the book:
 * Computer Graphics: Principles and Practice (second edition) -- By James D. Foley
 */
function midpointCircle(x0, y0, r) {
  var x = 0;
  var y = r;
  var d = 1 - r;

  do {
    drawPoint(x0 + x, y0 + y);
    drawPoint(x0 - x, y0 - y);
    drawPoint(x0 + x, y0 - y);
    drawPoint(x0 - x, y0 + y);
    drawPoint(x0 + y, y0 + x);
    drawPoint(x0 - y, y0 - x);
    drawPoint(x0 + y, y0 - x);
    drawPoint(x0 - y, y0 + x);

    if (d < 0) {
      d += 2 * x + 3;

    } else {
      d += 2 * (x - y) + 5;
      y--;
    }
    x++;
  } while (y > x);
}

/*
 * Function based off code samples presented in the book:
 * Computer Graphics: Principles and Practice (second edition) -- By James D. Foley
 */
function midpointEllipse(x0, y0, a, b) {
  x = 0;
  y = b;
  d1 = (b * b) - (a * a * b) + (0.25 * a * a);
  ellipsePoints(x0, y0, x, y);

  while (a * a * (y - 0.5) > b * b * (x + 1)) {
    if (d1 < 0) {
      d1 += b * b * (2 * x + 3);
    } else {
      d1 += b * b * (2 * x + 3) + a * a * (-2 * y + 2);
      y--;
    }
    x++;
    ellipsePoints(x0, y0, x, y);
  }

  d2 = b * b * (x + 0.5) * (x + 0.5) + a * a * (y - 1) * (y - 1) - a * a * b * b;
  while (y > 0) {
    if (d2 < 0) {
      d2 += b * b * (2 * x + 2) + a * a * (-2 * y + 3);
      x++;
    } else {
      d2 += a * a * (-2 * y + 3);
    }
    y--;
    ellipsePoints(x0, y0, x, y);
  }
}

function ellipsePoints(x0, y0, x, y) {
  drawPoint(x0 + x, y0 + y);
  drawPoint(x0 - x, y0 + y);
  drawPoint(x0 + x, y0 - y);
  drawPoint(x0 - x, y0 - y);
}

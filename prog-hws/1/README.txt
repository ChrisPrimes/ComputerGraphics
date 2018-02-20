Christopher Primes
Christopher_Primes@student.uml.edu
cprimes@cs.uml.edu
http://www.cs.uml.edu/~cprimes/427546s2018/prog-hws/1/

 ********** Assignment #1 **********

My assignment 1 is comprised of the following files:

* index.html - This file is responsible for creating the canvas, buttons, and linking all the javascript, CSS and HTML together.

* style.css - Provides styles for the webpage, including button size, button color, select size, canvas border, and heading size and font.

* algorithm.js - Provides implementations of the midpoint algorithms for lines, circles, and ellipses.  These functions are referenced from the draw.js file.

* draw.js - This is the "main" javascript file for the application.  It defines actions for all the  buttons, and all the "onclick" canvas events.  It also defines the drawPoint(x,y) function, which isn't implemented by default by canvas.  To accomplish this, I draw a rectangle at the given point, that is 1 pixel by 1 pixel in size (or 2 pixels by 2 pixels, depending on the user's line thickness preference).  The midpoint algorithms are used in functions in this file.

* README.txt

 ********** How to use **********

To use my application, simply open the webpage and click on the desired tool.  Once you have a tool selected, follow the instructions that are provided in the upper right of the window (they are highlighted in yellow).  Please note that your drawing will not appear on the screen until both required points are drawn.  You are able to change the color and line thickness using the dropdown menus.  A "clear" button is provided to clear the canvas so you can start drawing from scratch.

 ********** Sources **********

Code in the algorithm.js file is derived from examples provided in books and online.  The midpoint line algorithm uses some code provided on the website: https://www.opengl.org/discussion_boards/showthread.php/168761-Drawing-Line-Bresenhem-midpoint-algorithm.  This code was modified to align it with Javascript, and align it more with the methods used in class.  The midpoint circle and ellipse algorithms are based off of algorithms in the book "Computer Graphics: Principles and Practice (second edition) -- By James D. Foley".  This book was accessed electronically via Google Books.  The examples in the book only draw elements from the origin, so I changed them to allow shapes to be drawn from any point on the canvas.
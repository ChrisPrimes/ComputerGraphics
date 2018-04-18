if (Detector.webgl) {
  window.addEventListener("resize", function() {
    //document.querySelector("body").innerHTML = '<p style="text-align: center;"> The window size has changed.  Please reload this page. </p>';
  });

} else {
  document.querySelector('body').innerHTML = '';
  var warning = Detector.getWebGLErrorMessage();
  document.querySelector('body').appendChild(warning);
}

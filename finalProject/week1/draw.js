/***************** Constants *****************/
const WIDTH = document.querySelector("#canvas-div").clientWidth;
const HEIGHT = document.querySelector("#table-full").clientHeight;
const customColors = {
  blue: 0x0095DD,
  red: 0xFF2211
};
/********************************************/



/***************** Globals *****************/
var rotateX = false;
var rotateY = false;
var rotateZ = false;
var arrayOfObjects = [];
/********************************************/



/***************** Setup *****************/
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.querySelector("#canvas-div").appendChild(renderer.domElement);

var scene = new THREE.Scene();
/*****************************************/



/***************** Cameras *****************/
var camera = new THREE.PerspectiveCamera(16, WIDTH / HEIGHT);
camera.position.x = -80;
camera.position.y = 40;
camera.position.z = 180;
camera.lookAt(0, 15, 0);

var frontCamera = new THREE.PerspectiveCamera(20, WIDTH / HEIGHT);
frontCamera.position.z = 100;
//frontCamera.position.y = 100;
frontCamera.lookAt(0, 15, 0);

var topCamera = new THREE.PerspectiveCamera(20, WIDTH / HEIGHT);
topCamera.position.y = 100;
topCamera.lookAt(0, 0, 0);

var sideCamera = new THREE.PerspectiveCamera(20, WIDTH / HEIGHT);
sideCamera.position.x = -100;
sideCamera.lookAt(0, 15, 0);
/*******************************************/



/***************** Materials *****************/
var sMaterial = new THREE.MeshLambertMaterial({
  color: customColors.red
});

var bMaterial = new THREE.MeshLambertMaterial({
  color: customColors.blue
});
/*********************************************/



/***************** My Dream House *****************/
function createHouseMesh() {
  var sideOfHouseShape = new THREE.Shape();
  sideOfHouseShape.moveTo(0, 0);
  sideOfHouseShape.lineTo(16, 0);
  sideOfHouseShape.lineTo(16, 16);
  sideOfHouseShape.lineTo(8, 28);
  sideOfHouseShape.lineTo(0, 16);
  sideOfHouseShape.lineTo(0, 0);

  var houseExtrudeSettings = {
    amount: 16,
    bevelEnabled: false
  };

  var sideOfHouseGeom = new THREE.ExtrudeGeometry(sideOfHouseShape, houseExtrudeSettings);
  var sideOfHouseMesh = new THREE.Mesh(sideOfHouseGeom, bMaterial);

  var chimneyGeom = new THREE.BoxGeometry(4, 20, 4);
  var chimneyMesh = new THREE.Mesh(chimneyGeom, sMaterial);
  chimneyMesh.position.set(12, 20, 8);

  var windowGeom = new THREE.BoxGeometry(5, 5, 0.1);
  var windowMeshFrontL = new THREE.Mesh(windowGeom, sMaterial);
  windowMeshFrontL.position.set(4, 12, 16);
  var windowMeshFrontR = new THREE.Mesh(windowGeom, sMaterial);
  windowMeshFrontR.position.set(12, 12, 16);
  var windowMeshSideLL = new THREE.Mesh(windowGeom, sMaterial);
  windowMeshSideLL.rotation.y = THREE.Math.degToRad(90);
  windowMeshSideLL.position.set(0, 12, 12);
  var windowMeshSideLR = new THREE.Mesh(windowGeom, sMaterial);
  windowMeshSideLR.rotation.y = THREE.Math.degToRad(90);
  windowMeshSideLR.position.set(0, 12, 4);
  var windowMeshSideRL = new THREE.Mesh(windowGeom, sMaterial);
  windowMeshSideRL.rotation.y = THREE.Math.degToRad(90);
  windowMeshSideRL.position.set(16, 12, 12);
  var windowMeshSideRR = new THREE.Mesh(windowGeom, sMaterial);
  windowMeshSideRR.rotation.y = THREE.Math.degToRad(90);
  windowMeshSideRR.position.set(16, 12, 4);

  var myDreamHouse = new THREE.Group();
  myDreamHouse.add(sideOfHouseMesh);
  myDreamHouse.add(chimneyMesh);
  myDreamHouse.add(windowMeshFrontL);
  myDreamHouse.add(windowMeshFrontR);
  myDreamHouse.add(windowMeshSideLL);
  myDreamHouse.add(windowMeshSideLR);
  myDreamHouse.add(windowMeshSideRL);
  myDreamHouse.add(windowMeshSideRR);
  myDreamHouse.position.set(-8, 0, -8);

  var obj = new THREE.Object3D();
  obj.add(myDreamHouse);

  return obj;
}
/**************************************************/



/***************** Grid *****************/
var gridXZ = new THREE.GridHelper(100, 10);
scene.add(gridXZ);
/****************************************/



/***************** Lights *****************/
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 100, 100);
scene.add(pointLight);

var pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(-100, 0, 0);
scene.add(pointLight1);
/******************************************/



function display() {
  requestAnimationFrame(display);

  var i;
  for (i = 0; i < arrayOfObjects.length; i++) {
    var elem = arrayOfObjects[i];

    if (elem.rotateX)
      elem.object.rotation.x += 0.01;
    if (elem.rotateY)
      elem.object.rotation.y += 0.01;
    if (elem.rotateZ)
      elem.object.rotation.z += 0.01;
  }

  var left, bottom, width, height;

  left = 0;
  bottom = 0;
  width = 0.5 * WIDTH + 1;
  height = 0.5 * HEIGHT;
  renderer.setViewport(left, bottom, width, height);
  renderer.setScissor(left, bottom, width, height);
  renderer.setScissorTest(true);
  frontCamera.aspect = width / height;
  frontCamera.updateProjectionMatrix();
  renderer.render(scene, frontCamera);

  left = 0.5 * WIDTH;
  bottom = 0;
  width = 0.5 * WIDTH + 1;
  height = 0.5 * HEIGHT;
  renderer.setViewport(left, bottom, width, height);
  renderer.setScissor(left, bottom, width, height);
  renderer.setScissorTest(true);
  sideCamera.aspect = width / height;
  sideCamera.updateProjectionMatrix();
  renderer.render(scene, sideCamera);

  left = 0;
  bottom = 0.5 * HEIGHT;
  width = 0.5 * WIDTH + 1;
  height = 0.5 * HEIGHT;
  renderer.setViewport(left, bottom, width, height);
  renderer.setScissor(left, bottom, width, height);
  renderer.setScissorTest(true);
  topCamera.aspect = width / height;
  topCamera.updateProjectionMatrix();
  renderer.render(scene, topCamera);

  left = 0.5 * WIDTH;
  bottom = 0.5 * HEIGHT;
  width = 0.5 * WIDTH + 1;
  height = 0.5 * HEIGHT;
  renderer.setViewport(left, bottom, width, height);
  renderer.setScissor(left, bottom, width, height);
  renderer.setScissorTest(true);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  //renderer.render(scene, camera);
}
display();



/***************** Event Listeners *****************/
/*
document.querySelector("#toggleXRotation").addEventListener("click", function() {
  if (rotateX === false) {
    rotateX = true;
  } else {
    rotateX = false;
  }
});

document.querySelector("#toggleYRotation").addEventListener("click", function() {
  if (rotateY === false) {
    rotateY = true;
  } else {
    rotateY = false;
  }
});

document.querySelector("#toggleZRotation").addEventListener("click", function() {
  if (rotateZ === false) {
    rotateZ = true;
  } else {
    rotateZ = false;
  }
});
*/

document.querySelector("#chooseObjDraw").addEventListener("change", function() {
  var x = document.getElementsByClassName("chooseobjdraw-controls");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].classList.add('d-none');
  }
  var objToDrawChoose = document.querySelector('#chooseObjDraw');
  objToDraw = objToDrawChoose.value;
  document.querySelector('#draw-' + objToDraw + '-controls').classList.remove('d-none');
});

document.querySelector("#draw-house").addEventListener("click", function() {
  var myDreamHouse = createHouseMesh();
  arrayOfObjects.push({
    type: "House",
    object: myDreamHouse,
    rotateX: false,
    rotateY: false,
    rotateZ: false
  });
  scene.add(myDreamHouse);
  updateObjectListing();
});

document.querySelector("#draw-box").addEventListener("click", function() {
  var xLength = parseInt(document.querySelector('#draw-box-xlength').value);
  var yLength = parseInt(document.querySelector('#draw-box-ylength').value);
  var zLength = parseInt(document.querySelector('#draw-box-zlength').value);

  var boxGeom = new THREE.BoxGeometry(xLength, yLength, zLength);
  var boxMesh = new THREE.Mesh(boxGeom, sMaterial);
  boxMesh.position.y += yLength / 2;

  arrayOfObjects.push({
    type: "Box",
    object: boxMesh,
    rotateX: false,
    rotateY: false,
    rotateZ: false
  });
  scene.add(boxMesh);
  updateObjectListing();
});

document.querySelector("#draw-sphere").addEventListener("click", function() {
  var radius = parseInt(document.querySelector('#draw-sphere-radius').value);

  var sphereGeom = new THREE.SphereGeometry(radius, 32, 32);
  var sphereMesh = new THREE.Mesh(sphereGeom, sMaterial);
  sphereMesh.position.y += radius;

  arrayOfObjects.push({
    type: "Sphere",
    object: sphereMesh,
    rotateX: false,
    rotateY: false,
    rotateZ: false
  });
  scene.add(sphereMesh);
  updateObjectListing();
});

document.querySelector("#draw-shape").addEventListener("click", function() {
  var depth = parseInt(document.querySelector('#draw-shape-depth').value);
  var coordsStr = document.querySelector('#draw-shape-coordinates').value;
  var pointsArray = parseCoordinatesString(coordsStr);

  var shape = new THREE.Shape();
  shape.moveTo(0, 0);

  var i;
  for (i = 0; i < pointsArray.length; i++) {
    var x = pointsArray[i].x;
    var y = pointsArray[i].y;
    shape.lineTo(x, y);
  }

  var extrudeSettings = {
    amount: depth,
    bevelEnabled: false
  };

  var shapeGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  var shapeMesh = new THREE.Mesh(shapeGeom, bMaterial);

  arrayOfObjects.push({
    type: "Shape",
    object: shapeMesh,
    rotateX: false,
    rotateY: false,
    rotateZ: false
  });
  scene.add(shapeMesh);
  updateObjectListing();
});

document.querySelector("#remove-all").addEventListener("click", function() {
  var i;
  for (i = 0; i < arrayOfObjects.length; i++) {
    scene.remove(arrayOfObjects[i].object);
  }
  arrayOfObjects = [];
  updateObjectListing();
});

document.querySelector("#remove-selected").addEventListener("click", function() {
  var toRemove = parseInt(document.querySelector("#chooseObjEdit").value);
  scene.remove(arrayOfObjects[toRemove].object);
  arrayOfObjects.splice(toRemove, 1);
  updateObjectListing();
});

function updateObjectListing() {
  var select = document.querySelector("#chooseObjEdit");
  select.options.length = 0;

  var i;
  for (i = 0; i < arrayOfObjects.length; i++) {
    var type = i + '. ' + arrayOfObjects[i].type;
    select.options[select.options.length] = new Option(type, i, false, false);
  }
  if (select.options.length > 0)
    select.options[i - 1].selected = true;
}

function parseCoordinatesString(coordsStr) {
  var coordsArr = coordsStr.split("\n");
  var pointsArray = [];
  var i;
  for (i = 0; i < coordsArr.length; i++) {
    var coord = coordsArr[i];
    coord = coord.replace("(", "");
    coord = coord.replace(")", "");
    var pointArr = coord.split(",");
    var x = parseInt(pointArr[0]);
    var y = parseInt(pointArr[1]);
    pointsArray.push({
      x: x,
      y: y
    });
  }
  return pointsArray;
}
/***************************************************/

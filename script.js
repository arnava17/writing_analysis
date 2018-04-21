var context, clickX, clickY, points, pointsMap, clickDrag, paint, currentPoint,
    clickDragMap, clickXMap, clickYMap;
context = document.getElementById('drawingCanvas').getContext("2d");
function initialize() {
  clickX    = new Array();
  clickY    = new Array();
  clickDrag = new Array();

  clickDragMap = new Map();
  clickXMap   = new Map();
  clickYMap   = new Map();

  points = new Array();
  pointsMap = new Map();

  currentPoint = 0;
  paint = false;
  redraw();
}

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickXMap.set(currentPoint, clickX);

  clickY.push(y);
  clickYMap.set(currentPoint, clickY);

  points.push({x,y});
  pointsMap.set(currentPoint, points);

  clickDrag.push(dragging);
  clickDragMap.set(currentPoint, clickDrag);
}

$('#drawingCanvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#drawingCanvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#drawingCanvas').mouseup(function(e){
  if(paint){
    paint = false;
    currentPoint++;
    clickX = new Array();
    clickY = new Array();
    points = new Array();
    clickDrag = new Array();
  }
});

$('#drawingCanvas').mouseleave(function(e){
  if(paint){
    paint = false;
    currentPoint++;
    clickX = new Array();
    clickY = new Array();
    points = new Array();
    clickDrag = new Array();
  }
});

$('#clrBtn').click(clear);
$('#analyzeBtn').click(anaylyze);

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#0c194a";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for (var j = 0; j < pointsMap.size; j++) {
    let dragArray = clickDragMap.get(j);
    let xArray = clickXMap.get(j);
    let yArray = clickYMap.get(j);
    for(var i=0; i < xArray.length; i++) {
      context.beginPath();
      if(dragArray[i] && i){
        context.moveTo(xArray[i-1], yArray[i-1]);
       }else{
         context.moveTo(xArray[i]-1, yArray[i]);
       }
       context.lineTo(xArray[i], yArray[i]);
       context.closePath();
       context.stroke();
    }
  }

}

function clear() {
  initialize();
}

function anaylyze() {
  console.log(pointsMap);
}

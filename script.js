var context, clickX, clickY, points, pointsMap, clickDrag, paint, currentPoint;

function initialize() {
  context = document.getElementById('drawingCanvas').getContext("2d");
  clickX = new Array();
  clickY = new Array();
  points = new Array();
  pointsMap = new Map();
  clickDrag = new Array();
  currentPoint = 0;
  redraw();
}

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  points.push({x,y});
  pointsMap.set(currentPoint, points);
  clickDrag.push(dragging);
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
  paint = false;
  currentPoint++;
});

$('#drawingCanvas').mouseleave(function(e){
  paint = false;
  currentPoint++;
});

$('#clrBtn').click(clear);
$('#analyzeBtn').click(anaylyze);

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for(var i=0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}

function clear() {
  //console.log("aya");
  initialize();
}

function anaylyze() {
  console.log(pointsMap);
}

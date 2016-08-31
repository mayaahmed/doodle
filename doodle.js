var canvas = document.getElementById('canvas');
var context=canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

/*
window.onresize = function(){
var image=  context.getImageData(0,0,canvas.width, canvas.height);
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
context.putImageData(image,0,0);
}

  function clearCanvas(canvas){
    canvas.width=canvas.width;
}
*/

var radius=10;
context.lineWidth=radius*2;
var dragging = false;

var setRadius=function(newRadius){
  if(newRadius<minRad)
    newRadius=minRad;
  else if(newRadius>maxRad)
    newRadius=maxRad;
  radius=newRadius;
  context.lineWidth=radius*2;
  radSpan.innerHTML=radius;
}

 var  newButton = document.getElementById('new');
newButton.addEventListener('click', function(){
    context.clearRect(0,0,canvas.width,canvas.height);
});  

 


var minRad=0.5, maxRad=100, defaultRad=10, interval=5;
var radSpan=document.getElementById('radval');
var decRad=document.getElementById('decrad');
var  incRad=document.getElementById('incrad');

decRad.addEventListener('click',function(){
      setRadius(radius-interval); });
incRad.addEventListener('click',function(){
      setRadius(radius+interval); });
setRadius(defaultRad);


var putPoint=function(e){
var rect = canvas.getBoundingClientRect();  // absolute position of canvas
  if(dragging){
    context.lineTo(e.clientX- rect.left, e.clientY- rect.top);
    context.stroke();
  context.beginPath();
  context.arc(e.clientX- rect.left, e.clientY- rect.top, radius, 0, Math.PI*2);
  context.fill();
  context.beginPath();
  context.moveTo(e.clientX- rect.left, e.clientY- rect.top);
  }
}



  var engage = function(e){
    dragging=true;
    putPoint(e);
  }

var disengage = function(){
    dragging=false;
    context.beginPath();
  }

canvas.addEventListener("mousedown",engage);
canvas.addEventListener("mousemove",putPoint);
canvas.addEventListener("mouseup",disengage);

/*
function doFirst(){
  var x = document.getElementById('canvas'); 
  canvas=x.getContext('2d');
   window.addEventListener("mousemove",bucky,false);
}


function bucky(e){
  //  canvas.clearRect(0,0,1000,400); //clear entire canvas
  var xPos=e.clientX;
  var yPos=e.clientY;
  canvas.fillRect(xPos-5,yPos-5,10,10);
  }window.addEventListener("load",doFirst,false);
*/

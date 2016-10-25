var canvas = document.getElementById('canvas');
var context=canvas.getContext('2d');


function init(){
  if (localStorage.savedCanvas){ 
    var dataURL = JSON.parse(localStorage.savedCanvas);
    var img = new Image;
    img.src = dataURL;
    img.onload = function () {
      context.drawImage(img, 0, 0);
    };
  }
}




canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


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

 


var minRad=0.5, maxRad=100, defaultRad=3, interval=1;
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

  localStorage.savedCanvas =JSON.stringify(canvas.toDataURL());
  context.beginPath();
  context.moveTo(e.clientX- rect.left, e.clientY- rect.top);
  }
}

var erasePoint=function(e){
 
var rect = canvas.getBoundingClientRect();  // absolute position of canvas
  if(dragging){

    context.clearRect(e.clientX- rect.left, e.clientY- rect.top,20,20);
    context.moveTo(e.clientX- rect.left, e.clientY- rect.top);
  }
}



  var engage = function(e){
    dragging=true;
    if(pen==0)  putPoint(e);
    else if(pen==1)  erasePoint(e);
  }

var disengage = function(){
    dragging=false;
    context.beginPath();
  }

var pen=0;
check();

function changePen(){
  pen=1;
  alert(pen); check();
}


function check(){
canvas.addEventListener("mousedown",engage);
canvas.addEventListener("mouseup",disengage);

if(pen==0){
canvas.addEventListener("mousemove",putPoint);
}
if(pen==1)
canvas.addEventListener("mousemove",erasePoint);
} 

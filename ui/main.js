/*console.log('Loaded!');


//change content of html 

var element=document.getElementById('main-text');
element.innerHTML='Venessa MAria Rodrigues';

//move an image
var moveLeft=0;
var img=document.getElementById('img');
img.onclick = function ()
{
    function moveRight()
    {
        moveLeft=moveLeft+10;
        img.style.marginLeft=moveLeft+'px';
    }
    var interval=setInterval(moveRight,100);
    
};*/
var counter=0;
var button=document.getElementById('counter');
button.onclick=function(){
  counter=counter+1;
  var count=document.getElementById('count');
  count.innerHTML('counter');
};
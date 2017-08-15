console.log('Loaded!');


//change content of html 

var element=document.getElementById('main-text');
element.innerHTML='hello';

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
    
};
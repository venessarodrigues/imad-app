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

var request=new XMLHttpRequest();
request.onreadystatechange = function(){
   if(request.onreadystate === XMLHttpRequest.DONE)
   {
       if(request.readystatus === 200)
       {
           var counter=request.responseText;
           var count=document.getElementById('count');
           count.innerHTML=counter.toString();
       }
   }
};


request.open('GET','http://venessardrgs4.imad.hasura-app.io/',true);
request.send(null);
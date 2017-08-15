console.log('Loaded!');


//change content of html 

var element=document.getElementById('main-text');
element.innerHTML='hello';

//move an image

var img=document.getELementById('img');
img.onclick = function()
{
    img.style.marginLeft='500px';
    
};
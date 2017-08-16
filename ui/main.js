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

var submit=document.getElementById('submit_btn');
submit.onclick=function()
{
    var request=new XMLHttpRequest();
    request.onreadystatechange = function()
    {
       if(request.readyState === XMLHttpRequest.DONE)
       {
           if(request.status === 200)
           {
               alert('logged successfully');
           }
           else if(request.status===403)
           {
               alert('invalid');
           }
           else if(request.status===500)
           {
               alert('something went wrong');
           }
       }
    };
    
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://venessardrgs4.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};
    

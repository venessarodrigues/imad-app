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
var button=document.getElementById('counter');
button.onclick=function(){
    
    var request=new XMLHttpRequest();
    request.onreadystatechange = function()
    {
       if(request.readyState === XMLHttpRequest.DONE)
       {
           if(request.status === 200)
           {
               var counter=request.responseText;
               var count=document.getElementById('count');
               count.innerHTML=counter.toString();
           }
       }
    };
    
    
    
    request.open('GET','http://venessardrgs4.imad.hasura-app.io/counter',true);
    request.send(null);
};
var nameinput=document.getElementById('name');
var name=nameinput.value;
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
                var names=request.responseText;
                var names=JSON.parse(names);
                var list='';
                for(var i=0;i<names.length;i++)
                {
                   list += '<li>' +names[i]+ '<l1>' ;
                }
                var ul=document.getElementById('namelist');
                ul.innerHTML=list;
           }
       }
    };
    
    
    
    request.open('GET','http://venessardrgs4.imad.hasura-app.io/submit-name?name=' +name,true);
    request.send(null);
};
    

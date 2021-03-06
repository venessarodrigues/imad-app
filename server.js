var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var crypto = require('crypto');
var bodyparser=require('body-parser');
var session=require('express-session');
var config ={
    user:'venessardrgs4',
    database:'venessardrgs4',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(session({
    secret:'soemscretcode',
    cookie:{maxAge:1000*60*60*24*30}
}));
var articles={
     'article-one':{
        title: 'article-one | venessa',
        heading:'Article One',
        date: 'Aug 14 2017',
        content: `<p>
                        hello. i am venessa.First article
                    </p>`
    },
     'article-two':{
        title: 'article-two | venessa',
        heading:'Article Two',
        date: 'Aug 14 2017',
        content: `<p>
                        hello. i am venessa.Second article
                    </p>`
        
    },
     'article-three':{
        title: 'article-three | venessa',
        heading:'Article three',
        date: 'Aug 14 2017',
        content: `<p>
                        hello. i am venessa.third article
                    </p>`
    }
};
function createtemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmltemplate=
   ` <html>
    <head>
        <title>
            ${title}
        </title>
        <link href="/ui/style.css" rel="stylesheet" />
        <meta name="viewport" content="width=device-width,intial-scle=1"/>
    </head>
    <body>
        <div class="container">
            <div>
                <a href='/'>home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
               ${date.toDateString()}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
    
</html>`
;
return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter = 0;
app.get('/counter', function (req , res) {
    counter = counter + 1;
    res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function (req, res) {
  var name=req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});
app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbstring=hash(password,salt);
    pool.query('Insert into "user" (username,password) values ($1,$2)',[username,dbstring],function(err,result){
         if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('user entered successfully: '+ username);
        }
    });
});
app.post('/login',function(req,res)
  {
    var username=req.body.username;
    var password=req.body.password;
    pool.query('Select * from "user" where username=$1',[username],function(err,result){
         if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
            res.status(403).send('username/password invalid');
            }
            else
            {
                var dbstring=result.rows[0].password;
                var salt=dbstring.split('$')[2];
                var hashed=hash(password,salt);
                if(hashed===dbstring)
                {
                    //create session
                    req.session.auth={userId: result.rows[0].id};
                  res.send('credentials valid');  
                }
                else
                {
                    res.status(403).send('username/password invalid');
                }
            }
            
        }
    });
});
app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId)
   {
       res.send('logged in: ' + req.session.auth.userId.toString());
   }
   else
   {
       res.send('not logged in');
   }
});
app.get('/logout',function(req,res){
   delete req.session.auth;
   res.send('logged out sucessfully');
});
var pool=new pool(config);
app.get('/test-db',function(req,res){
    pool.query('select * from test',function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/articles/:articleName',function (req,res) {
    pool.query("select * from article where title=$1" ,[req.params.articleName],function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        if(result.rows.length===0)
        {
            res.status(404).send('NOT FOUND');
        }
        else
        {
             var articledata=result.rows[0];
             res.send(createtemplate(articledata));
        }
    });

});
function hash(input,salt)
{
  var hashed= crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
  return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
    var hashedvalue=hash(req.params.input,'this is a random string');
    res.send(hashedvalue);
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

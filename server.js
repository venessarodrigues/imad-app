var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var config ={
    user:'venessardrgs4',
    database:'venessardrgs4',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
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
    pool.query("select * from article where title='" + req.params.articleName +"'",function(err,result){
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

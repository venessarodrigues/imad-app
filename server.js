var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles={
     ArticleOne:{
        title: 'article-one | venessa',
        heading:'Article One',
        date: 'Aug 14 2017',
        content: `<p>
                        hello. i am venessa.First article
                    </p>`
    },
     ArticleTwo:{
        title: 'article-two | venessa',
        heading:'Article Two',
        date: 'Aug 14 2017',
        content: `<p>
                        hello. i am venessa.Second article
                    </p>`
        
    },
     ArticleThree:{
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
               ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
    
</html>`
;
return htmltemplate
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/:articlename',function (req,res) {
    var articlename=req.params.articlename;
    res.send(createtemplate(articles[articlename]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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

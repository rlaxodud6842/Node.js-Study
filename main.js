var http = require('http');
var fs = require('fs');
var url = require('url');
// 얘들은 모듈이다. import격인가봄. url이라는 이름으로 사용하겠다.


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(queryData.id);

    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readFile(`data/${queryData.id}`,'utf-8',function(err,description){
          var title = 'Welcome';
          var description = 'Hello, node.js';
          var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}
          </p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);//얘가 경로를 읽어다가 보여주는 건데. 지금 쿼리데이터
        //즉 URL에 /?id = asdf 에 해당하는걸 만들어 표시중
        });
      }else{
        fs.readFile(`data/${queryData.id}`,'utf-8',function(err,description){
          var title = queryData.id;
          var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}
          </p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);//얘가 경로를 읽어다가 보여주는 건데. 지금 쿼리데이터
        //즉 URL에 /?id = asdf 에 해당하는걸 만들어 표시중
        });
      } 
    }else{
      response.writeHead(404);
      response.end(template);
    }

    

});
app.listen(3000);
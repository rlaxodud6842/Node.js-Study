var http = require('http');
var fs = require('fs');
var url = require('url');
// 얘들은 모듈이다. import격인가봄. url이라는 이름으로 사용하겠다.
function templateHTML(title, list,body){
  return `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          ${body}
          </p>
        </body>
        </html>
        `;
}

function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list + `<li><a href ="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
};

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(queryData.id);

    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data',function(err,filelist){
        var title = 'Welcome';
        var description = 'Hello, node.js';
        var list = templateList(filelist);
        var template = templateHTML(title,list,`<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template);
        });
      }else{
        fs.readdir('./data',function(err,filelist){
          fs.readFile(`data/${queryData.id}`,'utf-8',function(err,description){
            var list = templateList(filelist);
            var title = queryData.id;
            var template = templateHTML(title,list,`<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
          });
        }); 
      } 
    }else{
      response.writeHead(404);
      response.end(template);
    }

    

});
app.listen(3000);
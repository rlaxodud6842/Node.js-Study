var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
const path = require('path');
const { title } = require('process');
var template = require('./lib/template.js')
// 얘들은 모듈이다. import격인가봄. url이라는 이름으로 사용하겠다.
// pm2 start main.js --watch


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(queryData);

    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data',function(err,filelist){
        var title = 'Welcome';
        var description = 'Hello, node.js';
        var list = template.list(filelist);
        var html = template.html(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">Create</a>`);
        response.writeHead(200);
        response.end(html);
        })
      }else{
        fs.readdir('./data',function(err,filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`,'utf-8',function(err,description){
            var list = templateList(filelist);
            var title = queryData.id;
            var html = template.html(title,list,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">Create</a>
              <a href="/update?id=${title}">Update</a>`
            );
          response.writeHead(200);
          response.end(html);
          });
        }); 
      } 
    }else if(pathname === '/create') {  
      fs.readdir('./data',function(err,filelist){
        var title = 'Web - Create';
        var list = template.list(filelist);
        var html = template.html(title,list,`<form action="/create_process" method = "post"> 
          <p>
              <input type = "text" name ="title" placeholder = "Put the title"></p>
          <p>
              <textarea name = "description" placeholder = "Put the discription"></textarea>
          </p>
          <p>
              <input type = 'submit'>
          </p>
      </form>
      `,``);
        response.writeHead(200);
        response.end(html);
        })
    }else if (pathname === '/create_process'){
      var body = '';
      
      request.on('data',function(data){
        body += data;
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`,description,'utf-8',function(err){ // 파일을 저장.
          response.writeHead(302,{location:`/?id=${title}`}); //302는 리다이렉션 시켜라.
          response.end();
        })
      });
    }else if(pathname === `/update`){
      fs.readdir('./data',function(err,filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`,'utf-8',function(err,description){
          var list = template.list(filelist);
          var title = queryData.id;
          var html = template.html(title,list,
            `<form action="/update_process" method = "post"> 
          <input type ="hidden" name = "id" value = "${title}">
          <p>
              <input type = "text" name ="title" placeholder = "Put the title" value ="${title}"></p>
          <p>
              <textarea name = "description" placeholder = "Put the discription">${description}</textarea>
          </p>
          <p>
              <input type = 'submit'>
          </p>
      </form>
      `,
            `<a href="/create">Create</a>
            <a href="/update?id=${title}">Update</a>
            <form action = "/delete_process" method ="post">
              <input type = "hidden" name = "id" value = "${title}">
              <input type = "submit" value = "delete">
            </form>`
          );
        response.writeHead(200);
        response.end(html);
        });
      }); 
    }else if(pathname === `/update_process`){
      var body = '';
      
      request.on('data',function(data){
        body += data;
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;

        fs.rename(`data/${id}`,`data/${title}`,function(err){
          fs.writeFile(`data/${title}`,description,'utf-8',function(err){ // 파일을 저장.
            response.writeHead(302,{location:`/?id=${title}`}); //302는 리다이렉션 시켜라.
            response.end();
          })
        })
      });
    }else if(pathname === `/delete_process`){
      var body = '';
      
      request.on('data',function(data){
        body += data;
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`,function(err){
          response.writeHead(302,{location:`/`}); //302는 리다이렉션 시켜라.
            response.end();
        })
      });
    }else{
      response.writeHead(404);
      response.end('Not Found');
    }
});
console.log(`http://localhost:3000/`)
app.listen(3000);
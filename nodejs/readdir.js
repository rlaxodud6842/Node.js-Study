var testFolder ='../data';
var fs = require('fs');


// 이런식으로 파일 목록 얻을 수 있음.
fs.readdir(testFolder, function(error,filelist){
    console.log(filelist);
})    
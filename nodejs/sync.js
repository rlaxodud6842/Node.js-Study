var fs =require('fs');


//file read sync

// var result = fs.readFileSync('sync_test.txt','utf8');
// console.log(result);

console.log('fender');
fs.readFile('sync_test.txt','utf8',function(err,result){
    console.log(result);
});
console.log('Telecaster');
// 동기는 리턴값으로 받아서 순차적으로 실행되지만
// 비동기는 즉 Sync가 없는놈 탐색을 시작하고, 다음 코드 실행하고 끝난뒤에 실행

//동기 실행결과 fender
            // Mexico
            // Telecaster

//비동기 실행결과 fender
            // Telecaster
            // Mexico
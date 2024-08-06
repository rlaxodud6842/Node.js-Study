var f = function(){
    console.log("hi");
}
console.log(f);
console.log(f());

// 함수도 변수안에 담을 수 있다.

var a = [f];
a[0]();

//배열안에서 원소로 있을때도 꺼내서 함수로 사용가능.

var o = {
    func:f
}

o.func();
//자바 스크립트에서 함수도 변수로 사용가능하다.

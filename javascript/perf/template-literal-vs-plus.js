function measureTime(label, fn) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${label} 실행시간: ${(end - start).toFixed(2)}ms`);
}

const iterations = 5_000_000;
const str1 = "hello";
const str2 = "world";

// 템플릿 리터럴 방식
// 내부적으로 String.prototype.concat() 사용해 문자열을 생성
// 문자열 보간 과정에서 새로운 문자열이 생성되므로 GC 비용 증가 가능성 
// + 연산자에 비해 추가적 연산 및 메모리 할당 발생으로 성능저하 
measureTime("템플릿 리터럴", () => {
    let result = "";
    for (let i = 0; i < iterations; i++) {
        result = `${str1} ${str2}`;
    }
});

// + 연산자 방식
// V8 엔진에서 + 연산자는 내부적으로 문자열 가변 버퍼(Ropes)를 사용해 최적화함
// 즉, 기존 문자열을 수정하지 않고 새로운 문자열을 생성하지 않는 방식으로 연산 수행
// 자주 실행되는 성능이 중요한 코드에서는 +연산자를 사용할것 
measureTime("+ 연산자", () => {
    let result = "";
    for (let i = 0; i < iterations; i++) {
        result = str1 + " " + str2;
    }
});

// 템플릿 리터럴 실행시간: 101.84ms
//     + 연산자 실행시간: 5.47ms
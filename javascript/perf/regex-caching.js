function measureTime(label, fn) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${label} 실행시간: ${(end - start).toFixed(2)}ms`);
}

const testString = "Building a database from 12345!@#$%";
const pattern = /\d+/g; // 숫자를 찾는 정규식

// 정규식을 캐싱하지 않고 매번 생성하는 경우
// new RegExp()는 매번 새로운 정규식 객체 생성, V8엔진이 해당 정규식을 매번 파싱하고 컴파일 해야함
measureTime("RegExp 반복 생성", () => {
    for (let i = 0; i < 1_000_000; i++) {
        new RegExp("\\d+", "g").test(testString); // 매번 새로운 RegExp 객체 생성후 실행
    }
});

// 정규식을 캐싱해 한번만 생성하는 경우
// /\d+/g 정규식 리터럴은 한번만 생성되고 메모리에 유지됨
// CPU 레벨에서 캐싱된 JIT 컴파일된 코드를 재활용할 수도 있음 
measureTime("RegExp 캐싱", () => {
    const cachedRegex = /\d+/g; // 정규식을 미리 한 번만 생성
    for (let i = 0; i < 1_000_000; i++) {
        cachedRegex.test(testString); // 캐싱된 정규식 사용 
    }
});

// RegExp 반복 생성 실행시간: 243.74ms
// RegExp 캐싱 실행시간: 45.44ms
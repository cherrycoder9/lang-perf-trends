function measureTime(label, callback) {
    const start = performance.now();
    callback();
    const end = performance.now();
    console.log(`${label} 실행시간: ${(end - start).toFixed(2)}ms`);
}

// 테스트 데이터 생성
const obj = Object.create({ inheritedKey: "value" }); // 프로토타입에 속한 키 추가 
obj.ownKey = "value"; // 직접 소유한 키 추가

const testIterations = 5_000_000;

// in 연산자를 사용한 테스트
// 최적화된 해시 테이블 활용 
// 따라서 프로토타입 체인을 탐색할지라도 빠른 속도로 조회 
measureTime("in 연산자", () => {
    let count = 0;
    for (let i = 0; i < testIterations; i++) {
        if ("ownKey" in obj) {
            count++;
        }
    }
});

// Object.hasOwn() 사용한 테스트
// 추가적인 검증 및 API 호출이 발생
// 내부적으로 Object.prototype.hasOwnProperty.call() 호출로 오버헤드 
// ES2022에 도입된 최신 API로 최적화 덜되었을 수 있음 
measureTime("Object.hasOwn()", () => {
    let count = 0;
    for (let i = 0; i < testIterations; i++) {
        if (Object.hasOwn(obj, "ownKey")) {
            count++;
        }
    }
});

// in 연산자 실행시간: 8.06ms;
// Object.hasOwn() 실행시간: 75.46ms;

// 그래도 Object.hasOwn()을 써야하는 경우
// Object.prototype이 오염되었을때 in 연산자는 예상치 못한 결과를 낼수 있음
// Object.hasOwn()은 속성이 명확히 객체 자체에 존재하는지 판단할 수 있음 
function benchmarkObjectCreation() {
    console.log('=== 객체 생성 및 키 삽입 속도 비교 ===');

    const iterations = 1_000_000;

    // 일반 객체 리터럴 {}
    let start = performance.now();
    const obj1 = {};
    for (let i = 0; i < iterations; i++) {
        obj1[`key${i}`] = i;
    }
    let end = performance.now();
    console.log(`{} 객체 키 삽입 시간: ${(end - start).toFixed(2)}ms`);
    // 1149ms

    // Object.create(null)
    // 프로토타입 체인이 제거되어 추가적인 메서드 확인 과정이 필요 없기 때문 
    // 프로토타입 체인이 없는 객체를 생성하기 때문에 hasOwnProperty 등의 기본 메서드를 상속받지 않음
    // 이 방식은 해시맵처럼 키-값 저장을 최적화할 때 유리함 
    // hasOwnProperty() 같은 기본 메서드가 없으므로 in 연산자를 사용해야 함 
    // 클래스 기반 개발에서는 상속과 프로토타입을 활용하는게 일반적이므로 사용 빈도가 낮음 
    start = performance.now();
    const obj2 = Object.create(null);
    for (let i = 0; i < iterations; i++) {
        obj2[`key${i}`] = i;
    }
    end = performance.now();
    console.log(`Object.create(null) 키 삽입 시간: ${(end - start).toFixed(2)}ms`);
    // 631ms
}

benchmarkObjectCreation();
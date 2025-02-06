function measureTime(label, fn) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${label} 실행시간: ${(end - start).toFixed(2)}ms`);
}

// 객체와 Map 검색 성능 비교 
function testObjectVsMap() {
    const objectData = {};
    const mapData = new Map();
    const testSize = 500000;

    // 데이터 삽입 (객체와 Map에 동일한 키-값 저장)
    for (let i = 0; i < testSize; i++) {
        objectData[`key${i}`] = i;
        mapData.set(`key${i}`, i);
    }

    // 객체에서 검색
    // 해시 테이블 기반이지만 프로토타입 체인 때문에 검색시 추가 비용 발생
    // 내부적으로 문자열 기반 키 변환 과정이 필요
    // Object.hasOwnProperty() 사용시 프로토타입 체인 검색을 피할 수 있지만
    // 여전히 Map보다는 최적화되지 않음
    // 해시 충돌 발생시 V8엔진이 이를 처리하는데 추가 연산 수행
    measureTime("객체 검색", () => {
        for (let i = 0; i < testSize; i++) {
            const _ = objectData[`key${i}`];
        }
    });

    // Map에서 검색
    // 별도의 해시 테이블을 내부적으로 사용해 키-값 조회 성능을 O(1)에 가깝게 유지
    measureTime("Map 검색", () => {
        for (let i = 0; i < testSize; i++) {
            const _ = mapData.get(`key${i}`);
        }
    });
}

// 배열과 Set 검색 성능 비교 
function testArrayVsSet() {
    const arrayData = [];
    const setData = new Set();
    const testSize = 30000;

    // 데이터 삽입 (배열과 Set에 동일한 값 저장)
    for (let i = 0; i < testSize; i++) {
        arrayData.push(i);
        setData.add(i);
    }

    // 배열에서 검색 (includes 사용)
    // array.includes(value) 호출시 배열 각 요소를 순차 탐색해야 함 O(n)
    // 요소 개수가 많아질수록 탐색 시간이 선형적으로 증가 
    measureTime("배열 검색", () => {
        for (let i = 0; i < testSize; i++) {
            const _ = arrayData.includes(i);
        }
    });

    // Set에서 검색 (has 사용)
    // 내부적으로 해시 테이블을 사용해 has(value) 연산이 평균적으로 O(1) 성능을 냄
    measureTime("Set 검색", () => {
        for (let i = 0; i < testSize; i++) {
            const _ = setData.has(i);
        }
    });
}

testObjectVsMap();
testArrayVsSet();

// 객체 검색 실행시간: 244.40ms
// Map 검색 실행시간: 24.57ms
// 배열 검색 실행시간: 533.71ms
// Set 검색 실행시간: 2.04ms
// 데이터 검색 이 많다면 Map과 Set을 사용해야 함
// 키-값 저장이 많고 검색이 중요하면 Map을 써라
// 리스트에서 중복 제거와 빠른 검색이 필요하면 Set을 써라
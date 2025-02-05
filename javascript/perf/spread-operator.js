const ARRAY_SIZE = 120_000;

// 데이터를 포함한 배열 생성
const array1 = Array.from({ length: ARRAY_SIZE }, (_, i) => i);
const array2 = Array.from({ length: ARRAY_SIZE }, (_, i) => i + ARRAY_SIZE);

function measureTime(label, callback) {
    const start = performance.now();
    callback();
    const end = performance.now();
    console.log(`${label}: ${(end - start).toFixed(2)} ms`);
}

// 스프레드 연산자(...) 사용
measureTime("스프레드 연산자", () => {
    const result = [...array1, ...array2]; // 배열 병합
});
// 7.19 ms

// concat() 메서드 사용
measureTime("concat() 메서드", () => {
    const result = array1.concat(array2); // 배열 병합
});
// 0.91 ms

// push()로 다중 요소 추가 
measureTime("push() + ...", () => {
    const result = [...array1]; // 새로운 배열 생성 (원본 유지)
    result.push(...array2); // push() 사용해 병합 
});
// 5.02 ms

// for문 + push() 사용 
measureTime("반복문 + push()", () => {
    const result = [...array1];
    for (let i = 0; i < array2.length; i++) {
        result.push(array2[i]);
    }
});
// 3.67 ms


// 스프레드 연산자(...)의 비용 문제
// const result = [...arr1, ...arr2]의 경우 기존 배열을 펼친 후 새로운 배열을 생성함
// 이 과정에서 각 배열 요소를 하나씩 복사하고 새로운 메모리를 할당하는 비용 추가됨
// V8 엔진 메모리 관리 방식상 크기가 큰 배열 처리시 GC부담 증가

// concat()은 내부적으로 최적화된 C++ 엔진 코드를 사용해 배열 병합
// arr1.concat(arr2)를 하면 V8 엔진에서 미리 최적화된 병합 알고리즘을 활용함
// 스프레드 연산자처럼 모든 요소를 복사하는 과정이 생략되며 배열을 효율적으로 처리함

// push()를 활용한 방식은 기존 배열을 변경하면서 새로운 요소를 추가하므로 불필요한 메모리 재할당을 방지함
// 하지만 개별 요소를 하나씩 추가해야 하기 때문에 함수 호출 비용이 발생함

// for문 + push() 방식은 concat()보다 느리지만 메모리 사용량을 가장 아낄 수 있는 방식임 
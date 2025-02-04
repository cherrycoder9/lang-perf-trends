function measureTime(callback) {
    const start = performance.now();
    callback();
    const end = performance.now();
    return end - start;
}

// 테스트할 배열 크기
const testSize = 5_000_000;

// push() 방식
// push는 내부적으로 함수 호출이 발생하며 this 컨텍스트를 확인하는 과정이 포함됨
// 배열의 길이를 직접 증가시키고 추가적인 에러 핸들링 및 검증 과정이 들어감
// 매개변수 개수 검사도 수행해야 함 
const arrayPush = [];
const pushTime = measureTime(() => {
    for (let i = 0; i < testSize; i++) {
        arrayPush.push(i);
    }
});
console.log(`push() 방식: ${pushTime.toFixed(2)} ms`);
// 112.39 ms

// arr[arr.length] 방식
// 단순한 배열 인덱스 할당 연산이라 함수 호출 오버헤드가 없음
// this 바인딩을 확인할 필요 없음
// 추가적인 매개변수 검사 및 내부 검증 과정 필요없음 
const arrayBracket = [];
const bracketTime = measureTime(() => {
    for (let i = 0; i < testSize; i++) {
        arrayBracket[arrayBracket.length] = i;
    }
});
console.log(`arr[arr.length] 방식: ${bracketTime.toFixed(2)} ms`);
// 67.50 ms
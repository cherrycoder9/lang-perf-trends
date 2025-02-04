const ARRAY_SIZE = 1_000_000;
const numbers = Array.from({ length: ARRAY_SIZE }, (_, i) => i + 1);

// map()을 사용한 배열 변환
// map()은 내부적으로 콜백 함수를 반복 호출해 새로운 배열을 생성함
// 매번 새로운 함수 컨텍스트가 생성되어 오버헤드 발생
// 추가적인 메모리 사용과 GC 부담이 발생 
console.time("map()");
const squaredUsingMap = numbers.map(num => num * num);
console.timeEnd("map()");
// 106 ms

// for 반복문을 사용한 배열 변환
// 콜백 호출 비용이 없음 
// for 문에서 new Array(size)를 활용하면 메모리 재할당 최소화로 GC부담이 줄어듦 
console.time("for loop");
const squaredUsingFor = new Array(ARRAY_SIZE);
for (let i = 0; i < ARRAY_SIZE; i++) {
    squaredUsingFor[i] = numbers[i] * numbers[i];
}
console.timeEnd("for loop");
// 14 ms 
const ITERATIONS = 1_000_000;

console.time("연산자 연결");
let str = "";
for (let i = 0; i < ITERATIONS; i++) {
    str += "a";
}
console.timeEnd("연산자 연결");
// str += "a" 방식은 매 반복마다 새로운 문자열을 생성하고 기존 문자열과 결합한 새로운 메모리 공간 할당해야 함
// JavaScript 문자열은 불변이므로 기존 문자열을 직접 수정할 수 없고, 새로운 문자열을 만들어야 하므로 성능 저하 

console.time("join()");
const arr = new Array(ITERATIONS);
for (let i = 0; i < ITERATIONS; i++) {
    arr[i] = "a";
}
const result = arr.join("");
console.timeEnd("join()");
// 배열은 가변 데이터 구조이므로 개별 요소를 추가하는 동안 새로운 메모리를 계속 할당하지 않아도 됨
// 최종적으로 arr.join('')을 호출할 때만 한번의 연산으로 모든 요소를 병합하기 때문에 성능이 뛰어남

// 연산자 연결: 72.191ms;
// join(): 20.432ms;
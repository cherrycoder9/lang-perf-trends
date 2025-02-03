// forEach() vs for 반복문
// 배열 반복시 forEach() 가독성이 더 낫지만
// 내부적으로 콜백 함수를 호출해야 하므로 오버헤드 발생함

const arr = Array.from({ length: 1_000_000 }, (_, i) => i);

console.time("forEach");
let sum1 = 0;
arr.forEach(num => {
    sum1 += num;
});
console.timeEnd("forEach");
// 26.342ms

console.time("for");
let sum2 = 0;
for (let i = 0; i < arr.length; i++) {
    sum2 += arr[i];
}
console.timeEnd("for");
// 6.837ms
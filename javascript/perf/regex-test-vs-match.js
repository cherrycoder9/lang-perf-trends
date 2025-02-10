const text = "학교종이 땡땡땡 어서모이자 0123456 ABCDEF!!";
const regex = /\d+/g; // 숫자를 찾는 정규식

console.time("match");
// match()는 전체 문자열을 탐색해 배열을 반환
// 따라서 여러개의 매칭 결과를 찾을 경우 더 많은 연산 필요
// 특히 g 플래그(global) 있을 경우 전체 문자열을 검사해야 하므로 성능이 더 느려짐
for (let i = 0; i < 3_000_000; i++) {
    text.match(regex);
}
console.timeEnd("match");

console.time("test");
// test()는 첫 번째 매칭 여부만 확인
// 문자열에서 첫번째 매칭이 발견되면 즉시 true, false 반환
// 결과값을 배열이 아닌 단순한 boolean으로 반환하므로 메모리 할당이 적고 연산속도 빠름
for (let i = 0; i < 3_000_000; i++) {
    regex.test(text);
}
console.timeEnd("test");

// match: 505.328ms;
// test: 128.596ms;

// 문자열이 특정 패턴을 포함하는지만 확인하는 경우 test() 사용
// 매칭된 결과가 필요할 경우에만 match() 사용

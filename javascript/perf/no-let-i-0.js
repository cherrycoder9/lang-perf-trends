// 기존 방식, 평균 5.0ms
const arr = new Array(1_000_000).fill(0);

console.time('증가 반복문');
for (let i = 0; i < arr.length; i++) {
    arr[i] += 1;
}
console.timeEnd('증가 반복문');

// arr.length가 반복마다 평가됨 -> arr.length는 변하지 않지만 매 반복마다 참조해 성능 저하
// 루프가 순방향으로 진행되므로 CPU 캐시 최적화가 덜 적용될 가능성 있음



// 최적화된 방식, 평균 4.2ms
const arr2 = new Array(1_000_000).fill(0);

console.time('감소 반복문');
for (let i = arr2.length; i--;) {
    arr2[i] += 1;
}
console.timeEnd('감소 반복문');

// arr.length를 한 번만 읽어 변수 i에 할당 -> 매 반복마다 배열 길이를 재평가하지 않음
// i--를 이용해 역순으로 접근 -> 일부 CPU 아키텍처에서 메모리 캐싱이 더 유리함
// 루프 종료 조건이 비교 여산을 최소화함 (i--가 false가 되는 순간 종료)

// let i = arr.length; ; i--) 이런식으로 조건식을 중간에 두게 되면
// 내부에 if (i < 0) break; 라인을 추가해야 하는데 오히려 break 때문에 추가적 분기 발생해 성능 이점이 없음

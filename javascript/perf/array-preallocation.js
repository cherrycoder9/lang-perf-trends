// 배열을 동적으로 확장하면 내부적으로 재할당과 복사가 발생할 수 있음
// 크기를 미리 지정하면 배열이 초기부터 충분한 공간을 확보하므로 메모리 할당이 줄어들어 성능 향상

const start1 = performance.now();

// 배열 크기 미리 지정 
const size = 3_000_000;
const preAllocatedArray = new Array(size);
for (let i = 0; i < size; i++) {
    preAllocatedArray[i] = i;
}

const end1 = performance.now();
console.log(`배열 크기 미리 지정: ${(end1 - start1).toFixed(2)}ms`);
// 12.50ms

// 배열 크기 동적 확장
const start2 = performance.now();
const dynamicArray = [];
for (let i = 0; i < size; i++) {
    dynamicArray.push(i);
}

const end2 = performance.now();
console.log(`배열 크기 동적 확장: ${(end2 - start2).toFixed(2)}ms`);
// 67.35ms


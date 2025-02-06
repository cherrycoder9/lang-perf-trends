const largeArray = Array.from({ length: 10_000_000 }, (_, i) => i);

function measureTime(callback, label) {
    const start = performance.now();
    const result = callback();
    const end = performance.now();
    console.log(`${label} 실행 시간: ${(end - start).toFixed(2)}ms`);
    return result;
}

// filter() 이용한 배열 필터링
// 내부적으로 새로운 배열을 생성해 기존 배열을 반복하면서 조건을 만족하는 요소를 추가함 
// 메모리 할당이 많아짐 
const filterMethod = measureTime(() => {
    return largeArray.filter(num => num % 2 === 0); // 짝수만 필터링 
}, 'filter');

// reduce() 이용한 배열 필터링
// 단일 배열을 재사용해 새로운 배열을 동적으로 생성하므로 메모리 절약 가능 
const reduceMethod = measureTime(() => {
    // 짝수가 절반이라 가정 
    const estimatedSize = Math.floor(largeArray.length / 2);
    // push를 사용하지 않고 메모리 재할당을 최소화함 
    const result = new Array(estimatedSize); // 예상 크기만큼 배열 미리 할당
    let index = 0;

    // CPU는 데이터를 메모리에서 가져올때 근처의 데이터를 함께 캐싱하는데
    // i++ 방식이 배열의 낮은 인덱스부터 높은 인덱스로 순차적 접근하기 때문에 CPU 친화적 방식임
    // 하지만 조건비교 연산을 뺀 것이 성능에 더 큰 이득이라 i-- 사용함 
    // JS엔진의 최적화 및 브랜치 예측이 개입해서 i-- 방식이 더 빠를수도 있음. 
    // 언어마다 다를 수 있기 때문에 비교 실험해봐야 할듯?
    for (let i = largeArray.length; i--;) {
        if (largeArray[i] % 2 === 0) {
            result[index] = largeArray[i];
            index++;
        }

    }

    return result.slice(0, index); // 최종적으로 실제 데이터 크기에 맞게 잘라냄 
}, 'reduce(for)');

const reduceMethod2 = measureTime(() => {
    // 짝수가 절반이라 가정 
    const estimatedSize = Math.floor(largeArray.length / 2);
    // push를 사용하지 않고 메모리 재할당을 최소화함 
    const result = new Array(estimatedSize); // 예상 크기만큼 배열 미리 할당
    let i = largeArray.length, index = 0;

    while (i--) { // let i = largeArray.length; i--; 방식 사용하여 반복문 최적화
        if (largeArray[i] % 2 === 0) {
            result[index] = largeArray[i]; // push() 대신 직접 배열에 값 할당
            index++;
        }
    }

    return result.slice(0, index); // 최종적으로 실제 데이터 크기에 맞게 잘라냄 
}, 'reduce(while)');

// 배열 크기가 100만개일때
// filter 실행 시간: 21.22ms;
// reduce(for) 실행 시간: 9.60ms;
// reduce(while) 실행 시간: 7.83ms;

// 배열 크기가 1000만개일때
// filter 실행 시간: 195.36ms;
// reduce(for) 실행 시간: 69.19ms;
// reduce(while) 실행 시간: 118.13ms;

// 배열 크기 커질수록 while이 for보다 느려짐
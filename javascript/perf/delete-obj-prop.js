// delete obj.prop
// 객체에서 프로퍼티를 완전히 제거하는 연산
// V8에서 히든 클래스 최적화를 깨뜨릴 가능성이 있음

// obj[prop] = undefined
// 프로퍼티를 제거하는 대신 해당 값을 undefined로 설정해 구조 유지
// 히든 클래스를 변경하지 않아 성능 저하를 방지할 수 있음

function measureExecutionTime(label, callback) {
    const start = performance.now();
    callback();
    const end = performance.now();
    console.log(`${label}: ${end - start}ms`);
}

const testSize = 1_000_000;
const obj1 = {};
const obj2 = {};

for (let i = 0; i < testSize; i++) {
    obj1[`key${i}`] = i;
    obj2[`key${i}`] = i;
}

// delete obj[prop]
measureExecutionTime("Using delete obj[prop]", () => {
    for (let i = 0; i < testSize; i++) {
        delete obj1[`key${i}`];
    }
});
// 601ms

// obj[prop] = undefined 
measureExecutionTime("Using obj[prop]", () => {
    for (let i = 0; i < testSize; i++) {
        obj2[`key${i}`] = undefined;
    }
});
// 491ms

// 객체 크기 비교
console.log('obj1 (after delete):', Object.keys(obj1).length); // 0
console.log('obj2 (after setting undefined):', Object.keys(obj2).length); // 1000000

// 하지만 언제 delete를 써야 할까?
// for...in 또는 Object.keys()로 객체를 순회할때 삭제된 항목을 완전히 없애고 싶을때
// 메모리를 줄여야 하는 경우 

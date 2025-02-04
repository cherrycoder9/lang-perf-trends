// 과거엔 깊은 복사를 위해 JSON.parse(JSON.stringify(obj))를 사용했지만 문제점이 있음
// 1. 함수 및 undefined 값이 손실됨
// 2. 순환 참조 객체를 복사할 수 없음
// 3. Date, Map, Set, RegExp 등의 특수 객체가 정상적으로 복사되지 않음
// structuredClone()은 이런 문제를 해결해 안전하고 간편하게 깊은 복사 수행

// 원본 객체 생성
const original = {
    name: "Starter",
    age: 30,
    skills: ["JavaScript", "React"],
    date: new Date(), // JSON 변환시 문자열로 변환됨
    nested: { level: 1 }, // 중첩 객체 (deep copy 필요)
    // func: function () { return "Hello"; }, // JSON 방식에선 복사 불가
    func: () => { return "Hello"; }, // JSON 방식에선 복사 불가
    undefinedValue: undefined, // JSON 방식에선 사라짐
    set: new Set([1, 2, 3]), // JSON.stringify()는 Set객체를 직렬화 못함
};

// JSON 방식 
const jsonCopy = JSON.parse(JSON.stringify(original));

console.log('JSON 방식 결과:');
console.log(jsonCopy);

// structuredClone 방식
// 함수 속성을 제거하고 복사해야 함. 아래처럼 하려면 객체에 함수속성이 없어야 함.
// 또는 lodash의 cloneDeep() 사용하면 함수까지 포함해 안전하게 깊은 복사 가능 

// const cloned = structuredClone(original);
const { func, ...safeOriginal } = original;
const cloned = structuredClone(safeOriginal);

// 복사 후 수동으로 함수 추가
cloned.func = original.func;

console.log('\nstructuredClone 방식 결과:');
console.log(cloned);
console.log(cloned.func());



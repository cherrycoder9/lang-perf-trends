// 비효율적인 코드 (반복적으로 객체 프로퍼티 접근)
const obj = { value: 10 };

console.time('반복적인 객체 프로퍼티 접근');
for (let i = 1_000_000; i--;) {
    // 매번 obj.value 접근함 
    // 매번 객체의 속성을 확인하는 과정이 추가됨 (성능 저하)
    obj.value += 1;
}
console.log(obj.value);
console.timeEnd('반복적인 객체 프로퍼티 접근');

// 최적화된 코드 (객체 프로퍼티를 변수에 캐싱)
// 객체의 깊이가 깊거나 프로퍼티 접근이 많을수록 캐싱의 효과가 커짐 
const obj2 = { value: 10 };
let cachedValue = obj2.value; // 변수에 저장해 캐싱 
console.time('변수에서 연산 수행');
for (let i = 1_000_000; i--;) {
    cachedValue += 1;
}
obj2.value = cachedValue;
console.log(obj2.value);
console.timeEnd('변수에서 연산 수행');

// 반복적인 객체 프로퍼티 접근: 14.793ms
// 변수에서 연산 수행: 2.656ms

// 반복문 내에서는 객체 프로퍼티를 캐싱해 사용할 것
// 특히 중첩된 객체의 프로퍼티 접근 시 효과적
// V8 최적화를 방해하는 요소와 함께 사용하지 않도록 주의 (delete, arguments 등)

// delete 연산자 사용: V8 엔진은 성능 최적화를 위해 히든 클래스를 사용해 객체 속성을 고정된 구조로 유지하려 함
// 그런데 delete 연산자를 사용하면, 객체 구조가 변하면서 최적화된 히든 클래스가 깨지고 메타데이터 재평가 과정이 발생해 성능이 저하됨
// 대안: delete 대신 undefined 할당

// V8은 일반적 함수 호출을 최적화하기 위해 스택에서 인자를 직접 관리하는데
// arguments 객체를 사용하면 힙 메모리 할당이 발생하고 V8이 이걸 추적해야 하므로 성능 저하됨
// arguments 객체는 JS의 내장 기본 객체임
// 일반적 객체와는 다르게, 함수 내에서만 접근 가능하고 몇가지 특이한 동작을 함
// 함수 내부에서 자동으로 생성되는 유사 배열 객체
// 모든 함수에서 사용할 수 있지만, 화살표 함수에는 존재하지 않음
// 함수에 전달된 인수를 배열처럼 다룰 수 있음
// arguments.length를 통해 인자 개수를 확인할 수 있음
// arguments[0], arguments[1]처럼 인덱스로 접근 가능하지만 진짜 배열이 아님
// 배열이 아니므로 map, filter, reduce 등의 배열 메서드 사용 못함
// 배열로 변환하려면 Array.from이나 spread 문법을 써야 함
// 화살표 함수에서는 arguments 대신 ...args 를 사용하면 됨 
const iterations = 7000000;

const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { d: 4, e: 5, f: 6 };

console.time("스프레드 연산자");
for (let i = 0; i < iterations; i++) {
    const merged = { ...obj1, ...obj2 };
}
console.timeEnd("스프레드 연산자");

console.time("Object.assign()");
for (let i = 0; i < iterations; i++) {
    const merged = Object.assign({}, obj1, obj2);
}
console.timeEnd("Object.assign()");

// 스프레드 연산자: 766.631ms;
// Object.assign(): 1.069s;
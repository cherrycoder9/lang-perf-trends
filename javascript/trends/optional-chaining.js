// (옵셔널 체이닝) ?. 연산자는 객체 속성을 안전하게 접근할 수 있게 함
// 객체 특정 속성이 undefined 또는 null일 때도 에러 없이 undefined 반환해 런타임 오류 방지
// 기존에는 && 연산자를 사용해 일일이 체크했어야 했던 코드를 간결하게 만들 수 있음 

// 기본적인 옵셔널 체이닝 사용
// 사용자 객체 (일부 사용자들은 주소 정보가 없을 수 있음)
const user1 = {
    name: "김철수",
    address: {
        city: "서울",
        street: "강남대로 123",
    },
};

const user2 = {
    name: "이영희",
    // address 속성 없음
};

console.log(user1.address.city); // 서울
// console.log(user2.address.city); // 에러 발생 
console.log(user1.address?.city); // 서울
console.log(user2.address?.city); // undefined


// 함수 호출에서 옵셔널 체이닝 사용 
const user = {
    name: "박지성",
    greet: () => "안녕하세요!",
};

console.log(user.greet()); // 안녕하세요!
// ?.()를 사용하면 해당 함수가 존재할때만 실행되고 없으면 undefined를 반환함 
console.log(user.greet?.()); // 안녕하세요!
console.log(user.hello?.()); // undefined


// 배열 요소에 옵셔널 체이닝 적용 
const users = [
    { name: "김철수", age: 30 },
    { name: "이영희", } // age 속성 없음 
];

console.log(users[0]?.age); // 30
console.log(users[1]?.age); // undefined
console.log(users[2]?.age); // undefined (배열 범위 벗어나도 안전)


// 깊은 객체 구조에서 사용법
const company = {
    name: "Tesla",
    ceo: {
        name: "일런머스크",
        contact: {
            email: "ceo@tesla.com",
        },
    },
};

console.log(company.ceo?.contact?.email); // ceo@tesla.com
console.log(company.ceo?.contact?.phone); // undefined
console.log(company.cto?.contact?.email); // undefined


// 객체의 메서드가 존재하지 않을 경우 
const person = {
    name: "홍길동",
    getAge: function () {
        return 25;
    },
};

console.log(person.getAge?.()); // 25
console.log(person.getSalary?.()); // undefined




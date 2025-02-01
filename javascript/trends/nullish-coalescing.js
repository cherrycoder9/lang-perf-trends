// 과거에는 OR연산자(||)를 사용해 기본값을 설정하는 방법이 일반적이었음
const oldValue = "" || "기본값";
console.log(false == "");
// 예상과 다르게 기본값이 출력되는데, 빈 문자열이 false 판정이고 OR연산이라서 다음 값을 대입하기 때문
// 빈 문자열, 숫자 0, false도 기본값으로 대체됨 
console.log(oldValue); // 기본값

// 최신 방식은 ?? 연산자를 사용해 null 또는 undefined인 경우에만 기본값 적용 
const newValue1 = null ?? "기본값";
console.log(newValue1); // 기본값

const newValue2 = undefined ?? "기본값";
console.log(newValue2); // 기본값 

const newValue3 = "" ?? "기본값";
console.log(newValue3); // 빈 문자열

const newValue4 = 0 ?? "기본값";
console.log(newValue4); // 0

const newValue5 = false ?? "기본값";
console.log(newValue5); // false 

function getUserName(userInput) {
    return userInput ?? "Guest"; // userInput이 null 또는 undefined 경우에만 "Guest" 반환
}

console.log(getUserName(null)); // Guest
console.log(getUserName(undefined)); // Guest
console.log(getUserName("하사비스")); // 하사비스
console.log(getUserName("")); // 빈문자열
console.log(getUserName(0)); // 0
console.log(getUserName(false)); // false

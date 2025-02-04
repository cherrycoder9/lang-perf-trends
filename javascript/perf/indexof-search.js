function measureTime(fn, label) {
    const start = performance.now();
    fn(); // 실행할 함수 호출
    const end = performance.now();
    console.log(`${label} 실행 시간: ${(end - start).toFixed(2)} ms`);
}

const testString = "It always amazes me how much some people are willing to give.";
const searchWord = "willing";

// 정규 표현식 방식
// V8 엔진이 내부적으로 정규 표현식 파서를 거쳐 패턴을 분석하고 최적화하는 과정을 거침
// 이 과정에서 NFA(비결정적 유한 오토마타)를 사용해 검색이 수행되고 최악의 경우 백트래킹이 발생할 수 있음
function regexSearch() {
    for (let i = 0; i < 1000000; i++) {
        /consectetur/.test(testString);
    }
}

// indexOf() 방식
// 단순히 문자열을 순차적으로 탐색하면서 동일한 부분 문자열을 찾으면 즉시 종료 
// 시간 복잡도 O(N)으로 정규 표현식보다 효율적으로 작동 
function indexOfSearch() {
    for (let i = 0; i < 1000000; i++) {
        testString.indexOf(searchWord) !== -1;
    }
}

measureTime(regexSearch, "정규 표현식 겸색"); // 90.08ms
measureTime(indexOfSearch, "indexOf() 검색"); // 2.74ms
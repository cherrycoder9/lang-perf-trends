// ES2022 이전에는 비동기 함수 내부에서만 await를 사용할 수 있었기에
// 즉시 실행 함수(IIFE)를 사용해 비동기 코드를 실행해야 했음
(async function () {
    try {
        const response = await fetch('https://dummyjson.com/test');
        const data = await response.json();
        console.log('데이터 로드 완료:', data);
    } catch (error) {
        console.error('데이터 로드 실패:', error);
    }
})();

// ES2022부터는 최상위 레벨에서 await 직접 사용할 수 있음
try {
    const response = await fetch('https://dummyjson.com/test');
    const data = await response.json();
    console.log('데이터 로드 완료:', data);
} catch (error) {
    console.error('데이터 로드 실패:', error);
}
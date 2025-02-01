const IS_DEV = true;

function logDebug(...args) {
    if (IS_DEV) {
        // 브라우저 개발자 도구에서 필터링 가능하며 필요할 때만 확인할 수 있음 
        //debug()는 개발자 도구가 열려 있지 않으면 실행되지 않으므로 배포 환경에선 성능 영향 거의 없음
        console.debug('[DEBUG]', ...args);
    }
}

// 개발과 배포 환경에서 모두 출력되므로 불필요한 로그가 남을 수 있음
// log() 내부에서 객체 변환 또는 연산이 포함될 경우 특히 성능 저하
console.log('항상 출력');
logDebug('개발 환경에서만 출력');

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // 개발 환경에서만 API 응답 출력
        logDebug('API 응답 데이터:', data);

        return data;
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
    }
}

fetchData('https://dummyjson.com/test');
// 과거에는 XMLHttpRequest 또는 fetch를 사용할 때 요청을 취소하는 표준적인 방법이 없었음
// AbortController가 도입되면서 효율적으로 네트워크 요청 취소가 가능해짐
// 1. 불필요한 네트워크 요청 차단 -> 사용자가 빠르게 페이지를 이동할 경우, 이전 요청을 낭비하지 않음
// 2. 메모리 최적화 -> 오래된 요청이 유지되지 않도록 적절히 해제
// 3. UX 개선 -> 사용자가 버튼을 누른 후 다시 취소하는 동작을 구현하기 쉬움
// 4. 이전 방식(XHR.abort())보다 현대적인 fetch와 호환 가능

const controller = new AbortController();
const signal = controller.signal; // 취소 신호 가져오기

async function fetchData() {
    try {
        console.log('데이터 요청 시작...');

        // 0.5초후 요청 자동 취소
        const timeoutId = setTimeout(() => {
            controller.abort(); // 요청 취소 
            console.log('요청 시간이 초과되어 취소되었습니다.');
        }, 100);
        // }, 2500);

        // fetch 요청시 signal 전달해 취소 가능하게 설정
        const response = await fetch('https://dummyjson.com/test', { signal });

        // 정상적으로 데이터가 도착하면 타임아웃을 취소함
        clearTimeout(timeoutId);

        // AbortError가 catch로 넘어가면 아래 코드 실행 안됨
        const data = await response.json();
        console.log('데이터 받아옴:', data);
    } catch (error) {
        if (error.name === "AbortError") {
            console.log('요청이 취소되었습니다.');
        } else {
            console.error('요청 중 오류 발생:', error);
        }
    }
}

fetchData();

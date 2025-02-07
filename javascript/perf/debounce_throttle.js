// 실행 시간 측정 유틸리티 함수
function measureTime(label, callback) {
    const start = performance.now();
    callback();
    const end = performance.now();
    console.log(`${label} 실행 시간: ${(end - start).toFixed(2)}ms`);
}

// Debounce 함수: 지정된 시간(ms) 동안 추가 호출이 없을 때 실행
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer); // 기존 타이머 제거
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle 함수: 지정된 시간(ms) 간격으로 실행 제한
function throttle(func, interval) {
    let lastTime = 0;
    return function (...args) {
        const now = performance.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            func.apply(this, args);
        }
    };
}

// 예제용 핸들러 함수 (실제 input 대신 콘솔 출력)
function handleInput(value) {
    console.log(`Input 이벤트 처리: ${value}`);
}

// Debounce 적용 (300ms)
const debouncedInputHandler = debounce(handleInput, 300);

// Throttle 적용 (300ms)
const throttledInputHandler = throttle(handleInput, 300);

// 성능 테스트: 동일한 입력 이벤트 연속 발생
function simulateTyping(handler, label) {
    measureTime(label, () => {
        for (let i = 0; i < 20; i++) {
            handler("테스트 입력값");
        }
    });
}

// 테스트 실행
setTimeout(() => {
    simulateTyping(handleInput, "기본 Input 이벤트");
    // 기본 실행 (handleInput)
    // 이벤트가 발생할 때마다 즉시 실행됨
    // 10번 입력시, 10번 모두 실행 -> 가장 느림
    // 문제점: 불필요한 연산이 너무 많음, CPU 부하, 렌더링 성능 저하 
    simulateTyping(debouncedInputHandler, "Debounce 적용");
    // 연속 입력이 끝나고 300ms뒤 단 한번만 실행
    // 10번 입력해도 최종 1회 실행됨 -> 가장 적은 실행 횟수
    // 즉각적인 반응이 필요할땐 부적절함 
    // 서버 API 호출 최적화(search input, autocomplete)에 적합 
    simulateTyping(throttledInputHandler, "Throttle 적용");
    // 300ms마다 한번씩 실행됨 
    // 실시간 반응이 중요한 경우(scroll, mousemove, resize)에 적합
}, 3000);

// 기본 Input 이벤트 실행 시간: 20.96ms
// Debounce 적용 실행 시간: 0.76ms
// Throttle 적용 실행 시간: 0.46ms
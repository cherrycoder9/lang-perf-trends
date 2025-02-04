// ResizeObserver를 활용해 요소 크기 변경 감지
// 최신 웹 개발에서는 MutationObserver 대신 ResizeObserver 사용을 선호
// 크기 변화만 감지해 불필요한 DOM 관찰을 방지
// display: none 처리된 요소도 변화 감지 가능
// 반응형 UI에서 동적으로 크기 조정되는 요소 추적에 적합

// 크기 변화를 감지할 요소
const targetElement = document.getElementById('resize-target');

// ResizeObserver 인스턴스 생성
const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        // contentRect는 요소의 새로운 크기를 제공하는 속성
        const { width, height } = entry.contentRect;
        console.log(`요소 크기 변경 감지됨: ${width}px x ${height}px`);

        // 크기에 따라 동적으로 스타일 조정
        if (width < 300) {
            targetElement.style.backgroundColor = 'lightcoral';
        } else {
            targetElement.style.backgroundColor = 'lightblue';
        }
    }
});

// 감시 시작
resizeObserver.observe(targetElement);

// 2초 후에 요소 크기 변경
setTimeout(() => {
    targetElement.style.width = '250px';
    console.log('요소 크기 변경됨 (너비 250px)');
}, 2000);

// 기존 window.onresize 방식은 브라우저 창 전체 크기 변경만 감지 가능했음
// MutationObserver는 속성 변경도 감지하지만, 성능상 불필요한 감지를 수행
// display: none 상태였다가 나타난 경우도 감지 가능
// CSS에 의해 변경된 크기도 정확히 추적 가능
// 별도의 이벤트 리스너 추가 없이 observe()만 호출하면 감지 가능
// 여러 개의 요소를 한번에 감시할 수도 있음
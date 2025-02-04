// 모든 'lazy-load' 클래스를 가진 이미지 요소를 선택
const images = document.querySelectorAll('img.lazy-load');

// IntersectionObserver 설정
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // 요소가 화면에 보이면 로딩 수행 
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // data-src에 있던 원본 이미지 URL을 src로 변경
            img.classList.remove('lazy-load'); // 클래스 제거 (필수 아님)
            observer.unobserve(img); // 더이상 감지할 필요 없으므로 unobserve 처리
        }
    });
}, {
    root: null, // 감지 기준 요소 설정 (뷰포트 또는 특정 요소)
    rootMargin: '0px', // 감지 영역의 여백 조정 (양수=확장, 음수=축소)
    threshold: 0.1, // 요소가 root와 겹치는 비율에 따라 트리거
    // 이외에도 trackVisibility, delay, thresholdRatio 있음 (총 6개)
    // trackVisibility: false, // 투명한 요소도 감지할지 여부
    // delay: 0, // 감지 이벤트가 실행되기 전 대기 시간 (ms)
    // thresholdRatio: 0.3, // 요소의 특정 부분이 보일 때 감지
});

// 모든 대상 이미지에 대해 Observer 적용
images.forEach(img => observer.observe(img));

// 과거에는 onscroll 이벤트를 사용해 lazy loading을 구현했음
// 하지만 그 방식은 성능 이슈가 있음
// 스크롤할 때마다 브라우저가 모든 이미지 위치를 계산해야 했음
// 불필요한 이벤트 핸들러 호출이 많아져 성능 저하 및 부드럽지 않은 스크롤링 초래

// IntersectionObserver 장점
// 성능 최적화 -> 브라우저 네이티브 API가 효율적으로 동작해 불필요한 연산을 줄임
// 간결한 코드 -> 이벤트 리스너를 직접 관리할 필요 없이 Observer 하나로 감지 가능
// 유연한 동작 -> rootMargin, threshold를 통해 원하는 시점에 로딩 제어 가능
// 더 나은 사용자 경험 -> 불필요한 리소스 로딩을 줄이고 필요한 시점에 이미지를 불러와 UX 개선

// 과거 스타일
window.addEventListener('scroll', function () {
    document.querySelectorAll('img.lazy-load').forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-load');
        }
    });
});

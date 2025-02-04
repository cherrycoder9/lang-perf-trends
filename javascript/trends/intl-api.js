// 과거에는 다국어 처리를 할 때 보통 switch 문을 사용하거나
// JSON 파일을 직접 불러와서 언어 데이터를 매핑하는 방식을 많이 사용함
// 하지만 복잡하고 유지보수가 어렵다는 단점 존재
// 최신 JS에서는 Intl API를 사용해 날짜, 숫자, 통화, 목록 형식 등을 자동으로 다국어에 맞게 변환

// 과거 방식
function formatDateOld(date, locale) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    if (locale === 'ko-KR') {
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    } else if (locale === 'en-US') {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    } else {
        return date.toDateString(); // 기본값
    }
}

const date = new Date();
console.log(formatDateOld(date, 'ko-KR')); // 한국어 
console.log(formatDateOld(date, 'en-US')); // 영어

// 최신 방식
// 일본의 연호 시스템같은 복잡한 형식도 지원함
// 브라우저 내장 기능이므로 빠름 
function formatDateIntl(date, locale) {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

const date2 = new Date();
console.log(formatDateIntl(date2, 'ko-KR')); // 2025년 2월 4일
console.log(formatDateIntl(date2, 'en-US')); // February 4, 2025
console.log(formatDateIntl(date2, 'fr-FR')); // 4 février 2025

// 과거엔 document.execCommand('copy')를 사용해 클립보드 제어
// 하지만 비표준적이고 브라우저 지원이 제한적이며 보안 문제로 인해 최신 브라우저에서 폐기되고 있음
// navigator.clipboard api가 도입됨. 비동기 방식으로 안전하고 직관적 코드 작성 가능

// 과거 방식
// 비표준적 -> 일부 브라우저에서 작동하지 않거나 지원이 불확실함
// 보안 문제 -> 사용자가 예상치 않게 클립보드가 변경될 위험
// UI 요소 필요 -> textarea 요소를 생성 및 제거해야 하므로 코드가 복잡함
// 비동기 지원 부족 -> execCommand('copy')는 동기 방식으로 비동기 처리와 결합하기 어려움 
function legacyCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        console.log('클립보드에 복사됨');
    } catch (err) {
        console.error('클립보드 복사 실패:', err);
    }

    document.body.removeChild(textArea);
}

// 클립보드 API 사용 방식
// HTTPS 환경에서만 작동해 악성 코드의 무단 클립보드 접근 방지
// 추가적인 DOM 조작 없이 간단한 API 호출로 처리 가능 
async function copyToClipboard(text) {
    try {
        // 클립보드에 텍스트 복사 
        await navigator.clipboard.writeText(text);
        console.log('클립보드에 복사됨');
    } catch (err) {
        console.error('클립보드 복사 실패:', err);
    }
}

async function pasteFromClipboard() {
    try {
        // 클립보드에서 텍스트 읽기 
        const text = await navigator.clipboard.readText();
        console.log('클립보드에서 읽음');
        return text;
    } catch (err) {
        console.error('클립보드 읽기 실패:', err);
        return null;
    }
}

// 버튼 클릭시 텍스트 복사
document.getElementById('copyButton').addEventListener('click', () => {
    copyToClipboard('Hello Clipboard');
});

// 버튼 클릭시 클립보드에서 텍스트 읽기, 보통은 CTRL+V 사용함 
document.getElementById('pasteButton').addEventListener('click', async () => {
    const clipboardText = await pasteFromClipboard();
    if (clipboardText) {
        document.getElementById('output').innerText = clipboardText;
    }
});
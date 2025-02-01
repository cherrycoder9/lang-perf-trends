// 정적 임포트 방식
// import { showMessage } from '.utils.js';

// 동적 임포트 방식
document.getElementById('loadModuleBtn').addEventListener('click', async () => {
    try {
        // 모듈을 필요할 때만 로드함 
        // 
        const module = await import('./utils.js');

        // 가져온 모듈의 함수 실행
        module.showMessage('모듈이 동적으로 로드되었습니다.');
    } catch (error) {
        console.error('모듈 로드 중 오류 발생:', error);
    }
});
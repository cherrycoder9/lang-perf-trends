// 과거에는 대용량 데이터를 가져올 때 fetch().then(res -> res.text())
// 또는 res.json()을 사용해 전체 데이터를 한번에 로드하는 방식이 일반적이었음
// 하지만 메모리 사용량 및 처리 속도에 문제가 있음

// 최근에는 ReadableStream을 활용한 데이터 스트리밍 방식이 선호됨
// 이 방식은 전체 데이터를 한번에 불러오지 않고 조각(chunk) 단위로 처리 가능
// 일부 데이터만 받아도 즉시 UI에 반영 가능
// 대용량 API 및 파일 다운로드에 적합함

async function streamLargeJSON(url) {
    // fetch를 이용해 서버로부터 스트리밍 응답을 받음 
    const response = await fetch(url);

    // 서버 응답이 ReadableStream 형태인지 확인 
    console.log(response.body instanceof ReadableStream); // true

    if (!response.body) {
        throw new Error("스트리밍 응답이 지원되지 않는 서버입니다.");
    }

    // UTF-8로 디코딩해 텍스트 스트림 변환
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

    let partialData = ''; // 스트림을 통해 받은 JSON 데이터를 조합할 변수
    let isFirstChunk = true;

    console.log('데이터 스트리밍 시작...');

    while (true) {
        // 다음 데이터 블록(chunk) 읽기
        const { value, done } = await reader.read();
        if (done) break; // 스트림 끝 도달시 종료

        // 부분 데이터를 기존 데이터와 결합
        partialData += value;

        // JSON 객체 단위로 분리하기 위한 로직 (대량 JSON 데이터 대응)
        try {
            const jsonObjects = partialData
                .split("\n") // 개별 JSON 객체가 한 줄씩 들어온다고 가정 
                .filter(line => line.trim() !== '') // 빈 줄 제거 
                .map(line => JSON.parse(line)); // JSON 변환

            partialData = ''; // 성공적으로 변환된 데이터는 초기화

            for (const obj of jsonObjects) {
                if (isFirstChunk) {
                    console.log('첫 번째 데이터 조각:', obj);
                    isFirstChunk = false;
                }
                // 개별 JSON 객체를 UI에 반영하거나 처리하는 로직 
            }
        } catch (error) {
            // JSON 변환 중 오류 발생시, 다음 데이터와 함께 다시 시도 
        }
    }
    console.log('데이터 스트리밍 완료');
}

const dataUrl = 'https://dummyjson.com/todos/random';
streamLargeJSON(dataUrl).catch(console.error);

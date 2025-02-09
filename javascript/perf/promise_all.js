function measureTime(label, fn) {
    const start = performance.now();
    return fn().then(() => {
        const end = performance.now();
        console.log(`${label} 실행시간: ${(end - start).toFixed(2)}ms`);

    });
}

// 임의의 비동기 작업을 시뮬레이션하는 함수 
function asyncTask(id, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Task ${id} 완료 (${delay}ms 소요)`);
            resolve();
        }, delay);
    });
}

// 순차 실행
async function sequentialExecution() {
    await asyncTask(1, 1000);
    await asyncTask(2, 1500);
    await asyncTask(3, 1200);
}

// 벙렬 실행 
async function parallelExecution() {
    await Promise.all([
        asyncTask(1, 1000),
        asyncTask(2, 1500),
        asyncTask(3, 1200),
    ]);
}

measureTime("순차 실행", sequentialExecution)
    .then(() => measureTime("병렬 실행", parallelExecution));

// Task 1 완료(1000ms 소요)
// Task 2 완료(1500ms 소요)
// Task 3 완료(1200ms 소요)
// 순차 실행 실행시간: 3721.17ms
// Task 1 완료(1000ms 소요)
// Task 3 완료(1200ms 소요)
// Task 2 완료(1500ms 소요)
// 병렬 실행 실행시간: 1511.11ms
import { JSDOM } from "jsdom";

const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
    </body>
    </html>    
`);
globalThis.window = dom.window;
globalThis.document = dom.window.document;

const measureTime = (label, callback) => {
    const start = performance.now();
    callback();
    const end = performance.now();
    console.log(`${label} 실행시간: ${(end - start).toFixed(2)}ms`);
};

const BUTTON_COUNT = 30000;

const container = document.createElement("div");
document.body.appendChild(container);


measureTime("개별 이벤트 핸들러 방식", () => {
    container.innerHTML = "";
    for (let i = 0; i < BUTTON_COUNT; i++) {
        const button = document.createElement("button");
        button.textContent = `버튼 ${i}`;
        button.addEventListener("click", () => {
            console.log(`버튼 ${i} 클릭됨`);
        });
        container.appendChild(button);
    }
    console.log(process.memoryUsage());
});

// 이벤트 위임 방식
measureTime("이벤트 위임 방식", () => {
    container.innerHTML = "";
    for (let i = 0; i < BUTTON_COUNT; i++) {
        const button = document.createElement("button");
        button.textContent = `버튼 ${i}`;
        container.appendChild(button);
    }

    // 부모 요소에 한번만 이벤트 핸들러 등록
    container.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            console.log(`${event.target.textContent} 클릭됨`);
        }
    });
    console.log(process.memoryUsage());
});

// 두 방식의 실행 순서를 바꾸면 결과가 달라짐. GC의 영향?
// 어쨌거나 큰 차이가 없음 

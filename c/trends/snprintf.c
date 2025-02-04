
#include <stdio.h>

int main() {
    // 기존에는 sprintf 사용해 문자열을 포맷팅하는 방식이 일반적
    // 이 방식은 버퍼 오버플로우 위험 존재
    // sprintf는 버퍼 크기를 검사하지 않음
    // 오버플로우 발생시 인접한 메모리가 덮어쓰기될 수 있음
    // 따라서 프로그램이 예상치 못한 동작을 하거나 보안 취약점 발생 가능성
    char buffer[10];                        // 크기가 10인 버퍼 선언
    sprintf(buffer, "\nHello,\nworld!\n");  // 버퍼보다 긴 문자열 저장 시도
                                            // (오버플로 발생 가능성)
    printf("Buffer: %s", buffer);  // 비정상적인 동작 가능함 (버퍼 초과)

    // snprintf
    // 버퍼 크기를 초과하는 문자열이 잘리지 않도록 방지함
    char buffer2[10];
    int written = snprintf(buffer2, sizeof(buffer2), "\nHello,\nworld!\n");

    // 데이터 손실 여부 감지 코드
    if (written >= sizeof(buffer2)) {
        printf("경고: 출력이 잘렸습니다! (필요한 크기: %d, 버퍼 크기: %zu)\n",
               written, sizeof(buffer));
    }

    printf("Buffer2: %s\n", buffer2);  // 안전하게 포맷된 문자열 출력

    return 0;
}
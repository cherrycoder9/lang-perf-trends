#include <stdio.h>
#include <time.h>

#define ITERATIONS 20000

int main() {
    const char *message = "인코딩 테스트";

    // 시간 측정을 위한 변수
    clock_t start, end;
    double printf_time, puts_time;

    // 표준 출력의 버퍼링 설정 (완전 버퍼링)
    // C의 표준 입출력 버퍼링 방식을 조정하는 함수
    // puts()가 매번 플러시하는 문제를 줄이고 printf()와 동등 조건에서 비교 가능
    // 설정하지 않을 경우 printf 속도가 더 빠름
    setvbuf(stdout, NULL, _IOFBF, 1024);

    // printf() 성능 측정
    // printf는 포맷팅을 해석하는 과정이 필요함
    // 아래 코드에서 %s를 만나면 포인터 해석, 문자열 변환, 출력 버퍼 처리 등
    // 추가 작업이 발생함 printf는 포맷팅이 끝나면 버퍼를 플러시해야 하는데, 이
    // 과정이 자주 발생하면 속도 저하
    start = clock();
    for (int i = 0; i < ITERATIONS; i++) {
        printf("%s\n", message);
    }
    end = clock();
    printf_time = ((double)(end - start) / CLOCKS_PER_SEC) * 1000.0;

    // puts() 성능 측정
    // 한 번에 버퍼에 문자열을 저장한 후 자동 개행과 함께 빠르게 출력함
    // 따라서 다량의 문자열을 출력할 때 puts는 printf보다 더 빠를 수 있음
    start = clock();
    for (int i = 0; i < ITERATIONS; i++) {
        puts(message);  // 문자열 출력 (자동 개행)
    }
    end = clock();
    puts_time = ((double)(end - start) / CLOCKS_PER_SEC) * 1000.0;

    // 결과 출력
    printf("printf() time: %.2f ms\n", printf_time);  // 135ms
    printf("puts() time: %.2f ms\n", puts_time);      // 96ms

    return 0;
}
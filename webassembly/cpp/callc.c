#include <stdio.h>
#include <emscripten/emscripten.h>

#ifdef __cplusplus
extern "C" {
#endif

int EMSCRIPTEN_KEEPALIVE cPow(int num) {
    printf("我的C函数已被调用\n");
    printf("参数 num = %d\n", num);
    return num * num;
}

#ifdef __cplusplus
}
#endif

#ifndef _USERS_IONANTHA_PROJECT_MINIAPP_IONANTHA_TECH_WEBASSEMBLY_CPP_HELLO2_H_GENERATED_
#define _USERS_IONANTHA_PROJECT_MINIAPP_IONANTHA_TECH_WEBASSEMBLY_CPP_HELLO2_H_GENERATED_
/* Automically generated by wasm2c */
#ifdef __cplusplus
extern "C" {
#endif

#include <stdint.h>

#include "wasm-rt.h"

#ifndef WASM_RT_MODULE_PREFIX
#define WASM_RT_MODULE_PREFIX
#endif

#define WASM_RT_PASTE_(x, y) x ## y
#define WASM_RT_PASTE(x, y) WASM_RT_PASTE_(x, y)
#define WASM_RT_ADD_PREFIX(x) WASM_RT_PASTE(WASM_RT_MODULE_PREFIX, x)

/* TODO(binji): only use stdint.h types in header */
typedef uint8_t u8;
typedef int8_t s8;
typedef uint16_t u16;
typedef int16_t s16;
typedef uint32_t u32;
typedef int32_t s32;
typedef uint64_t u64;
typedef int64_t s64;
typedef float f32;
typedef double f64;

extern void WASM_RT_ADD_PREFIX(init)(void);

/* import: 'wasi_snapshot_preview1' 'fd_write' */
extern u32 (*Z_wasi_snapshot_preview1Z_fd_writeZ_iiiii)(u32, u32, u32, u32);
/* import: 'env' 'emscripten_memcpy_big' */
extern u32 (*Z_envZ_emscripten_memcpy_bigZ_iiii)(u32, u32, u32);
/* import: 'env' 'emscripten_resize_heap' */
extern u32 (*Z_envZ_emscripten_resize_heapZ_ii)(u32);
/* import: 'env' 'setTempRet0' */
extern void (*Z_envZ_setTempRet0Z_vi)(u32);
/* import: 'env' 'memory' */
extern wasm_rt_memory_t (*Z_envZ_memory);
/* import: 'env' 'table' */
extern wasm_rt_table_t (*Z_envZ_table);

/* export: '__wasm_call_ctors' */
extern void (*WASM_RT_ADD_PREFIX(Z___wasm_call_ctorsZ_vv))(void);
/* export: 'main' */
extern u32 (*WASM_RT_ADD_PREFIX(Z_mainZ_iii))(u32, u32);
/* export: '__errno_location' */
extern u32 (*WASM_RT_ADD_PREFIX(Z___errno_locationZ_iv))(void);
/* export: 'fflush' */
extern u32 (*WASM_RT_ADD_PREFIX(Z_fflushZ_ii))(u32);
/* export: 'stackSave' */
extern u32 (*WASM_RT_ADD_PREFIX(Z_stackSaveZ_iv))(void);
/* export: 'stackRestore' */
extern void (*WASM_RT_ADD_PREFIX(Z_stackRestoreZ_vi))(u32);
/* export: 'stackAlloc' */
extern u32 (*WASM_RT_ADD_PREFIX(Z_stackAllocZ_ii))(u32);
/* export: 'malloc' */
extern u32 (*WASM_RT_ADD_PREFIX(Z_mallocZ_ii))(u32);
/* export: 'free' */
extern void (*WASM_RT_ADD_PREFIX(Z_freeZ_vi))(u32);
/* export: '__data_end' */
extern u32 (*WASM_RT_ADD_PREFIX(Z___data_endZ_i));
/* export: 'dynCall_jiji' */
extern u32 (*WASM_RT_ADD_PREFIX(Z_dynCall_jijiZ_iiiiii))(u32, u32, u32, u32, u32);
/* export: '__growWasmMemory' */
extern u32 (*WASM_RT_ADD_PREFIX(Z___growWasmMemoryZ_ii))(u32);
#ifdef __cplusplus
}
#endif

#endif  /* _USERS_IONANTHA_PROJECT_MINIAPP_IONANTHA_TECH_WEBASSEMBLY_CPP_HELLO2_H_GENERATED_ */

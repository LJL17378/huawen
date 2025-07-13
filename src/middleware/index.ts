
// 空中间件导出，避免astro构建报错
export function onRequest(context, next) {
    return next();
  }
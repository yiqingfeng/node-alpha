/**
 * @description 请求预处理
 */
export default async function (ctx: moa.Context, next: () => void) {
    ctx.response.set({
        'cache-control': 'no-cache', // FOR 304
        'access-control-allow-origin': ctx.request.domain,
        'access-control-allow-methods': '*',
        'access-control-allow-headers': '*',
        'access-control-allow-credentials': 'true',
        'access-control-max-age': '86400',
    });
    next();
}

/**
 * @description 其他特殊情况处理
 * - 404 资源页
 */
export default async function (ctx: moa.Context, next: () => void) {
    ctx.response.end();
}

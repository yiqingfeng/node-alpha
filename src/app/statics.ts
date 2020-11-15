/**
 * @description 本地静态资源处理
 * - 指定静态资源
 * - 缓存有效的数据（可通过 开发模式设置 dev 安静开发模式 dev-test 自测模式）
 */
export default async function (ctx: moa.Context, next: () => void) {
    next();
}

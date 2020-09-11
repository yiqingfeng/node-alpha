/**
 * @description 应用处理入口
 */
import Moa from '../moa';
/**
 * @description 服务器请求处理
 */
function startApp(app: Moa) {
    // 路由 注册
    app.useRoute(router => {
        router.get('/test', async function (ctx: moa.Context, next: () => void) {
            ctx.body = 'hello test!';
            next();
        });
    });

    // 中间件 注册
    app.use(async function (ctx: moa.Context, next: () => void) {
        ctx.body += 'end';
        next();
    });
}

export default startApp;

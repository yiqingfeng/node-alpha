/**
 * @description 应用处理入口
 */
import Moa from '../moa';
import pre from './pre';
import custom from './custom';
import statics from './statics';
import proxyRequest from './proxy';
import others from './others';

interface routerController {
    method: 'get' | 'post';
    path: string;
    listener: moa.listener;
}

/**
 * @description 服务器请求处理
 */
function startApp(app: Moa) {
    // 需进行的任务
    [
        pre,
        custom,
        statics,
        proxyRequest,
        others,
    ].forEach((task: moa.listener | comMap<routerController>) => {
        if (typeof task === 'function') {
            // 中间件 注册
            app.use(task);
        } else {
            // 路由 注册
            app.useRoute(router => {
                for (const path in task) {
                    const register = task[path];
                    router[register.method](path, register.listener);
                }
            });
        }
    })

    app.useRoute(router => {
        router.get('/test', async function (ctx: moa.Context, next: () => void) {
            ctx.body = 'hello test!';
            next();
        });
    });

    app.use(async function (ctx: moa.Context, next: () => void) {
        ctx.body += 'end';
        next();
    });
}

export default startApp;

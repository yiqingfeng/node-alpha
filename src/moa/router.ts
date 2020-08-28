/**
 * @description 路由处理
 */
import moa from 'moa';

class Router implements moa.Router {
    public stacks: moa.Stack[];

    constructor() {
        this.stacks = [];
    }

    /**
     * @description 路由注册
     * @param path {string} 作用路径
     * @param method {string} 生效的请求方法
     * @param middleware {listener} 中间件
     */
    register(path: string, method: string, middleware: moa.listener) {
        this.stacks.push({
            path,
            method,
            middleware,
        });
    }

    get(path: string, middleware: moa.listener) {
        this.register(path, 'get', middleware);
    }

    post(path: string, middleware: moa.listener) {
        this.register(path, 'post', middleware);
    }

    routes(): moa.listener {
        return async (ctx: Context, next: moa.listener) => {
            const url = ctx.url === '/index' ? '/' : ctx.url;
            const method = ctx.method
            let route;
            for (let i = 0; i < this.stacks.length; i++) {
                const item = this.stacks[i]
                if (item.path === url && item.method === method) {
                    route = item.middleware;
                    break
                }
            }

            if (typeof route === 'function') {
                await route(ctx, next);
                return
            }

            await next();
        }
    }
}

export default Router;
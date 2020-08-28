/**
 * @description MOA 请求洋葱圈
 * 参考文章：https://mp.weixin.qq.com/s/PkzPJipyG80Kpm7xwOrnIA
 * 目标：简单化、流程化和模块化
 */
import moa from 'moa';
import http, { Server } from 'http';
import Context from './context';
import Router from './router';

interface createServer {
    (requestListener?: http.RequestListener): Server;
    (options: http.ServerOptions, requestListener?: http.RequestListener): Server;
}

interface Net {
    createServer: createServer;
}

class Moa {
    public _middleWares: moa.listener[];
    public router: moa.Router | null;

    constructor() {
        this._middleWares = [];
        this.router = null;
    }

    /**
     * @description 请求拦截处理，用于添加中间件
     */
    use(middleware: moa.listener) {
        this._middleWares.push(middleware);
    }

    /**
     * @description 创建待执行的上下文环境
     */
    createContext(req: http.IncomingMessage, res: http.ServerResponse): Context {
        return new Context(Object.create(req), Object.create(res));
    }

    /**
     * @description 函数组合处理
     */
    compose(middleWares: moa.listener[]): (ctx: Context) => Promise<moa.listener | void> {
        return function (ctx: Context) {
            function dispatch(i: number): Promise<moa.listener | void> {
                const fn = middleWares[i];
                if (!fn) {
                    return Promise.resolve();
                }
                return Promise.resolve(
                    fn(ctx, function () {
                        dispatch(i + 1);
                    })
                );
            }

            return dispatch(0);
        }
    }

    /**
     * @description 获取服务器监听者
     * 便于外部创建服务器，直接使用 app 作为 listener
     */
    getListener(): http.RequestListener {
        const listener: http.RequestListener = async (req, res) => {
            // 创建上下文
            const ctx: Context = this.createContext(req, res)
            const fn = this.compose(this._middleWares)

            await fn(ctx);

            // 响应
            res.end(ctx.body);
        };
        return listener;
    }

    /**
     * @description 创建服务器
     * @param net {http | https} 能创建服务器的实例
     * @param data {number | Array} listen 监听端口或参数
     * @param options {object} createServer 配置项
     */
    createServer(net: Net, data: number | Array<number>, options?: http.ServerOptions): Server {
        const listener = this.getListener();
        const server: Server = options
            ? net.createServer(options, listener)
            : net.createServer(listener);
        if (!Array.isArray(data)) {
            data = [data];
        }
        server.listen(...data);
        console.log(`服务器已启动，端口为${data[0]}`);
        return server;
    }

    /**
     * @description 创建路由
     */
    createRoute(): moa.Router {
        if (!this.router) {
            this.router = new Router();
        }
        return this.router;
    }
}

export default Moa;

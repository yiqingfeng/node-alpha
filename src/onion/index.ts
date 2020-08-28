// /**
//  * @description 请求响应封装处理
//  */
// import http, {
//     Server,
// } from 'http';
// import https from 'https';
// import Context from './context';
// import Router from './router';

// type middlewareCb = (ctx: Context, next: middlewareCb) => void;

// interface UnionOptions {
//     isHttps: boolean;
//     tlsOptions: Cert | undefined;
// }
// class Union {
//     public isHttps: boolean;
//     public tlsOptions: Cert | undefined;
//     public middleWares: middlewareCb[];
//     constructor({
//         isHttps = false,
//         tlsOptions,
//     } = {} as UnionOptions) {
//         this.isHttps = isHttps;
//         this.tlsOptions = tlsOptions;
//         this.middleWares = [];
//     }

//     /**
//      * @description 创建路由
//      */
//     createRouter(): Router {
//         return new Router();
//     }

//     /**
//      * @description 请求拦截处理，用于添加中间件
//      */
//     use(middleware: middlewareCb) {
//         this.middleWares.push(middleware);
//     }

//     /**
//      * @description 获取服务器监听者
//      * 便于外部创建服务器，直接使用 app 作为 listener
//      */
//     getListener(): http.RequestListener {
//         const listener: http.RequestListener = async (req, res) => {
//             // 创建上下文
//             const ctx: Context = this.createContext(req, res)
//             const fn = this.compose(this.middleWares)

//             await fn(ctx);

//             // 响应
//             res.end(ctx.body);
//         };
//         return listener;
//     }

//     /**
//      * @description 提供监听处理
//      */
//     listen(port?: number | undefined, hostname?: string | undefined, backlog?: number | undefined, listeningListener?: (() => void) | undefined) {
//         let server: Server;
//         const listener: http.RequestListener = this.getListener();
//         if (this.isHttps && this.tlsOptions) {
//             server = https.createServer(this.tlsOptions, listener);
//         } else {
//             server = http.createServer(listener);
//         }
//         server.listen(...arguments);
//     }

//     /**
//      * @description 创建待执行的上下文环境
//      */
//     createContext(req: http.IncomingMessage, res: http.ServerResponse): Context {
//         return new Context(Object.create(req), Object.create(res));
//     }

//     /**
//      * @description 函数组合处理
//      */
//     compose(middleWares: middlewareCb[]): Function {
//         return function (ctx: Context) {
//             return dispatch(0)

//             function dispatch(i: number) {
//                 let fn = middleWares[i]
//                 if (!fn) {
//                     return Promise.resolve()
//                 }
//                 return Promise.resolve(
//                     fn(ctx, function () {
//                         return dispatch(i + 1);
//                     })
//                 )
//             }
//         }
//     }
// }

// export default Union;
// export const Routers = Router;
// export function createListener(callback?: (app: Union) => void): http.RequestListener {
//     const app = new Union();

//     if (typeof callback === 'function') {
//         callback(app);
//     }

//     return app.getListener.bind(app);
// }

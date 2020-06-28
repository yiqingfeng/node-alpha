/**
 * @description 请求响应封装处理
 */
import http, {
	Server
} from 'http';
import https from 'https';
import Context from './context';

class Union {
	public isHttps: boolean;
	public tlsOptions: http.ServerOptions | null;
	public middlewares: Function[];
	public callback: Function;
	constructor({
		isHttps = false,
		tlsOptions = null,
		middlewares = [],
	} = {}) {
		this.isHttps = isHttps;
		this.tlsOptions = tlsOptions;
		this.middlewares = middlewares;
		this.callback = function (ctx: Object) {
			console.log(ctx);
		}
	}
	/**
	 * @description 请求拦截处理，用于添加中间件
	 */
	use(middleware: Function) {
		this.middlewares.push(middleware);
	}
	/**
	 * @description 提供监听处理
	 */
	listen() {
		let server: Server;
		const listener: http.RequestListener = async (req, res) => {
			// 创建上下文
			const ctx = this.createContext(req, res)
			const fn = this.compose(this.middlewares)

			await fn(ctx);

			// 响应
			res.end(ctx.body);
		};
		if (this.isHttps && this.tlsOptions) {
			server = https.createServer(this.tlsOptions, listener);
		} else {
			server = http.createServer(listener);
		}
		server.listen(...arguments);
	}
	/**
	 * @description 创建待执行的上下文环境
	 */
	createContext(req: http.IncomingMessage, res: http.ServerResponse): object {
		const ctx = Object.create(context);
		ctx.request = Object.create(req);
		ctx.response = Object.create(res);

		// 保留原始数据
		ctx.req = ctx.request.req = req;
		ctx.res = ctx.response.res = res;
		return ctx;
	}
	/**
	 * @description 函数组合处理
	 */
	compose(middlewares: Function[]): Function {
		return function (ctx: object) {
			return dispatch(0)

			function dispatch(i: number) {
				let fn = middlewares[i]
				if (!fn) {
					return Promise.resolve()
				}
				return Promise.resolve(
					fn(ctx, function () {
						return dispatch(i + 1);
					})
				)
			}
		}
	}
}

export default Union;

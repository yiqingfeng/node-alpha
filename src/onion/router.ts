/**
 * @description 路由处理
 */
class Router implements Router {
	public stacks: Stack[];
	constructor() {
		this.stacks = [];
	}

	/**
	 * @description 路由注册
	 * @param path 
	 * @param method 
	 * @param middleware 
	 */
	register(path: string, method: string, middleware: listener) {
		this.stacks.push({
			path,
			method,
			middleware,
		});
	}

	get(path: string, middleware: listener) {
		this.register(path, 'get', middleware);
	}

	post(path: string, middleware: listener) {
		this.register(path, 'post', middleware)
	}

	routes(): listener {
		return async (ctx: Context, next: Function) => {
			let url = ctx.url === '/index' ? '/' : ctx.url
			let method = ctx.method
			let route
			for (let i = 0; i < this.stacks.length; i++) {
				let item = this.stacks[i]
				if (item.path === url && item.method === method) {
					route = item.middleware
					break
				}
			}

			if (typeof route === 'function') {
				await route(ctx, next)
				return
			}

			await next()
		}
	}
}

export default Router;

/**
 * @description 请求上下文处理
 * 可提供 getter 和 setter 简易通用处理
 */
import http from 'http';

class ContextClass implements Context {
	constructor(public request: Request, public response: Response) {

	}
	get body() {
		return this.response.body;
	}
	set body(data: any) {
		this.response.body = data;
	}
	get url() {
		return this.request.url
	}
	get method() {
		return this.request.method;
	}
}

export default ContextClass;

/**
 * @description 请求上下文处理
 * 可提供 getter 和 setter 简易通用处理
 */
import http from 'http';
import request from './request';
import response from './response';

class ContextClass implements Context {
    request: Request;
    response: Response;
    constructor(public req: http.IncomingMessage, public res: http.ServerResponse) {
        this.request = Object.create(request);
        this.response = Object.create(response);
        // 保留原始数据
        this.req = this.request.req = req;
        this.res = this.response.res = res;
    }

    get body() {
        return this.response.body;
    }

    set body(data: any) {
        this.response.body = data;
    }

    get url() {
        return this.request.url;
    }

    get method() {
        return this.request.method;
    }
}

export default ContextClass;

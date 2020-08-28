/**
 * @description 请求上下文处理
 * 简化 API
 */
import moa from 'moa';
import http from 'http';

import Request from './request';
import Response from './response';

class ContextClass implements moa.Context {
    request: moa.Request;
    response: moa.Response;
    constructor(public req: http.IncomingMessage, public res: http.ServerResponse) {
        this.request = new Request(req);
        this.response = new Response(res);
        // 保留原始数据
        this.req = req;
        this.res = res;
    }

    get body(): string {
        return this.response.body;
    }

    set body(data: string) {
        this.response.body = data;
    }

    get url(): string {
        return this.request.url;
    }

    get method(): string {
        return this.request.method;
    }
}

export default ContextClass;

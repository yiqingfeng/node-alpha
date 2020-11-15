/**
 * @description 请求上下文处理
 * 简化 API
 */
import http from 'http';

import Request from './request';
import Response from './response';

class ContextClass implements moa.Context {
    request: moa.Request;
    response: moa.Response;
    _data: Record<string, unknown>;

    constructor(public req: http.IncomingMessage, public res: http.ServerResponse) {
        this.request = new Request(req);
        this.response = new Response(res);
        // 保留原始数据
        this.req = req;
        this.res = res;
        this._data = {};
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

    set(key: string, value: any) {
        this._data[key] = value;
    }

    get(key: string): any {
        return this._data[key];
    }

    end(content: string | Buffer): ContextClass {
        this.res.end(content);
        return this;
    }
}

export default ContextClass;

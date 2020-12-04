import http from 'http';

class Response {
    res: http.ServerResponse;
    _body: string;

    constructor(res: http.ServerResponse) {
        this.res = res;
        this._body = '';
    }

    get body(): string {
        return this._body;
    }

    set body(data: string) {
        this._body = data;
    }

    // headers 设置
    set(name: string | comMap<string>, value: string | string[]) {
        if (typeof name === 'object') {
            for (const key in name) {
                this.set(key, name[key]);
            }
        } else {
            this.res.setHeader(name, value);
        }
        return this;
    }

    // headers 获取
    get(name ?: string): string | number | string[] | undefined | http.OutgoingHttpHeaders {
        if (name) {
            return this.res.getHeader(name);
        }
        return this.res.getHeaders();
    }
}

export default Response;

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
    set(field: string | comMap<string>, value: string | string[]) {
        if (typeof field === 'object') {
            for (const key in field) {
                this.set(key, field[key]);
            }
        } else {
            this.res.setHeader(field, value);
        }
        return this;
    }

    // headers 获取
    // get() {

    // }
}

export default Response;

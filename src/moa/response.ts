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
}

export default Response;

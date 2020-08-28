import http from 'http';

class Request {
    req: http.IncomingMessage;

    constructor(req: http.IncomingMessage) {
        this.req = req;
    }

    get url(): string {
        return this.req.url || '';
    }

    get method(): string {
        return (this.req.method || '').toLowerCase();
    }
}

export default Request;

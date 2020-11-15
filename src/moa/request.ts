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

    get protocol(): string {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.req.connection.encrypted ? 'https' : 'http';
    }

    get domain(): string {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.req.headers.host.split(':')[0];
    }
}

export default Request;

// moa 应用
namespace moa {
    import http from 'http';

    interface Request {
        req: http.IncomingMessage;
        url: string;
        method: string;
        protocol: string;
        domain: string;
        [propName: string]: any;
    }

    interface Response {
        res: http.ServerResponse;
        body: string;
        [propName: string]: any;
    }

    interface Context {
        request: Request;
        response: Response;
        req: http.IncomingMessage;
        req: http.ServerResponse;
        body: string;
        url: string;
        method: string;
        set: (key: string, value: any) => void;
        get: (key: string) => any;
        end: (content: string | Buffer) => void;
    }

    export type listener = (ctx: Context, next: () => void) => void;

    interface Stack {
        path: string;
        method: string;
        middleware: listener,
    }

    interface Router {
        _stacks: Stack[];
        register: (path: string, method: string, middleware: listener) => void;
        get: (path: string, middleware: listener) => void;
        post: (path: string, middleware: listener) => void;
        routes: () => listener;
    }
}

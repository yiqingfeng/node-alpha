type listener = (ctx: Context, next: Function) => void;
interface Stack {
	path: string;
	method: string;
	middleware: listener,
}

declare interface Context {
	request: http.IncomingMessage; 
	response: http.ServerResponse;
	req: http.IncomingMessage;
	req: http.ServerResponse;
	body: any;
	url: string | undefined;
	method: string | undefined;
}


declare interface Router {
	stacks: Stack[];
	register: (path: string, method: string, middleware: listener) => void;
	get: (path: string, middleware: listener) => void;
	post: (path: string, middleware: listener) => void;
	routes: () => listener;
}

declare interface Request {
	req: http.IncomingMessage;
	[propName: string]: any;
}

declare interface Response {
	res: http.ServerResponse;
	body: any;
	[propName: string]: any;
}

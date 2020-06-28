declare interface resData<T> {
	errCode: number | string;
	data: T;
}

declare interface Cert {
	cert: string | undefined; // 公钥
	key: string | undefined; // 私钥
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

declare interface Request {
	req: http.IncomingMessage;
	[propName: string]: any;
}

declare interface Response {
	res: http.ServerResponse;
	body: any;
	[propName: string]: any;
}

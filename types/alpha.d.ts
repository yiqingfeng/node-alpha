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
	body: any;
	url: string | undefined;
	method: string | undefined;
}

declare interface Request extends http.IncomingMessage {
	// [propName: string]: any;
}

declare interface Response extends http.ServerResponse {
	// body: any;
	// [propName: string]: any;
}

// declare interface ChildProcessOptions {
// 	cwd: string | undefined;
// 	env: object | undefined;
// 	encoding: string | undefined;
// 	shell: string | undefined;
// 	timeout: number | undefined;
// 	maxBuffer: number | undefined;
// 	killSignal: string | number | undefined; 
// 	uid: number | undefined;
// 	gid: number | undefined;
// 	windowsHide: boolean | undefined;
// }

export declare interface ChildProcessOptions {
	cwd: string | undefined;
	env: object | undefined;
	encoding: string | undefined;
	shell: string | undefined;
	timeout: number | undefined;
	maxBuffer: number | undefined;
	killSignal: string | number | undefined; 
	uid: number | undefined;
	gid: number | undefined;
	windowsHide: boolean | undefined;
}

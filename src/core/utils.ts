/**
 * @description 通用处理
 */
import cp from 'child_process';

// 是否为 windows 环境
const IS_WINDOWS = process.platform === 'win32';

/**
 * 
 */
export function getHostsPath() {

}

/**
 * @description 执行指定命令
 */
export function cpExec(cmd: string, opts: ChildProcessOptions, isSync: boolean = true): Promise<any> {
	let options: ChildProcessOptions = Object.assign({
		maxBuffer: 4 << 20,
	}, opts);
	if (!IS_WINDOWS) {
		options.shell = '/bin/bash';
	}
	return new Promise((resolve, reject) => {
		if (isSync) {
			try {
				let data = cp.execSync(cmd, options);
				resolve(data);
			} catch (error) {
				reject(error);
			}
		} else {
			cp.exec(cmd, options, function (error, stdout, stderr) {

			});
		}
	});
}

/**
 * 
 * @param cmd 
 */
export function cpSpawn(cmd: string): Promise<any> {

}

// export IS_WINDOWS = IS_WINDOWS;
export default {
	IS_WINDOWS,
};

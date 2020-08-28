/**
 * @description 子进程相关
 */
import cp from 'child_process';
import base from './base';

// import * as utils from '../../types/utils'; // 引入声明
// type resData<T> = utils.resData<T>;

const {
    isWindows,
} = base;

/**
 * @description exec 执行指定命令
 */
function cpExec(cmd: string, options?: cp.ExecOptions): resData<string> {
    options = Object.assign({
        maxBuffer: 4 << 20,
    }, options);
    if (!isWindows()) {
        options.shell = '/bin/bash';
    }
    const res: resData<string> = {
        errCode: 0,
        data: '',
    };
    try {
        const data = cp.execSync(cmd, options);
        res.data = data.toString(); // 将 buffer 转换成 string
    } catch (err) {
        res.errCode = -1;
        res.data = err.toString();
    }
    return res;
}

/**
 * @description spawn 要运行的命令
 * spawn 没有预置 maxBuffer
 */
function cpSpawn(cmd: string, options?: cp.SpawnSyncOptionsWithStringEncoding): resData<string> {
    const command: string[] = cmd.split(' ');
    options = Object.assign({}, options);
    if (!isWindows() && !options.shell) {
        options.shell = '/bin/bash';
    }
    const res: resData<string> = {
        errCode: 0,
        data: '',
    };

    try {
        const data = cp.spawnSync(command[0], command.slice(1), options);
        if (data.error) {
            res.errCode = -1;
        } else {
            res.data = data.output[0].toString(); // 将 buffer 转换成 string
        }
    } catch (err) {
        res.errCode = -1;
        res.data = err.toString();
    }
    return res;
}

export default {
    cpExec,
    cpSpawn,
};
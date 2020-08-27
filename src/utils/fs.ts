/**
 * @description 文件相关操作
 * 目前仅考虑同步版本
 * todo: 异步特殊处理
 */
import fs from 'fs';
import path from 'path';

// import * as utils from '../../types/utils'; // 引入声明
// type resData<T> = utils.resData<T>;

/**
 * @description 检查指定目录是否存在
 * @param dirPath 指定目录
 */
function checkDir(dirPath: string): boolean {
    return fs.existsSync(dirPath);
}

/**
 * @description 指定路径是否为目录
 * @param dirPath 指定路径
 */
function isDir(dirPath: string): boolean {
    const isExists = checkDir(dirPath);

    let isDirectory = false;
    if (!isExists) {
        return isDirectory;
    }

    try {
        const stats = fs.statSync(dirPath);
        isDirectory = stats.isDirectory();
    } catch (err) {
    }
    return isDirectory;
}

/**
 * @description 删除指定文件夹
 * @param dirPath 目标文件夹的路径
 */
function deleteDir(dirPath: string): resData<string> {
    const isExist: boolean = checkDir(dirPath);

    const res: resData<string> = {
        errCode: 0,
        data: '',
    };
    if (!isExist) {
        res.data = '目录不存在';
        return res;
    }

    try {
        const files: string[] = fs.readdirSync(dirPath);
        files.forEach(file => {
            const curPath: string = path.resolve(dirPath, file);

            if (isDir(curPath)) {
                deleteDir(curPath);
            } else {
                fs.unlinkSync(curPath); // 删除该文件
            }
        });

        fs.rmdirSync(dirPath); // 清除当前文件夹
    } catch (err) {
        res.errCode = -1;
        res.data = err.toString();
    }

    return res;
}

/**
 * @description 创建指定文件夹
 */
function mkdir(oPath: string): resData<string> {
    const res = {
        errCode: 0,
        data: '',
    };
    if (isDir(oPath)) {
        return res;
    }

    try {
        fs.mkdirSync(oPath);
    } catch (err) {
        res.errCode = -1;
        res.data = err.toString();
    }

    return res;
}

/**
 * @description 读取文件内容
 */
function readFile(filePath: string, encoding: BufferEncoding = 'utf-8'): resData<string> {
    const res: resData<string> = {
        errCode: 0,
        data: '',
    };

    try {
        const data = fs.readFileSync(filePath, encoding);
        res.data = data.toString(); // 将 buffer 转换成 string
    } catch (err) {
        res.errCode = -1;
        res.data = err.toString();
    }
    return res;
}

/**
 * @description 文件写入
 */
function writeFile(filePath: string, data: string, encoding: BufferEncoding = 'utf-8'): boolean {
    let isSuccess = false;
    try {
        fs.writeFileSync(filePath, data, encoding);
        isSuccess = true;
    } catch (err) {
        console.log(err);
    }
    return isSuccess;
}

export default {
    checkDir,
    isDir,
    deleteDir,
    mkdir,
    readFile,
    writeFile,
};

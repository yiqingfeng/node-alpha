/**
 * @description https ssl 本地自证书
 */
import fs from 'fs';
import utils from '../utils';

const DOMAINS: string[] = ['fe.com', 'ceshi112.com', 'fxiaoke.com'];
const KEY_NAME: string = 'key.pem';
const CERT_NAME: string = 'cert.pem';

/**
 * @description 证书是否存在
 */
function isExistCert(): boolean {
    let isExist = true;
    [
        KEY_NAME,
        CERT_NAME,
    ].forEach((fileName: string) => {
        if (!utils.checkDir(utils.getPath(fileName))) {
            isExist = false;
        }
    });
    return isExist;
}

/**
 * @description 创建SSL证书
 */
function generateCert(domains ?: string | string[]): resData<string> {
    if (!Array.isArray(domains)) {
        domains = domains ? [domains] : DOMAINS;
    }
    const cmdStr = `mkcert -cert-file ${CERT_NAME} -key-file ${KEY_NAME} ${domains.join(' ')}`;
    return utils.cpExec(cmdStr);
}

/**
 * @description 获取证书信息
 */
function getCert(domains ?: string | string[]): Cert {
    if (!isExistCert()) {
        const gen = generateCert(domains);
        if (gen.errCode !== 0) {
            throw new Error(`SSL证书生成失败，${gen.data}`);
        }
    }
    return {
        key: utils.readFile(utils.getPath(KEY_NAME)).data,
        cert: utils.readFile(utils.getPath(CERT_NAME)).data,
    }
}

/**
 * @description 注册 hosts 文件
 * @param {string} domain 域名
 */
function registerHosts(domain: string) {
    // let hostsPath = '/etc/hosts'; // hosts 文件地址
}

/**
 * @description 设置指定域名到hosts中
 */
function setHosts(domain: string | string[]) {

}


export default {
    getCert,
    setHosts,
}

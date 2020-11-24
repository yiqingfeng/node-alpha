/**
 * @description https ssl 本地自证书
 */
import path from 'path';
import utils from '../utils';

const DPREFIX = 'local';
const DOMAINS: string[] = ['fe.com', 'ceshi112.com', 'fxiaoke.com'];
const KEY_NAME = 'key.pem';
const CERT_NAME = 'cert.pem';

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
    // 追加常驻域名
    domains.push('127.0.0.1', 'localhost');
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
function registerHosts(domain ?: string | string[]): void {
    let domains: string[];
    if (typeof domain === 'string') {
        domains = [domain];
    } else {
        domains = domain || DOMAINS;
    }
    let hostsPath = '/etc/hosts'; // hosts 文件地址
    const isWindow = utils.isWindows();
    if (isWindow) {
        hostsPath = path.join(process.env.WINDIR as string, 'system32/drivers', '.' + hostsPath);
    }
    const fileRes = utils.readFile(hostsPath);
    if (fileRes.errCode !== 0) {
        throw new Error(`hosts 文件读取失败，${fileRes.data}`);
    }
    domains = domains.map(item => DPREFIX + '.' + item)
        .map(domain => {
            if (fileRes.data.indexOf(domain) === -1) {
                return domain;
            }
            return '';
        })
        .filter(i => !!i)
    if (domains.length === 0) return;

    let cmd: string;
    if (isWindow) {
        // todo: 貌似未生效，需调整
        const sparams = `"node","""${__filename}"" winhosts ""${domains.join(',')}""","","runas",1`;
        cmd = `mshta vbscript:CreateObject("Shell.Application").ShellExecute(${sparams})(window.close)`
    } else {
        cmd = `echo '\n${domains.map(i => `127.0.0.1 ${i}`).join('\n')}\n' | sudo tee -a "${hostsPath}"`
    }
    utils.cpExec(cmd);
}

export default {
    getCert,
    registerHosts,
}

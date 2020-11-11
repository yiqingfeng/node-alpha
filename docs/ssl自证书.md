# SSL 本地开发自证书

## 利用 openssl 构建本地自证书。

具体实现，省略。。。

```ts
/**
 * @description https 证书
 * @date 2020-06-24
 */
import path from 'path';
import utils from '../utils';

const DOMAINS: string[] = ['fe.com', 'ceshi112.com', 'fxiaoke.com'];

const ECA = {
    key: `
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIL3YmpgYcS0X0eOJW15o/qU313OO+4afrv+3PPFldsYSoAoGCCqGSM49
AwEHoUQDQgAEIInaRklOq9t2S8WqpObMEEuLUCwA5rfVyZToN8tfZPZYo32an2KI
CPlSo5UPGyAChkRVEd+QpdzogZx9f6Gadw==
-----END EC PRIVATE KEY-----
    `.trim(),
    cert: `
-----BEGIN CERTIFICATE-----
MIIBIzCByqADAgECAgkA/CiFXA1iHGswCgYIKoZIzj0EAwIwDTELMAkGA1UEAwwC
RkUwHhcNMjAwMjAyMDMxNDA3WhcNMzgwMTE5MDMxNDA3WjANMQswCQYDVQQDDAJG
RTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABCCJ2kZJTqvbdkvFqqTmzBBLi1As
AOa31cmU6DfLX2T2WKN9mp9iiAj5UqOVDxsgAoZEVRHfkKXc6IGcfX+hmnejEzAR
MA8GA1UdEwEB/wQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIgLqmZL7THLn+19GtA
fKG851Tpc/FDmEs3o5HRHg8KHskCIQCu/D9eKbhJY7XrdeUBnLuLkcpYxe738737
GLnpgwVWiA==
-----END CERTIFICATE-----
    `.trim(),
};

const APP = {
    key: `
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIK9PFH3r6ocyQu0wcmRdpNb7Y8Dmafyv0tTdGYn7YLLvoAoGCCqGSM49
AwEHoUQDQgAEWZ6nZN2XUQ+rcvQPmunMdAO5xaHYwGM/oDy04Yi+cFSTsxHRqoci
d2zzCq4BcSjFFhSjIg8/sjwK7sHhb4rfdw==
-----END EC PRIVATE KEY-----
    `.trim(),
    cert: `
-----BEGIN CERTIFICATE-----
MIIBfzCCASSgAwIBAgIJAPZ6/aYjRAizMAoGCCqGSM49BAMCMA0xCzAJBgNVBAMM
AkZFMB4XDTIwMDIwMjAzMTQwN1oXDTIyMDUwNzAzMTQwN1owETEPMA0GA1UEAwwG
ZmUuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEWZ6nZN2XUQ+rcvQPmunM
dAO5xaHYwGM/oDy04Yi+cFSTsxHRqocid2zzCq4BcSjFFhSjIg8/sjwK7sHhb4rf
d6NpMGcwCQYDVR0TBAIwADBaBgNVHREEUzBRgggqLmZlLmNvbYIOKi5jZXNoaTEx
My5jb22CDiouY2VzaGkxMTIuY29tgg0qLmZ4aWFva2UuY29thwR/AAABhxAAAAAA
AAAAAAAAAAAAAAABMAoGCCqGSM49BAMCA0kAMEYCIQCvuEDjfgGB9QAs0c5fh2IY
F1bfY6QSRgwqQKyyei+YewIhANuPlBN2Dkxxsua5CebPwtVFpt01QvgiP/C2hvY/
t2dB
-----END CERTIFICATE-----
    `.trim(),
};

/**
 * @description 注册 hosts 文件
 * @param {string} domain 域名
 */
function registerHosts(domain: string) {
    // let hostsPath = '/etc/hosts'; // hosts 文件地址
}

/**
 * @description 证书版本检查
 * 如果当前版本较低 返回 -1 ，如果相同则返回 0 ，版本较高则返回 1
 */
function checkVersion(): number {
    const base: string[] = '1.0.1'.split('.');
    let version: string = utils.cpExec('openssl version').data;
    version = (version.match(/\bopenssl[^\d]+([\d|\.]+)/i) || [])[1] || ''; // eslint-disable-line  no-useless-escape
    // 判断当前 openssl 版本是否高于指定基础版本
    return version.split('.')
        .reduce((sum, item, index) => {
            const v: number = +base[index] || 0;
            return sum !== 0
                ? sum
                : v > +item
                    ? -1
                    : v === +item ? 0 : 1;
        }, 0)
}

/**
 * @description 生成证书的私钥
 */
function genKey(): string {
    return utils.cpExec('openssl ecparam -genkey -name prime256v1').data;
}

/**
 * @description 生成证书签名请求
 * @param {string} key 证书私钥
 * @param {string | string[]} domains 证书可访问域名
 */
function genCsr(key?: string, domains?: string | string[]): string {
    key = key || genKey();
    if (typeof domains !== 'string') {
        domains = (domains || DOMAINS)[0];
    }
    const cmdStr = `openssl req -new -key <(echo '${key}') -subj "/CN=${domains}"`;
    return utils.cpExec(cmdStr).data;
}

/**
 * @description 获取额外配置信息
 * 主要是多 DNS，多域名
 */
function getExt(domains?: string | string[]): string {
    if (typeof domains !== 'string') {
        domains = (domains || DOMAINS)
            .map(item => `DNS：*.${item}`)
            .join(', ')
    }
    return [
        'basicConstraints = CA:false',
        `subjectAltName${domains}`,
        '', // 确保设置好配置之后强制换行
    ].join('\n');
}

/**
 * @description 注册证书
 * @param {string} csr 公钥
 * @param {string} ext 补充配置信息
 */
function signCert(csr?: string, ext?: string): string {
    csr = csr || genCsr();
    ext = ext || getExt();
    const cmdStr = [
        'openssl x509 -req -sha256 -days 128',
        '-CAcreateserial -CAserial "/dev/null" -set_serial 0',
        `-CA <(echo "${ECA.cert}")`,
        `-CAkey <(echo "${ECA.key}")`,
        `-in <(echo "${csr}")`,
        `-extfile <(echo "${ext}")`,
    ].join(' ');
    return utils.cpExec(cmdStr).data;
}

/**
 * @description 获取 SSL CA 证书
 */
function getCert(key?: string, domains?: string, ext?: string): Cert {
    if (checkVersion() < 0) {
        return {
            key: APP.key,
            cert: APP.cert,
        }
    }
    key = key || genKey();
    ext = ext || getExt();
    return {
        key,
        cert: signCert(genCsr(key, domains), ext),
    };
}

/**
 * @description 导出根证书
 */
function exportCert(fileName = 'cert.crt', cert: Cert = {
    cert: ECA.cert,
    key: undefined,
}) {
    if (cert.cert) {
        utils.writeFile(utils.getPath(fileName), cert.cert);
    }
    if (cert.key) {
        const keyName = fileName.replace(/(\.[^.]+$)|($)/, '.key');
        utils.writeFile(utils.getPath(keyName), cert.key);
    }
    // const certPath = path.join(__dirname, '../../', fileName);
    // cert.cert && utils.writeFstr([__dirname, fileName], cert.cert);
    // cert.key && utils.writeFstr([__dirname, keyName], cert.key);
}

export default {
    getCert,
    export: exportCert,
    registerHosts,
}
```


## 利用 mkcert 构建本地自证书

[mkcert](https://github.com/FiloSottile/mkcert) 是一个管理本地证书的工具。

> 非常好用、简单方便。

`mac` 使用示例：

```bash
# 安装 mkcert
brew install mkcert

# 安装 mkcert 根证书
mkcert --install
# node服务器 设置环境变量
export NODE_EXTRA_CA_CERTS="$(mkcert -CAROOT)/rootCA.pem"
# 指定域名，获取 ssl 证书 localhost+1-key.pem localhost+1.pem
mkcert localhost 127.0.0.1
# mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1 ceshi112.com "*.ceshi112.com"
```

```js
// 构建 node server
const https = require('https');
const fs = require('fs');

https.createServer({
    key: fs.readFileSync("./localhost+1-key.pem"),
    cert: fs.readFileSync("./localhost+1.pem"),
}, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
}).listen(443);
```
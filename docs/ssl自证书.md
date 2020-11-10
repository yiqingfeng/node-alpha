# SSL 本地开发自证书

## 利用 openssl 构建本地自证书。

具体实现，省略。。。


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
/**
 * @description 服务器
 */
import http from 'http';
import https from 'https';

import settings from './settings';
import Moa from '../moa';
import ssl from './ssl';

const HTTP_PROT: number = settings.server.http.port;
const HTTPS_PROT: number = settings.server.https.port;

/**
 * @description 创建服务器
 */
function createServer() {
    const cert: Cert = ssl.getCert();
    // let port = 443;
    // const listener = createListener(requestHandle);

    // https.createServer(cert, listener)
    //     .listen(443, '0.0.0.0');
    // http.createServer(listener)
    //     .listen(80);

    const app = new Moa();
    app.createServer(http, HTTP_PROT);
    app.createServer(https, HTTPS_PROT, cert);
}

export default createServer;

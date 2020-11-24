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
function createServer(): Moa {
    ssl.registerHosts();
    const cert: Cert = ssl.getCert();
    const app = new Moa();
    app.createServer(http, HTTP_PROT);
    app.createServer(https, HTTPS_PROT, cert);

    return app;
}

export default createServer;

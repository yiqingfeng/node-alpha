/**
 * @description 服务器
 */
// import http from 'http';
// import https from 'https';
// import ssl from './ssl';
// import Union, { createListener } from '../onion';

// /**
//  * @description 请求处理
//  */
// function requestHandle(app: Union) {
//     // 静态资源处理
//     app.use((ctx, next) => {
//         ctx.body = 'test';

//         next();
//     });
// }

// /**
//  * @description 创建服务器
//  */
// function createServer() {
//     const cert: Cert = ssl.getCert();
//     // let port = 443;
//     const listener = createListener(requestHandle);

//     https.createServer(cert, listener)
//         .listen(443, '0.0.0.0');
//     http.createServer(listener)
//         .listen(80);
// }

// export default createServer;

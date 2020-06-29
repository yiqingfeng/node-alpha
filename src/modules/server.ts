/**
 * @description 服务器
 */
import http from 'http';
import https from 'https';
import ssl from './ssl';
import Onion from '../onion';

/**
 * @description 创建服务器
 */
function createServer() {
	const cert: Cert = ssl.check() < 0 ?
		ssl.app :
		ssl.gen();
	// let port = 443;
	const app = new Onion();
	const listener = app.getListener.bind(app);
	// const app = new Onion({
	// 	isHttps: true,
	// 	tlsOptions: cert,
	// });
	// app.listen(port, '0.0.0.0');

	https.createServer(cert, listener)
		.listen(443, '0.0.0.0');
	http.createServer(listener)
		.listen(80);
}

export default createServer;

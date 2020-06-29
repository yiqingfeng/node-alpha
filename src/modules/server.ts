/**
 * @description 服务器
 */
import https from 'https';
import ssl from './ssl';
import Onion from '../onion/index';

/**
 * @description 创建服务器
 */
function createServer() {
	const cert: Cert = ssl.check() < 0 ?
		ssl.app :
		ssl.gen();
	let port = 443;
	const app = new Onion({
		isHttps: true,
		tlsOptions: cert,
	});
	app.listen(port, '0.0.0.0');
}

export default createServer;

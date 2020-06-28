/**
 * @description 服务器
 */
import https from 'https';
import { create } from 'domain';

/**
 * @description 创建服务器
 */
function createServer() {
	https.createServer()
}

export default createServer;

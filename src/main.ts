import fs from 'fs';
import url from 'url';
import path from 'path';
import https from 'https';

import ssl from './modules/ssl';


let startDate: number = Date.now();
// 判断根证书是否有权限访问
fs.access('ca.crt', function (error) {
	if (!error) return;

	// ssl.eptca('ca.crt');
});
// 监听进程退出
process.on('exit', () => {
	let now: number = Date.now();
	console.log(now, now - startDate);
});
process.on('SIGINT', () => process.exit());

// createServer();
console.log(startDate, Date.now() - startDate);

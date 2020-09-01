/**
 * @description 创建 TCP 服务器，反向代理应用层
 */
import net from 'net';
import settings from './settings';

const HTTP_PROT: number = settings.server.http.port;
const HTTPS_PROT: number = settings.server.https.port;

function connectionListener(socket: net.Socket) {
    socket.once('data', function (buf) {
        // https数据流的第一位是十六进制“16”，转换成十进制就是22
        const address: number = buf[0] === 22 ? HTTPS_PROT : HTTP_PROT;
        // 创建一个指向https或http服务器的链接
        const proxy: net.Socket = net.createConnection(address, undefined, function () {
            proxy.write(buf);
            // 反向代理的过程，tcp接受的数据交给代理链接，代理链接服务器端返回数据交由socket返回给客户端
            socket.pipe(proxy).pipe(socket);
        });

        proxy.on('error', function (err) {
            console.log('TCP 代理错误：', err);
        });
    });

    socket.on('error', function (err) {
        console.log('SOCKET 错误：', err);
    });
}

net.createServer(connectionListener).listen(80); // http 默认端口
net.createServer(connectionListener).listen(443); // https 默认端口

/**
 * @description 接口代理
 * 可作为中间件，也可以为处理器
 */
import http from 'http';
import https from 'https';

/**
 * @description 获取代理资源的参数配置
 */
function proxyRequest(ctx: moa.Context, options: https.RequestOptions) {
    return new Promise((resolve, reject) => {
        const preq = (ctx.request.protocol === 'https:' ? https : http)
            .request(options, pres => {
                ctx.response.statusCode = pres.statusCode;
                // 设置 cookie 域名
                const chunks: Buffer[] = [];
                pres.on('data', (buff) => chunks.push(buff));
                pres.on('end', () => {
                    const buffs = Buffer.concat(chunks);
                    // ctx.end(buffs);
                    resolve(buffs);
                });
            });
        ctx.req.pipe(preq);

        preq.on('error', (err) => {
            console.log('代理请求失败：', err.toString());
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(404);
        });

        ctx.set('preq', preq);
    });
}

/**
 * @description 请求代理
 */
export default async function (ctx: moa.Context, next: () => void) {
    // (ctx.request.protocol === 'https:' ? https : http)
    //     .request(getRequestOptions(ctx), pres => {
    //         // const chunks = [];
    //         // pres.on('data', (buff) => chunks.push(buff));
    //         // pres.on('end', () => {
    //         //     const buffs = Buffer.concat(chunks);
    //         //     flow.res.end(func(flow, buffs, pres) || buffs);
    //         // });
    //     })
    next();
}

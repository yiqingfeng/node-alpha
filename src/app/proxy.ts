/**
 * @description 接口代理
 * 可作为中间件，也可以为处理器
 */
import http from 'http';
import https from 'https';

/**
 * @description 获取代理资源的参数配置
 */
function getRequestOptions(ctx: moa.Context) {
    return {

    }
}

/**
 * @description 请求代理
 */
export default async function (ctx: moa.Context, next: () => void) {
    (ctx.request.protocol === 'https:' ? https : http)
        .request(getRequestOptions(ctx), pres => {
            // const chunks = [];
            // pres.on('data', (buff) => chunks.push(buff));
            // pres.on('end', () => {
            //     const buffs = Buffer.concat(chunks);
            //     flow.res.end(func(flow, buffs, pres) || buffs);
            // });
        })
}

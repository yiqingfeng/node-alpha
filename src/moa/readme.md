# Moa 洋葱中间件 -- 仿 koa

参考文章：https://mp.weixin.qq.com/s/PkzPJipyG80Kpm7xwOrnIA

## 使用说明

```javascript
import http from 'http';
import Moa from 'moa';

const app = new Moa();

app.use(async function (ctx, next) {
    ctx.body += 'end';
});

app.createServer(http, 3000);
```
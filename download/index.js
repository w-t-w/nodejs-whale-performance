const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Koa_mount = require('koa-mount');
const Koa_static = require('koa-static');

const PORT = 7777;

const STATIC_DIR = path.resolve(process.cwd(), './download/source');
const TEMPLATE_DIR = path.resolve(process.cwd(), './download/template/index.html');

const buffer = fs.readFileSync(TEMPLATE_DIR);

const koa = new Koa();

koa.use(Koa_static(STATIC_DIR));

koa.use(async (ctx, next) => {
    const {request, response} = ctx;
    const {url} = request;

    if (url === '/favicon.ico') {
        response.status = 200;
        response.body = '';
        return true;
    }

    await next();
});

koa.use(Koa_mount('/', ctx => {
    console.log(window.location.href);
    const {response} = ctx;
    response.status = 200;
    response.type = 'html';
    response.body = buffer;
}));

koa.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});


const path = require('path');
const fs = require('fs');
const http = require('http');

const PORT = 7777;

const TEMPLATE_DIR = path.resolve(process.cwd(), './download_cluster/template/index.html');

const buffer = fs.readFileSync(TEMPLATE_DIR);
// const leak = [];

const app = http.createServer((req, res) => {
    // console.log(window.location.href);
    const {url} = req;
    if (url === '/favicon.ico') {
        res.writeHead(200);
        res.end('');
        return true;
    }
    // leak.push(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(buffer);
});

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
    // while (true) {
    // }
});


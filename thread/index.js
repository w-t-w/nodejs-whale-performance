const cp = require('child_process');
const path = require('path');

const CHILD_PROCESS_DIR = path.resolve(__dirname, './child_process.js');

const child_process = cp.fork(CHILD_PROCESS_DIR);

child_process.send('Hello!It\'s process!Nice to meet you!');
child_process.on('message', msg => {
    console.log(`process!${msg}`);
});
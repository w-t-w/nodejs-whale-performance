const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
    for (let k = 0; k < os.cpus().length / 2; k++) {
        cluster.fork();
    }
} else {
    require('../../download');
}
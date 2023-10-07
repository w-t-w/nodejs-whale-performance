const cluster = require('cluster');

let ping_count = 0;

if (cluster.isMaster) {
    const worker = cluster.fork();

    // 宕机重载
    cluster.on('exit', () => {
        const exit_timer = setTimeout(() => {
            cluster.fork();
            clearTimeout(exit_timer);
        }, 3000);
    });

    // 心跳检测
    // 监控僵尸进程
    const zombie_interval = setInterval(() => {
        worker.send('ping!');
        console.log('ping!');
        ping_count++;
        if (ping_count >= 3) {
            process.kill(worker.process.pid);
            clearInterval(zombie_interval);
        }
    }, 500);
    worker.on('message', msg => {
        if (msg === 'pong!')
            ping_count--;
    });
} else {
    // 错误捕获
    process.on('uncaughtException', err => {
        console.log(`error: ${err}`);
        process.exit(1);
    });

    // 内存监控
    const memory_interval = setInterval(() => {
        const memory_usage = process.memoryUsage.rss();
        console.log('memory usage:', memory_usage);
        if (memory_usage > 200 * 1024 * 1024) {
            console.log('oom!');
            process.exit(1);
            clearInterval(memory_interval);
        }
    }, 3000);

    // 心跳检测
    // 监控僵尸进程
    process.on('message', msg => {
        if (msg === 'ping!') {
            console.log('pong!');
            process.send('pong!');
        }
    });

    require('../../download_cluster');
}
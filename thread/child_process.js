process.on('message', msg => {
    console.log(`child process!${msg}`);
    process.send('Hello!It\'s child process!Nice to meet you too!');
});
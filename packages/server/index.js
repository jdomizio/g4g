const restify = require('restify');

const server = restify.createServer();

server.get('/hello', (req, res, next) => {
    res.send({
        hello: 'world',
    });
    next();
});

server.listen('8080', () => {
    console.log(`${server.name} listening at ${server.url}`);
});
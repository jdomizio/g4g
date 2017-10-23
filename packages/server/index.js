const restify = require('restify');

const server = restify.createServer();

server.listen('8080', () => {
    console.log(`${server.name} listening at ${server.url}`);
});
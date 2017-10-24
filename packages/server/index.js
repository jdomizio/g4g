const restify = require('restify');
const neo4j = require('neo4j-driver').v1;

const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['http://localhost:3000'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
});

const server = restify.createServer({
    formatters: {
        'application/json': require('./formatter'),
        // 'text/html': require('./formatter'),
    }
});
server.pre(cors.preflight);
server.use(cors.actual);

const driver = neo4j.driver('bolt://165.227.100.87:7687', neo4j.auth.basic('fakenews', 'fakenews'));



const useSession = (fn) => (req, res, next) => {
    console.log('starting session');
    const session = driver.session();
    fn(req, res, () => {
        console.log('releasing session');
        session.close();
        next();
    }, session);
};

server.get('/persons', useSession((req, res, next, session) => {
    session.run("MATCH (p:Person) return p LIMIT 25")
        .then(result => {
            console.log('sending result');
            res.send(result);
            res.close && res.close();
            next();
        })
        .catch((err) => {
            res.send({
                err: JSON.stringify(err.message),
            });
            next();
        });
}));


server.get('/persons/:name', useSession((req, res, next, session) => {
    const name = req.params.name;
    console.log('/persons/:name', name);
    session.run("MATCH (p:Person)<--(o:Article)<-[*..3]-(f:fake) WHERE p.name = {nameParam} RETURN p, o, f LIMIT 50", {nameParam: name})
        .then(result => {
            console.log('sending result');
            res.send(result);
            res.close && res.close();
            next();
        })
        .catch((err) => {
            res.send({
                err: JSON.stringify(err.message),
            });
            next();
        });
}));

server.listen('8080', () => {
    console.log(`${server.name} listening at ${server.url}`);
});
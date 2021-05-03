const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

global.startDate = null;

const rootPath = path.join(__dirname,'..','..');
const distPath = path.join(rootPath,'dist');

console.log(process.env.PORT)
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);

const run = async () => {
    app.use(cors);
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.enable('trust proxy');
    app.use('/', express.static(distPath));
    await server.listen(port, '0.0.0.0');

    app.get('/test', (_, res) => {
        res.send('Ao')
    });

    /*if (global.config.swagger) {
        const swaggerUi = require('swagger-ui-express');
        const swaggerSpec = require('./swagger');
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }*/

    global.startDate = new Date() ; 
	console.log(`App listening on port ${port} started ${global.startDate.toLocaleString()}` )    
    return server;
}

module.exports = { run };
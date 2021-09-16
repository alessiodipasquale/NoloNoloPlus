const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./errors');
const router = require('./router');
const passport = require('passport');
const passportJwtStrategy = require('./passportJwtStrategy');

global.startDate = null;

global.rootPath = path.join(__dirname,'..','..');
const frontOfficePath = path.join(global.rootPath,'out','front-office-dist');
const backOfficePath = path.join(global.rootPath,'out','back-office-dist');

const port = process.env.PORT;

const app = express();

const run = async () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(errorHandler());
    app.enable('trust proxy');
    app.use('/front-office', express.static(frontOfficePath));
    app.use('/back-office', express.static(backOfficePath));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    passport.use(passportJwtStrategy);


    router.initialize(app, passport);
   /* app.get('/', async function (req, res) { 
        console.log('arrivo')
        let sitename = req.hostname.split('.')[0]
        res.send(await template.generate('index.html', {
                host: req.hostname,
                site: sitename
        }));
    })*/
    /*if (global.config.swagger) {
        const swaggerUi = require('swagger-ui-express');
        const swaggerSpec = require('./swagger');
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }*/

    app.listen(port, () => {
        global.startDate = new Date() ; 
        console.log(`App listening on port ${port} started ${global.startDate.toLocaleString()}` )    
    })
    
    return app;
}

module.exports = { run };
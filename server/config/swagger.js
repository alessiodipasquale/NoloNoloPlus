const swaggerJSDoc = require('swagger-jsdoc');
const info = require('../../package.json');

const options = {
    definition: {
        info,
        host: 'localhost:3000',
        basePath: '/',
        securityDefinitions: {
            BearerAuth: {
                description: 'The value of the Authorization header is `Bearer <token>`, where `<token>` is substituted by the actual Json Web Token. In order to test the Authentication here the input value below should be as just explained. In the JWT is encoded the logged Agency data.',  
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        }
    },
    apis: []
};

const swagger = swaggerJSDoc(options);

module.exports = swagger;
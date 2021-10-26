const dotenv = require('dotenv');
const path = require('path');

const initialize = async () => {
    let env = process.env.NODE_ENV || 'development';
    env = env === 'production' ? '' : env;

    dotenv.config({ path: path.join(__dirname, `../../${env}.env`) });

    global.config = {
        env,
        swagger: !!env,
        force: false,
        seed: false,
        log: !!env
    };
};

module.exports = { initialize };

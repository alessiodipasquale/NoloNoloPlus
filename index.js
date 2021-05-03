const config = require('./server/config/config');
config.initialize();

const app = require('./server/config/app');

const index = async () => {
	app.run();
}

index();
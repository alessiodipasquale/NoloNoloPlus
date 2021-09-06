const config = require('./server/config/config');
const database = require('./server/config/database');

config.initialize();

const app = require('./server/config/app');

const index = async () => {
	await database.initialize();
	app.run();
}

index();
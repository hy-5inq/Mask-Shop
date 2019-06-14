const mongoose = require('mongoose');
const dbconfig = require('../config/db-config')

const database = dbconfig.database
const userName = dbconfig.user
const password = dbconfig.password
const hostName = dbconfig.host

module.exports = () => {
	const connect = () => {
		if (process.env.NODE_ENV !== 'production') {
			mongoose.set('debug', true);
		}
		mongoose.connect('mongodb://root:root@localhost:27017/MaskShop',
			(error) => {
				if (error) {
					console.log('몽고디비 연결 에러', error);
				} else {
					console.log('몽고디비 연결 성공');
				}
			});
	};
	connect();
	mongoose.connection.on('error', (error) => {
		console.error('몽고디비 연결 에러', error);
	});
	mongoose.connection.on('disconnected', () => {
		console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
		connect();
	});
	// require('./user');
	// require('./busdata');
	require('./category');
};

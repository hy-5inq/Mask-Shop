const express    = require('express');
const app        = express();
const path       = require('path');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const fs = require(`fs`);
const https = require('https');
// Database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://root:root@localhost:27017/MaskShop");
let db = mongoose.connection;
db.once('open', function () {
   console.log('DB connected!');
});
db.on('error', function (err) {
  console.log('DB ERROR:', err);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); //1
  next();
});

// API
app.use('/api/users', require('./routes/users')); //2
app.use('/api/auth', require('./routes/auth'));   //2
app.use('/api/item', require('./routes/item'));   //2
app.use('/api/account', require('./routes/account'));
app.use('/api/order', require('./routes/order'));
app.use('/api/category', require('./routes/category'));
app.use('/api/cartlist', require('./routes/cartlist'));
app.use('/api/review', require('./routes/review'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Server
let port = 3333;
https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/mask-shop.kro.kr/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/mask-shop.kro.kr/cert.pem'),
}, app).listen(port, () => {
	console.log('Express listening on port', port)
})

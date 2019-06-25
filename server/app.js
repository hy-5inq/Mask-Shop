const createError = require(`http-errors`);
const express = require(`express`);
const path = require(`path`);
const cookieParser = require(`cookie-parser`);
const logger = require(`morgan`);

const indexRouter = require(`./routes/index`);
const reviewRouter = require(`./routes/review`);
// var busdataRouter = require('./routes/busdata');
const connect = require(`./models/index`);
const categoryRouter = require(`./routes/category`);
const subcategoryRouter = require(`./routes/subcategory`);
// const subcategoryRouter = require(`./routes/`);
const accountRouter = require(`./routes/account`);
const cartlistRouter = require(`./routes/cartlist`);
const orderRouter = require(`./routes/order`);
const itemRouter = require(`./routes/item`);
const app = express();
connect();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger(`dev`));
app.use(express.static(path.join(__dirname, `public`)));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `public`)));

app.use(`/`, indexRouter);
app.use(`/review`, reviewRouter);
app.use(`/account`, accountRouter);
app.use(`/category`, categoryRouter);
app.use(`/subcategory`, subcategoryRouter);
app.use(`/cartlist`, cartlistRouter);
app.use(`/order`, orderRouter);
app.use(`/item`, itemRouter);orderRouter
// app.use('/busdata',busdataRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get(`env`) === `development` ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render(`error`);
});
app.listen(8080, `0.0.0.0`, () => {
	console.log(`server ON`)
})

module.exports = app;


// ==
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var busdataRouter = require('./routes/busdata');
// var connect= require('./database/connect');
// var app = express();
// connect();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// app.use(logger('dev'));
// app.use(express.static(path.join(__dirname,'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/busdata',busdataRouter);
//
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// 	next(createError(404));
// });
//
// error handler
// app.use(function(err, req, res, next) {
// 	set locals, only providing error in development
// res.locals.message = err.message;
// res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
// res.status(err.status || 500);
// res.render('error');
// });

// module.exports = app;
//

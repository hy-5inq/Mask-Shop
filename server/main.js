// import express from 'express';
// import bodyParser from 'body-parser';
// import mysql from 'mysql';
// import path from 'path';
let express = require('express');
let bodyParser = require('body-parser');
let path = require("path");
let mysql = require("mysql");

let dbconfig = require(__dirname+'/../server/config/db-config.json');
// let connection = mysql.createConnection(dbconfig);  mysql 연동

const app = express();
const port = 3000;

app.use('/', express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mysql 연동
// app.get('/man', (req, res) =>{
// 	connection.query("SELECT * FROM man", (err, rows) => {
// 		if(err) throw err;

// 		res.send(rows);
// 	});
// });

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname+'../public/index.html'));
});

const server = app.listen(port, () => {
	console.log('Express listening on port', port);
});
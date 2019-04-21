const express = require(`express`)
const bodyParser = require(`body-parser`)
const path = require(`path`)
const mysql = require(`mysql`)
const cors_proxy = require(`./lib/cors-anywhere.js`)

const dbconfig = require(`${__dirname}/../server/config/db-config.json`)
// let connection = mysql.createConnection(dbconfig);  mysql 연동

const app = express()
const port = 3000

cors_proxy.createServer({
	originWhitelist: [],
	requireHeader: [],
	removeHeaders: [`cookie`, `cookie2`],
	helpFile: `./views/index.html`,
}).listen(8089, `0.0.0.0`, () => {
	console.info(`Running...`)
})

app.use(`/`, express.static(`${__dirname}/../public`))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// mysql 연동
// app.get('/man', (req, res) =>{
// 	connection.query("SELECT * FROM man", (err, rows) => {
// 		if(err) throw err;

// 		res.send(rows);
// 	});
// });

app.get(`/`, (req, res) => {
	res.sendFile(path.join(`${__dirname}/../public/index.html`))
})

const server = app.listen(port, () => {
	console.log(`Express listening on port`, port)
})

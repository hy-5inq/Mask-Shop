const express = require(`express`)
const path = require(`path`)
const https = require(`https`)
const fs = require(`fs`)
const compression = require(`compression`)
const proxyServer = require(`./lib/cors-anywhere`)

const app = express()
const port = 3000

app.use(compression())
app.use('/', express.static(__dirname + "/../public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get(/^\/(.+?)/, (req, res) => {
    res.sendFile(path.join(__dirname+'/../public/index.html'))
})

https.createServer({
	key: fs.readFileSync(`/etc/letsencrypt/live/mask-shop.kro.kr/privkey.pem`),
	cert: fs.readFileSync(`/etc/letsencrypt/live/mask-shop.kro.kr/cert.pem`),
}, app).listen(port, () => {
	console.log('Express listening on port', port)
})

proxyServer.createServer({
    originWhitelist: [],
	requireHeader: [],
	removeHeaders: [`cookie`, `cookie2`],
	httpsOptions: {
		key: fs.readFileSync(`/etc/letsencrypt/live/mask-shop.kro.kr/privkey.pem`),
		cert: fs.readFileSync(`/etc/letsencrypt/live/mask-shop.kro.kr/cert.pem`),
	},
	helpFile: `/../public/index.html`,
}).listen(8089, `0.0.0.0`, () => {
    console.log(`Running...`);
});

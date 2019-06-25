let express = require('express');
let router = express.Router();
let Item = require('../models/item');
let util = require('../util');

// index
router.get('/dust/:id', function (req, res, next) {
	console.log(req.params.id);
	Item.find({dust: req.params.id}).then(data => {
		console.log(data);
		res.json(data);
	}).catch(() => {
		console.log(`id get error`)
	})
});
router.get('/size/:id', function (req, res, next) {
	console.log(req.params.id);
	Item.find({size: req.params.id}).then(data => {
		console.log(data);
		res.json(data);
	}).catch(() => {
		console.log(`id get error`)
	})
});
router.get('/using/:id', function (req, res, next) {
	console.log(req.params.id);
	Item.find({using: req.params.id}).then(data => {
		console.log(data);
		res.json(data);
	}).catch(() => {
		console.log(`id get error`)
	})
});
router.get('/company/:id', function (req, res, next) {
	console.log(req.params.id);
	Item.find({company: req.params.id}).then(data => {
		console.log(data);
		res.json(data);
	}).catch(() => {
		console.log(`id get error`)
	})
});
router.get('/:id', function (req, res, next) {
	console.log(req.params.id);
	Item.findOne({itemname: req.params.id}).then(data => {
		console.log(data);
		res.json(data);
	}).catch(() => {
		console.log(`id get error`)
	})
});

router.get('/urls/:array', function (req, res, next) {
	console.log(req.params.array)
	console.log(req.params.array.split(','))
	const itemArray = req.params.array.split(',')



	let output = []
	async function geturls(itemArray) {
		for (let i = 0; i < itemArray.length; i++) {
			console.log(itemArray[i])
			await Item.findOne({itemname: itemArray[i]}).then((data) => {
				output.push(data.thumbnail)
			})
		}
		console.log(output)
		return output
	}
	geturls(itemArray).then(data => {
		console.log(data)
		res.json(JSON.stringify(data))
	})
	// const itemNames = JSON.parse(req.body.itemNames)
	// console.log(itemNames)
	// for (let i = 0; i < itemNames.length; i++) {
	// 	console.log(itemNames[i])
	// }
	// Item.findOne({itemname: req.params.array}).then(data => {
	// 	console.log(data);
	// 	res.json(data);
	// }).catch(() => {
	// 	console.log(`id get error`)
	// })
});

router.get('/', function (req, res, next) {
	console.log(`item get`)
	Item.find({}).then((data) => {
		res.json(data)
	})
});
// create
router.post('/', function (req, res, next) {
	let newItem = new Item(req.body);
	console.log(req.body);
	newItem.save(function (err, item) {
		res.json(item);
	});
});

module.exports = router;

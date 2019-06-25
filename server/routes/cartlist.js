const express = require(`express`)
const cartlist = require(`../models/cartlist`).cartList
const cart = require(`../models/cartlist`).cart

const router = express.Router()

router.post(`/`, (req, res, next) => {
	console.log(`@@@@`)
	console.log(req.body)
	const body = req.body
	const newCart = new cart({
		name: body.name,
		count: body.count,
	})
	console.log(newCart)
	cartlist.findOneAndUpdate(
		{accountid: body.accountid},
		{
			accountid: body.accountid,
			$addToSet: {
				cartlist: newCart,
			},
		},
		{upsert: true, new: true}).then(result => {
		res.status(201).json({
			status: `success`,
			message: result,
		}).end()
	}).catch(err => {
		res.status(401).json({
			status: `failed`,
			message: err,
		}).end()
	})
})

router.get(`/`, (req, res, next) => {
	console.log(`cartlist GET`)
	cartlist.find({}).then(data => {
		console.log(data)
		res.status(201).json(data).end()
	}).catch(err => {
		console.log(`cartlist get error`)
		next(err)
	})
})

router.get(`/:id`, (req, res, next) => {
	console.log(`cartlist GET`)
	cartlist.findById(req.params.id).then(data => {
		console.log(data)
		res.status(201).json(data).end()
	}).catch(err => {
		console.log(`cartlist get error`)
		next(err)
	})
})

router.delete(`/:id`, (req, res, next) => {
	console.log(`cartlist delete test`)
	cartlist.deleteOne({_id: req.params.id}).then(query => {
			console.log(`cartlist delete done`)
			res.status(201).json({
				status: `success`,
				message: query,
			}).end()
		},
	).catch(err => {
		console.log(`cartlist delete failed`)
		res.status(401).json({
			status: `failed`,
			message: err,
		}).end()
	})
})


module.exports = router

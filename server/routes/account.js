const express = require(`express`)
const account = require(`../models/account`)

const router = express.Router()

router.post(`/`, (req, res, next) => {
	console.log(req.body)
	const body = req.body
	const newAccount = new account(body)
	newAccount.save()
		.then(result => {
			res.status(201).json(result);
			console.log(`POST DONE`)
			res.status(201).json({
				status: `success`,
				message: result,
			}).end()
		})
		.catch(err => {
			console.error(err);
			res.status(401).json({
				status: `failed`,
				message: err,
			}).end()
		});
})

router.get(`/`, (req, res, next) => {
	console.log(`account GET`)
	account.find({}).then(data => {
		console.log(data)
		res.status(201).json(data).end()
	}).catch(err => {
		console.log(`account get error`)
		res.status(401).json({
			status: `failed`,
			message: err,
		})
	})
})

router.get(`/:id`, (req, res, next) => {
	console.log(`account GET param id`)
	console.log(req.params.id)
	account.findOne({accountid:req.params.id}).then(data => {
		console.log(data)
		res.status(201).json(data).end()
		res.end()
	}).catch(() => {
		console.log(`id get error`)
	})
})

router.delete(`/:id`, (req, res, next) => {
	console.log(`account delete test`)
	account.deleteOne({_id: req.params.id}).then(query => {
		console.log(`account delete done`)
		res.status(201).json({
			status: `success`,
			message: query,
		}).end()
	},
	).catch(err => {
		console.log(`account delete failed`)
		res.status(201).json({
			status: `failed`,
			message: err,
		}).end()
	})
})


module.exports = router

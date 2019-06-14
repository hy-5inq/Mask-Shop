const express = require(`express`)
const account = require(`../models/account`)

const router = express.Router()

router.post(`/`, (req, res, next) => {
	console.log(req.body)
	const body = req.body
	const newAccount = new account({
		accountid: body.accountid,
		password: body.password,
		name: body.name,
		email: body.email,
		passwordQuestion: body.passwordQuestion,
		confirmPasswordQuestion: body.confirmPasswordQuestion,
		postCode: body.postCode,
		address: body.address,
		rank: body.rank,
		mileage: body.mileage,
	})
	newAccount.save()
	// .then((result) => {
	// 	return newAccount.populate(result, { path: 'busdata' });
	// })
		.then(result => {
			res.status(201).json(result);
			console.log(`POST DONE`)
			return res.json({
				status: `success`,
				message: `화이팅!~`,
			})
		})
		.catch(err => {
			console.error(err);
			next(err);
		});

})

router.get(`/`, (req, res, next) => {
	console.log(`account GET`)
	account.find({}).then(data => {
		console.log(data)
		return res.json(data)
	}).catch(() => {
		console.log(`account get error`)
	})
})

router.get(`/:id`, (req, res, next) => {
	console.log(`account GET param id`)
	console.log(req.params.id)
	account.findById(req.params.id).then(data => {
		console.log(data)
		return res.json(data)
	}).catch(() => {
		console.log(`id get error`)
	})
})

router.delete(`/:id`, (req, res, next) => {
	console.log(`account delete test`)
	account.deleteOne({_id: req.params.id}).then(query => {
		console.log(`account delete done`)
		return res.json({
			status: `success`,
			message: query,
		})
	},
	).catch(err => {
		console.log(`account delete failed`)
		return res.json({
			status: `failed`,
			message: err,
		})
	})
})


module.exports = router

const express = require(`express`)
const review = require(`../models/review`)

const router = express.Router()

router.post(`/`, (req, res, next) => {
	console.log(req.body)
	const body = req.body
	const newReview = new review(body)
	newReview.save()
	// .then((result) => {
	// 	return newAccount.populate(result, { path: 'busdata' });
	// })
		.then(result => {
			res.status(201).json({
				status: `success`,
				message: result,
			});
		})
		.catch(err => {
			console.error(err);
			res.status(401).json({
				status: `failed`,
				message: err,
			})
		});

})
//
router.get(`/`, (req, res, next) => {
	console.log(`review GET`)
	review.find({}).then(data => {
		console.log(data)
		res.status(201).json(data)
	}).catch(err => {
		console.log(`account get error`)
		res.status(401).json(err)
	})
})
router.delete(`/:id`, (req, res, next) => {
	console.log(`review delete test`)
	review.deleteOne({_id: req.params.id}).then(query => {
		console.log(`review delete done`)
		return res.json({
			status: `success`,
			message: query,
		})
	},
	).catch(err => {
		console.log(`review delete failed`)
		next(err)
		// return res.json({
		// 	status: `failed`,
		// 	message: err,
		// })
	})
})


module.exports = router

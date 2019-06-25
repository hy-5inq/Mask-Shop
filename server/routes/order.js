
let express  = require('express');
let router   = express.Router();
let Order     = require('../models/order');
let util     = require('../util');

// index
router.get('/list/:id',  function(req,res,next){
    Order.find({orderNum:req.params.id}).then(data => {
		console.log(data)
		return res.json(data)
	}).catch(() => {
		console.log(`id get error`)
	})
});
router.get('/:id',  function(req,res,next){
    Order.find({accountid:req.params.id}).then(data => {
		console.log(data)
		return res.json(data)
	}).catch(() => {
		console.log('id get error')
	})
});
router.delete('/list/:id', (req, res, next) => {
	console.log('account delete test')
	Order.deleteMany({orderNum: req.params.id}).then(query => {
		console.log('account delete done')
		res.status(201).json({
			status: 'success',
			message: query,
		}).end()
	},
	).catch(err => {
		console.log('account delete failed')
		res.status(201).json({
			status: 'failed',
			message: err,
		}).end()
	})
})
router.delete('/:id', (req, res, next) => {
	console.log('account delete test')
	Order.deleteMany({accountid: req.params.id}).then(query => {
		console.log('account delete done')
		res.status(201).json({
			status: 'success',
			message: query,
		}).end()
	},
	).catch(err => {
		console.log('account delete failed')
		res.status(201).json({
			status: 'failed',
			message: err,
		}).end()
	})
})
// create
router.post('/', function(req,res,next){
  Order.find()
  .sort({orderNum:-1})
  .limit(1)
  .select({orderNum:1}).then(data=>{
   req.body.orderNum = data[0].orderNum+1;
    let newOrder = new Order(req.body);
    newOrder.save(function(err,order){
    res.json(err||!order? util.successFalse(err): util.successTrue(order));
  });
  });
  
  
});


module.exports = router;
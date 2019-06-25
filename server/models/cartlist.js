const mongoose = require('mongoose');

const {Schema} = mongoose;

const cartSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	count: {
		type: Number,
		required: true,
		min: 0,
	},
})

const cartListSchema = new Schema({
	accountid: { // 회원아이디
		type: String,
		required: true,
	},
	cartlist: {
		type: [cartSchema],
		required: true,
	},
});

module.exports = {
	cart: mongoose.model(`cart`, cartSchema),
	cartList: mongoose.model(`cartlist`, cartListSchema),
}

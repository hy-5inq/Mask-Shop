const mongoose = require('mongoose');

const {Schema} = mongoose;

const reviewSchema = new Schema({
	itemname: { // 아이템 이름
		type: String,
		required: [true, `itemname is required!`],
		match: [/^.{4,12}$/, `Should be 4-12 characters!`],
	},
	subject: { // 제목
		type: String,
		required: [true, `subject is required!`],
	},
	context: { // 내용
		type: String,
		required: [true, `context is required!`],
	},
	url: { // 포토리뷰들의 url 배열
		type: [String],
		required: false,
	},
	hits: {
		type: Number,
		default: 0,
	},
	star: {
		type: Number,
		required: [true, `star is required!`],
		min: [1, `star must be at least 1`],
		max: [5, `star should not over 5`]
	},
	writer: {
		type: String,
		required: [true, `writer is required!`],
	},
	date: {
		type: Date,
		default: Date.now
	}
})


// 제약 - ?
// reviewSchema.virtual(`starCheck`)
// 	.get(function () {
// 		return this._starCheck;
// 	})
// 	.set(function (value) {
// 		this._starCheck = value;
// 	});

module.exports = mongoose.model(`Review`, reviewSchema)

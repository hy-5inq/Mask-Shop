const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
	category: {
		type: String,
		required: true,
		unique: true
	},
	subcategory: {
		type: [String],
		required: false
	},
});

module.exports = mongoose.model('Category', categorySchema);

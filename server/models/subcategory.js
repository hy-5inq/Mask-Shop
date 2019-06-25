const mongoose = require('mongoose');

const { Schema } = mongoose;

const subcategorySchema = new Schema({
	category: {
		type: String,
		required: true,
	},
	subcategory: {
		type: [String],
		required: false
	},
});

module.exports = mongoose.model('subCategory', subcategorySchema);

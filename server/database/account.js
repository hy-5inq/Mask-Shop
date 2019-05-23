const mongoose = require('mongoose');

const { Schema } = mongoose;
//const { Types: { ObjectId } } = Schema;
const accountSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    default: "Silver",
  },
  mileage: {
    type: Date,
    default: 0,
  },
});

module.exports = mongoose.model('account', accountSchema);
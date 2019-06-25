const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderSchema = new Schema({
  orderNum:{
    type:Number,
    required: true
  },
  cycle:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  productName:{
    type: String,
    required: true
  },
  productCount:{
    type: Number,
    required: true
  },
  accountid:{
    type: String,
    required: true
  },
  time:{
    type:String,
    required: true
  },
  invoiceNum:{
    type:Number,
    required: true
  },
  deliver:{
    type:String,
    required: true
  }
});


// model & export
let Order = mongoose.model('order',orderSchema);
module.exports = Order;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const itemSchema = new Schema({
  itemname:{
    type:String,
    required: true,
    unique:true
  },
  productprice:{
    type: Number,
    required: true,
  },
  customprice:{
    type: Number,
    required: true,
  },
  point:{
    type: Number,
    required: true,
  },
  deliveryfee:{
    type: Number,
    required: true,
  },
  remaincount:{
    type: Number,
    required: true,
  },
  feature:{
    type:String,
    required: true
  },
  thumbnail:{
    type:String,
    required: true
  },
  titleimg1:{
    type:String,
    required: true
  },
  titleimg2:{
    type:String,
    required: true
  },
  titleimg3:{
    type:String,
    required: true
  },
  contentimg:{
    type:[String],
    required: true
  },
  dust:{
    type:String,
    required: true
  },
  size:{
    type:String,
    required: true
  },
  using:{
    type:String,
    required: true
  },
  company:{
    type:String,
    required: true
  },
  count:{
    type: Number,
    required: true,
    default:0
  }
  
});


// model & export
let Item = mongoose.model('item',itemSchema);
module.exports = Item;

let express  = require('express');
let router   = express.Router();
let User     = require('../models/account');
let util     = require('../util');
const jwt = require('jsonwebtoken');
// index
router.get('/', util.isLoggedin, function(req,res,next){
let user;
let token = req.headers['x-access-token'];
jwt.verify(token, "super-secret", function(err, decoded) {user = decoded.accountid;})
  User.findOne({accountid:user})
  .exec(function(err,users){
    res.json(err||!users? util.successFalse(err): util.successTrue(users));
  });
});

// create
router.post('/', function(req,res,next){
  let newUser = new User(req.body);
  newUser.save(function(err,user){
    res.json(err||!user? util.successFalse(err): util.successTrue(user));
  });
});

// show
router.get('/:accountid', util.isLoggedin, function(req,res,next){
  User.findOne({accountid:req.params.accountid})
  .exec(function(err,user){
    res.json(err||!user? util.successFalse(err): util.successTrue(user));
  });
});

// update
router.put('/:accountid', util.isLoggedin, checkPermission, function(req,res,next){
  User.findOne({accountid:req.params.accountid})
  .select({password:1})
  .exec(function(err,user){
    if(err||!user) return res.json(util.successFalse(err));

    // update user object
    user.originalPassword = user.password;
    user.password = req.body.newPassword? req.body.newPassword: user.password;
    for(let p in req.body){
      user[p] = req.body[p];
    }

    // save updated user
    user.save(function(err,user){
      if(err||!user) return res.json(util.successFalse(err));
      else {
        user.password = undefined;
        res.json(util.successTrue(user));
      }
    });
  });
});

// destroy
router.delete('/:accountid', util.isLoggedin, checkPermission, function(req,res,next){
  User.findOneAndRemove({accountid:req.params.accountid})
  .exec(function(err,user){
    res.json(err||!user? util.successFalse(err): util.successTrue(user));
  });
});

module.exports = router;

// private functions
function checkPermission(req,res,next){ //*
  User.findOne({accountid:req.params.accountid}, function(err,user){
    if(err||!user) return res.json(util.successFalse(err));
    else if(!req.decoded || user._id != req.decoded._id) 
      return res.json(util.successFalse(null,'You don\'t have permission'));
    else next();
  });
}
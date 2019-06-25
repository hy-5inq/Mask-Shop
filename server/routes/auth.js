
const express  = require('express');
const router   = express.Router();
const User     = require('../models/account');
const util     = require('../util');
const jwt      = require('jsonwebtoken');

// login
router.post('/login',
  function(req,res,next){
    let isValid = true;
    let validationError = {
      name:'ValidationError',
      errors:{}
    };

    if(!req.body.accountid){
      isValid = false;
      validationError.errors.accountid = {message:'Username is required!'};
    }
    if(!req.body.password){
      isValid = false;
      validationError.errors.password = {message:'Password is required!'};
    }

    if(!isValid) return res.json(util.successFalse(validationError));
    else next();
  },
  function(req,res,next){
      console.log(req.body);
    User.findOne({accountid:req.body.accountid})
    .select({password:1,accountid:1,name:1,email:1})
    .exec(function(err,user){
      if(err) return res.json(util.successFalse(err));
      else if(!user||!user.authenticate(req.body.password))
         return res.json(util.successFalse(null,'Username or Password is invalid'));
      else {
        let payload = {
          _id : user._id,
          accountid: user.accountid
        };
        let secretOrPrivateKey = "super-secret";
        let options = {expiresIn: 60*24};
        jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
          if(err) return res.json(util.successFalse(err));
          res.json(util.successTrue(token));
        });
      }
    });
  }
);

// me
router.get('/me', util.isLoggedin,
  function(req,res,next) {
    User.findOne({accountid:req.decoded._id})
    .exec(function(err,user){
      if(err||!user) return res.json(util.successFalse(err));
      res.json(util.successTrue(user));
    });
  }
);

// refresh
router.get('/refresh', util.isLoggedin,
  function(req,res,next) {
    User.findOne({accountid:req.decoded._id})
    .exec(function(err,user){
      if(err||!user) return res.json(util.successFalse(err));
      else {
        let payload = {
          _id : user._id,
          accountid: user.accountid
        };
        let secretOrPrivateKey = "super-secret";
        let options = {expiresIn: 60*24};
        jwt.sign(payload, secretOrPrivateKey, options, function(err, token){
          if(err) return res.json(util.successFalse(err));
          res.json(util.successTrue(token));
        });
      }
    });
  }
);

module.exports = router;